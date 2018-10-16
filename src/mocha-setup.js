/* eslint-env mocha */
/* global DEBUG_BROWSER: true, browser: false, page: false */

import { name, config } from '../package.json'

import puppeteer from 'puppeteer'
import { expect, assert } from 'chai'
import { swap, restore, pending } from 'swap-global'

import startServer from './start-server.js'
import validateServer from './validate-server.js'
import { getPuppeteerChromeUA } from './helpers.js'
// import merge from './deep-merge.js'defaultConfig

let testServer
const defaultConfig = config.puppeteer
// const defaultConfig = Object.freeze({
//   headless: false,
//   defaultViewport: {
//     width: 1234,
//     height: 543
//   },
//   // slowMo: 400,
//   args: []
// })

/** @todo - make this configurable */
// const opts = merge(config.puppeteer, defaultConfig)

const SESSION_ID = `${name}-${+(new Date())}`

defaultConfig.args.push(`--user-agent=${SESSION_ID}`)

/** @see {@link} https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions */
console.log(`
Puppeteer launch options:
`, defaultConfig)

// expose variables
before('Starting test server and assigning functions as global properties.', async () => {
  /** Start running server */
  testServer = startServer('test:serve')

  const browser = await puppeteer.launch(defaultConfig)
  const page = await browser.newPage()
  const definitions = {
    browser,
    page,
    expect,
    assert,
    DEBUG_BROWSER: false,
    SESSION_ID
  }
  /** Assign global variables
    * @see {@link} https://www.npmjs.com/package/swap-global
    */
  for (const property in definitions) {
    swap(property, definitions[property])
  }

  const defined = pending()

  // "globals": [ ${['"', ...defined, '"'].join('",\r "')} ]
  console.log(`
  Globals: ${defined}


  for use with "eslint":

  add 

    "/* global ${defined.join(', ')} */ to header of each test file

  or  add 

    "eslint": {
      "globals": [ "${defined.join('", "')}" ]
    }
        
  to your package.json


`)

  console.log('--user-agent', await getPuppeteerChromeUA(browser))
})

/** After all test cases */
after('Stopping test server, closing page and browser, and reverting global properties.', async () => {
  /** Stop running server */
  await testServer.kill()
  /** Close pages and browser */
  if (DEBUG_BROWSER === false) { // leave browser open for debugging
    await page.close()
    await browser.close()

    /** Restore global variables. */
    await restore()
  } else {
    console.log('Leaving browser session open for debugging DOM')
  }
})

// // confirm server is running!
validateServer(config.ports.test)
