// /* eslint-disable no-unused-vars */
// /* eslint-env mocha */
// /* global ventrilo: false, browser: false, page: false, assert: false, expect: false */

// import service from 'ventriloquist'

// const CUSTOM_ELEMENT = 'example-element'
// const EXTENDED_ELEMENT = null
// const CUSTOM_EVENT_TYPE = 'example-event'
// const TEST_ELEMENT_ID = 'this-element-is-for-testing-only'

// // const WRAPPER_SELELCTOR = '.wrapper-element'
// const MAX_TIMEOUT = 25000

// let customElementCreate
// let elementHandle

// // define custom properties/attributes
// ventrilo.addMethod('color')
// ventrilo.addMethod('trigger')
// ventrilo.addMethod('headline')
// ventrilo.addMethod('defaults')

// describe(`Example test cases for custom elements ${CUSTOM_ELEMENT}`, function () {
//   // `timeout()` must be inside standard (non-arrow) function
//   // so `this` is correct
//   this.timeout(MAX_TIMEOUT)

//   // set-up and remove fresh instance for each test
//   beforeEach(async () => {
//     customElementCreate = await page.evaluateHandle((selector, is, parent, props) => {
//     const elm = document.createElement(selector, { is })

//       document.body.appendChild(elm)
//     }
//     return elm
//   }, createElement, extended, parentElement, properties)
//   return customElement
//     // wait for it to render in the DOM.
//     await page.waitFor(CUSTOM_ELEMENT)
//     // grab the rendered element for test analysis.
//     elementHandle = await ventrilo.customElementHandle(CUSTOM_ELEMENT)
//   })

//   afterEach(async () => {
//     // clean up mess.
//     await ventrilo.removeCustomElementHandle(customElementCreate)
//     await elementHandle.dispose()
//     await customElementCreate.dispose()
//   })

//   describe(`confirm the DOM is not polluted with duplicate elements of same type`, () => {
//     // setup for other tests to confirm element can be grabbed by selector
//     it(`should render test element and apply change to id`, async () => {
//       const updatedId = 'updated-element-id'
//       const testIdValue = await page.$eval(CUSTOM_ELEMENT, e => e.id)

//       expect(testIdValue).to.equal(TEST_ELEMENT_ID)

//       await ventrilo.setId(elementHandle, updatedId)
//       const idValue = await page.$eval(CUSTOM_ELEMENT, e => e.id)

//       expect(idValue).to.equal(updatedId)
//     })
//   })

//   describe(`demo property and attribute changes`, () => {
//     // it(`should render title attribute as textContent`, async () => {
//     //   const testValue = `${new Date()} Sartorial jean shorts actually.`

//     //   await ventrilo.setAttributeTitle(elementHandle, testValue)
//     //   const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)

//     //   expect(textContent).to.equal(testValue)
//     // })

//     // it(`should render a attribute as textContent inside of shadowRoot`, async () => {
//     //   const testValue = `${new Date()} Sartorial jean shorts actually.`

//     //   const { headline } = await ventrilo.getDefaults(elementHandle, 'h1')
//     //   const priorValue = await ventrilo.textContent(elementHandle, 'h1')
//     //   expect(priorValue).to.equal(headline)

//     //   await ventrilo.setAttributeHeadline(elementHandle, testValue)
//     //   const updatedValue = await ventrilo.textContent(elementHandle, 'h1')

//     //   expect(updatedValue).to.equal(testValue)
//     // })

//     // it(`should render a property as textContent inside of shadowRoot`, async () => {
//     //   const testValue = `${new Date()} Sartorial jean shorts actually.`

//     //   const { headline } = await ventrilo.getDefaults(elementHandle, 'h1')
//     //   const priorValue = await ventrilo.textContent(elementHandle, 'h1')
//     //   expect(priorValue).to.equal(headline)

//     //   await ventrilo.setHeadline(elementHandle, testValue)
//     //   const updatedValue = await ventrilo.textContent(elementHandle, 'h1')

//     //   expect(updatedValue).to.equal(testValue)
//     // })

//     it(`emmit CustomEvent of ${CUSTOM_EVENT_TYPE} when augmentation is complete`, async () => {
//       const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

//       const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//       await ventrilo.setAttributeTrigger(elementHandle, testValue)

//       await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//       const { type } = await ventrilo.customEventGetter()
//       expect(type).to.equal(CUSTOM_EVENT_TYPE)

//       await ce.dispose()
//     })

//     // it(`should have opacity of 1 when augmentation is complete`, async () => {
//     //   const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

//     //   const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//     //   await ventrilo.setAttributeTitle(elementHandle, testValue)

