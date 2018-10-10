/* eslint-disable no-unused-vars */
/* eslint-env mocha */
/* global ventrilo: false, browser: false, page: false, assert: false, expect: false */

import ventrilo from 'ventrilo'

const CUSTOM_ELEMENT = 'research-element'
const EXTENDED_ELEMENT = null
const CUSTOM_EVENT_TYPE = 'example-event'
const TEST_ELEMENT_ID = 'this-element-is-for-testing-only'

// const WRAPPER_SELELCTOR = '.wrapper-element'
const MAX_TIMEOUT = 25000

let customElementCreate
let elementHandle

// define custom properties/attributes
ventrilo.addMethod('color')
ventrilo.addMethod('trigger')
ventrilo.addMethod('headline')
ventrilo.addMethod('defaults')

describe(`Example test cases for custom elements ${CUSTOM_ELEMENT}`, function () {
  // `timeout()` must be inside standard (non-arrow) function
  // so `this` is correct
  this.timeout(MAX_TIMEOUT)

  // set-up and remove fresh instance for each test
  beforeEach(async () => {
    // await ventrilo.resizeElement(WRAPPER_SELELCTOR, 700)
    // create a clean element instance.
    customElementCreate = await ventrilo.createCustomElementHandle(CUSTOM_ELEMENT, EXTENDED_ELEMENT, null, {
      id: TEST_ELEMENT_ID
    })
    // wait for it to render in the DOM.
    await page.waitFor(CUSTOM_ELEMENT)
    // grab the rendered element for test analysis.
    elementHandle = await ventrilo.customElementHandle(CUSTOM_ELEMENT)
  })

  afterEach(async () => {
    // clean up mess.
    await ventrilo.removeCustomElementHandle(customElementCreate)
    await elementHandle.dispose()
    await customElementCreate.dispose()
  })

  describe(`confirm the DOM is not polluted with duplicate elements of same type`, () => {
    // setup for other tests to confirm element can be grabbed by selector
    it(`should render test element and apply change to id`, async () => {
      const updatedId = 'updated-element-id'
      const testIdValue = await page.$eval(CUSTOM_ELEMENT, e => e.id)

      expect(testIdValue).to.equal(TEST_ELEMENT_ID)

      await ventrilo.setId(elementHandle, updatedId)
      const idValue = await page.$eval(CUSTOM_ELEMENT, e => e.id)

      expect(idValue).to.equal(updatedId)
    })
  })

  describe(`demo property and attribute changes`, () => {
    it(`emmit CustomEvent of ${CUSTOM_EVENT_TYPE} when augmentation is complete`, async () => {
      const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

      const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

      await ventrilo.setAttributeTrigger(elementHandle, testValue)

      await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

      const { type } = await ventrilo.customEventGetter()
      expect(type).to.equal(CUSTOM_EVENT_TYPE)

      await ce.dispose()
    })
  })
})
