/* eslint-env mocha */
/* global browser: false, page: false */

import { config } from '../package.json'

import puppeteer from 'puppeteer'
import { expect, assert } from 'chai'
import { swap, restore } from 'swap-global'

import startServer from './start-server.js'
import validateServer from './validate-server.js'

let testServer

/** @todo - make this configurable */
// const opts = merge({
//     headless: false,
//     defaultViewport: {
//       width: 800,
//       height: 600
//     },
//     // slowMo: 100,
//     waitUntil: 'domcontentloaded'
//   }, customOptions)
const opts = {
  headless: false,
  defaultViewport: {
    width: 800,
    height: 600
  },
  // slowMo: 100,
  waitUntil: 'domcontentloaded'
}

/** @see {@link} https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions */
console.log(`
Puppeteer launch options:
`, opts)

// expose variables
before('Starting test server and assigning functions as global properties.', async () => {
  /** Start running server */
  testServer = startServer('test:serve')

  const browser = await puppeteer.launch(opts)
  const page = await browser.newPage()
  const definitions = {
    // ventrilo,
    browser,
    page,
    expect,
    assert
  }
  /** Assign global variables
    * @see {@link} https://www.npmjs.com/package/swap-global
    */
  for (const property in definitions) {
    console.log(`defining ${property} as global.`)
    swap(property, definitions[property])
  }
})

/** After all test cases */
after('Stopping test server, closing page and browser, and reverting global properties.', async () => {
  /** Stop running server */
  await testServer.kill()

  /** Close pages and browser */
  await page.close()
  await browser.close()

  /** Restore global variables. */
  await restore()
})

// // confirm server is running!
validateServer(config.ports.test)