//     //   await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//     //   const getOpacity = await page.$eval(CUSTOM_ELEMENT, e => e.style.opacity)

//     //   expect(await getOpacity).to.equal('1')

//     //   await ce.dispose()
//     // })

//     // it(`should render truncated variation of title tag string`, async () => {
//     //   const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

//     //   const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//     //   await ventrilo.setTitle(elementHandle, testValue)

//     //   await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//     //   const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)
//     //   const textContentLength = await page.$eval(CUSTOM_ELEMENT, e => e.textContent.length)
//     //   // remove 2 chars, separator + space
//     //   const augmented = textContent.substring(0, textContentLength - 2)

//     //   expect(testValue).to.include(augmented)

//     //   await ce.dispose()
//     // })

//     // it('should render augmented content as smaller width than parent content width', async () => {
//     //   const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

//     //   const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//     //   await ventrilo.setTitle(elementHandle, testValue)

//     //   await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//     //   const parentWidth = await page.$eval(WRAPPER_SELELCTOR, e => e.offsetWidth)
//     //   const elementWidth = await page.$eval(CUSTOM_ELEMENT, e => e.offsetWidth)

//     //   expect(elementWidth).to.be.below(parentWidth)

//     //   await ce.dispose()
//     // })
//   })

//   // describe(`display changes to textContent on parent resize`, () => {
//   //   it('should contentWidth for textContent', async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually.`

//   //     await ventrilo.setTitle(elementHandle, testValue)

//   //     const contentWidth = await page.$eval(CUSTOM_ELEMENT, e => e.contentWidth)
//   //     const offsetWidth = await page.$eval(CUSTOM_ELEMENT, e => e.offsetWidth)

//   //     expect(contentWidth).to.equal(offsetWidth)
//   //   })
//   //   it('should render full content when wrapper is larger than textContent', async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually.`

//   //     const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//   //     await ventrilo.setTitle(elementHandle, testValue)
//   //     await ventrilo.resizeElement(WRAPPER_SELELCTOR, 50)

//   //     await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//   //     await ventrilo.resizeElement(WRAPPER_SELELCTOR, 760)
//   //     await page.waitFor(500)

//   //     const parentWidth = await page.$eval(WRAPPER_SELELCTOR, e => e.offsetWidth)
//   //     const elementWidth = await page.$eval(CUSTOM_ELEMENT, e => e.offsetWidth)

//   //     expect(elementWidth).to.be.below(parentWidth)

//   //     const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)

//   //     expect(textContent).to.equal(testValue)

//   //     await ce.dispose()
//   //   })

//   //   it('should render augmented content when wrapper is smaller than textContent', async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually.`

//   //     const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//   //     await ventrilo.setTitle(elementHandle, testValue)
//   //     await ventrilo.resizeElement(WRAPPER_SELELCTOR, 50)

//   //     await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//   //     const parentWidth = await page.$eval(WRAPPER_SELELCTOR, e => e.offsetWidth)
//   //     const elementWidth = await page.$eval(CUSTOM_ELEMENT, e => e.offsetWidth)

//   //     expect(elementWidth).to.be.below(parentWidth)

//   //     await ce.dispose()
//   //   })
//   // })

//   // describe(`customized separator`, () => {
//   //   it(`should define default separator as property`, async () => {
//   //     const separator = await page.$eval(CUSTOM_ELEMENT, e => e.separator)

//   //     expect(separator).to.equal('\u2026')
//   //   })
//   //   it(`should render truncated variation with new separator character`, async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`
//   //     const testSeparator = '+'
//   //     const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//   //     await ventrilo.setSeparator(elementHandle, testSeparator)
//   //     await ventrilo.setTitle(elementHandle, testValue)

//   //     await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//   //     const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)

//   //     expect(textContent).to.include(testSeparator)

//   //     await ce.dispose()
//   //   })
//   //   it(`should not render from attribute update`, async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`
//   //     const testSeparator = '+'
//   //     const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//   //     await ventrilo.setAttributeSeparator(elementHandle, testSeparator)
//   //     await ventrilo.setTitle(elementHandle, testValue)

//   //     await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//   //     const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)

//   //     expect(textContent).to.not.include(testSeparator)

//   //     await ce.dispose()
//   //   })
//   // })

//   // describe(`render new textContent from attribute and property change`, () => {
//   //   it(`should render new content from property change`, async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually.`

//   //     await ventrilo.setTitle(elementHandle, testValue)
//   //     const defaultTextContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)

//   //     expect(defaultTextContent).to.equal(testValue)

//   //     const updatedValue = `Updated: ${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

