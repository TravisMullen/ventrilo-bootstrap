/* eslint-env mocha */
/* global browser: false, page: false */

// @todo - update to @babel/..
import 'babel-register'
import 'babel-polyfill'

import { config } from '../package.json'

import puppeteer from 'puppeteer'
import { expect, assert } from 'chai'
import { swap, restore } from 'swap-global'

import startServer from './start-server.js'
import validateServer from './validate-server.js'

// /** Merge a `source` object to a `target` recursively
//   * @see {@link https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6}
//   */
// const merge = (target, source) => {
//   // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
//   for (let key of Object.keys(source)) {
//     if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
//   }

//   // Join `target` and modified `source`
//   Object.assign(target || {}, source)
//   return target
// }

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
before(async () => {
  /** Stop running server */
  testServer = startServer('test:serve')

  /** Assign global variables
    * @see {@link} https://github.com/TravisMullen/swap-global
    */
  // shared browser session
  swap('browser', await puppeteer.launch(opts))
  // shared page state
  swap('page', await browser.newPage())
  // set testing properties
  swap('expect', expect)
  swap('assert', assert)
})

/** After all test cases */
after(async () => {
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
