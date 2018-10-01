import { spawn } from 'child_process';
import 'babel-register';
import 'babel-polyfill';
import puppeteer from 'puppeteer';
import { expect as expect$1, assert } from 'chai';
import { swap, restore } from 'swap-global';

const config = {
	ports: {
		test: 10002
	}
};

/**
 * Asynchronous process creation of a server for tests to run on.
 * Server should be configured for use by `npm run serve`, or alternate script name, in package.json.
 *
 * @param {npmScript} string Name of script in package.json which will start server.
 * @returns {child_process}
 * @example <caption>Stop server using `child_process.kill()`</caption>
 * // runningServer.kill()
 * const runningServer = startServer('npm-script-name')
 */
const startServer = (npmScript = 'serve') => {
  // start server
  const serv = spawn('npm', ['run', npmScript]);
  // watch server output
  serv.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });
  serv.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });
  serv.on('close', code => {
    console.log(`Server has been stopped. Exit code: ${code}`);
  });
  return serv
};

/* eslint-env mocha */
/* global page: false, expect: false */

const validateServer = (serverPort = 10001) => {
  // if (!page) {
  //   throw new Error('`page` must be defined in `global` scope as `global.page` before calling `validateServer`')
  // }
  describe('Validate Testing Server', function () {
    it(`should be running on port ${serverPort}`, async () => {
      let response;
      try {
        response = await page.goto(`http://localhost:${serverPort}/`, {
          timeout: 0,
          waitUntil: 'domcontentloaded'
        });
        console.log(`

        Server is running on port: ${serverPort}
        
        Response Status: ${response.status()}


        `);
      } catch (err) {
        console.warn(`

        Test Server is not running! 

  ${err}




        Stopping tests.

        `);
        process.exit(0);
      }
      expect([200, 304]).to.include(response.status());
    });
  });
};

/* eslint-env mocha */

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

let testServer;

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
};

/** @see {@link} https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions */
console.log(`
  Puppeteer launch options:
  
`, opts);

// expose variables
before(async () => {
  testServer = startServer('test:serve');

  // shared browser session
  swap('browser', await puppeteer.launch(opts));
  // shared page state
  swap('page', await browser.newPage());
  // set testing properties
  swap('expect', expect$1);
  swap('assert', assert);
});

after(async () => {
  await testServer.kill();

  await page.close();

  await browser.close();

  await restore();
});

// // confirm server is running!
validateServer(config.ports.test);