//   //     const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//   //     await ventrilo.setTitle(elementHandle, updatedValue)
//   //     await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//   //     const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)
//   //     const textContentLength = await page.$eval(CUSTOM_ELEMENT, e => e.textContent.length)
//   //     // remove 2 chars, separator + space
//   //     const augmented = textContent.substring(0, textContentLength - 2)

//   //     expect(updatedValue).to.include(augmented)

//   //     await ce.dispose()
//   //   })

//   //   it(`should render new content from attribute change`, async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually.`

//   //     await ventrilo.setAttributeTitle(elementHandle, testValue)
//   //     const defaultTextContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)

//   //     expect(defaultTextContent).to.equal(testValue)

//   //     const updatedValue = `Updated: ${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

//   //     const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//   //     await ventrilo.setAttributeTitle(elementHandle, updatedValue)
//   //     await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//   //     const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)
//   //     const textContentLength = await page.$eval(CUSTOM_ELEMENT, e => e.textContent.length)
//   //     // remove 2 chars, separator + space
//   //     const augmented = textContent.substring(0, textContentLength - 2)

//   //     expect(updatedValue).to.include(augmented)

//   //     await ce.dispose()
//   //   })
//   // })

//   // describe(`augmented the string ending as when attribute 'title-break' is set to 'end'`, () => {
//   //   it(`should render truncated variation of title tag string`, async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

//   //     const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//   //     await ventrilo.setAttributeTitleBreak(elementHandle, 'center')
//   //     await ventrilo.setTitle(elementHandle, testValue)
//   //     await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//   //     const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)
//   //     const textContentSeparatorIndex = await page.$eval(CUSTOM_ELEMENT, e => (
//   //       e.textContent.indexOf(e.separator)
//   //     ))
//   //     const textContentLength = await page.$eval(CUSTOM_ELEMENT, e => e.textContent.length)

//   //     const beginingChunk = textContent.substring(0, textContentSeparatorIndex - 1)
//   //     const endingChunk = textContent.substring(textContentSeparatorIndex + 1, textContentLength - textContentSeparatorIndex + 1)

//   //     expect(testValue).to.include(beginingChunk)
//   //     expect(testValue).to.include(endingChunk)

//   //     await ce.dispose()
//   //   })

//   //   it(`should render truncated variation on property change`, async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

//   //     const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//   //     await ventrilo.setAttributeTitleBreak(elementHandle, 'center')
//   //     await ventrilo.setTitle(elementHandle, testValue)
//   //     await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//   //     const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)
//   //     const textContentSeparatorIndex = await page.$eval(CUSTOM_ELEMENT, e => {
//   //       const content = e.textContent
//   //       return content.indexOf(e.separator)
//   //     })
//   //     const textContentLength = await page.$eval(CUSTOM_ELEMENT, e => e.textContent.length)

//   //     const beginingChunk = textContent.substring(0, textContentSeparatorIndex - 1)
//   //     const endingChunk = textContent.substring(textContentSeparatorIndex + 1, textContentLength - textContentSeparatorIndex + 1)

//   //     expect(testValue).to.include(beginingChunk)
//   //     expect(testValue).to.include(endingChunk)

//   //     await ce.dispose()
//   //   })
//   // })

//   // describe(`augmented the string middle as when attribute 'title-break' is set to 'center'`, () => {
//   //   it(`should render truncated variation of title tag string`, async () => {
//   //     const testValue = `${new Date()} Sartorial jean shorts actually, tattooed kickstarter direct trade try-hard woke four dollar toast truffaut. Green juice keffiyeh four dollar toast hot chicken pabst typewriter scenester before they sold out banh mi roof party bushwick ugh ennui edison bulb echo park. Street art edison bulb heirloom occupy health goth, cloud bread af small batch deep v crucifix intelligentsia try-hard. Wayfarers hexagon chartreuse, selvage lo-fi coloring book vape. Raw denim marfa taiyaki photo booth.`

//   //     const ce = await ventrilo.customEventHandle(elementHandle, CUSTOM_EVENT_TYPE)

//   //     await ventrilo.setTitleBreak(elementHandle, 'end')
//   //     await ventrilo.setTitle(elementHandle, testValue)
//   //     await ventrilo.waitForCustomEvent(MAX_TIMEOUT)

//   //     const textContent = await page.$eval(CUSTOM_ELEMENT, e => e.textContent)
//   //     const textContentLength = await page.$eval(CUSTOM_ELEMENT, e => e.textContent.length)
//   //     // remove 2 chars, separator + space
//   //     const augmented = textContent.substring(0, textContentLength - 2)

//   //     expect(testValue).to.include(augmented)

//   //     await ce.dispose()
//   //   })
//   // })
// })
