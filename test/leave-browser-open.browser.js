/* eslint-disable no-unused-vars */
/* eslint-env mocha */
/* global DEBUG_BROWSER: true, browser: false, expect: false */

import { getPuppeteerChromeUA } from '../src/helpers.js'

describe(`Test the browser was closed from last session.`, function () {
  it(`should do a test and leave the browser open`, async () => {
    console.log('--user-agent', await getPuppeteerChromeUA(browser))

    DEBUG_BROWSER = true
    expect(global.DEBUG_BROWSER).to.equal(true)
  }).timeout(3000)
})
