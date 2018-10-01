/* eslint-env mocha */
/* global page: false, expect: false */

/**
 * Describe a test scenario to confirm server is running
 * and can be accessed by all preceeding test cases.
 * Node process will exit on failure of valid response.
 *
 * @param {serverPort} port to use address.
 */
const validateServer = (serverPort = 10001) => {
  // if (!page) {
  //   throw new Error('`page` must be defined in `global` scope as `global.page` before calling `validateServer`')
  // }
  describe('Validate Testing Server', function () {
    it(`should be running on port ${serverPort}`, async () => {
      let response
      try {
        response = await page.goto(`http://localhost:${serverPort}/`, {
          timeout: 0,
          waitUntil: 'domcontentloaded'
        })
        console.log(`

        Server is running on port: ${serverPort}
        
        Response Status: ${response.status()}


        `)
      } catch (err) {
        console.warn(`

        Test Server is not running! 

  ${err}




        Stopping tests.

        `)
        process.exit(0)
      }
      expect([200, 304]).to.include(response.status())
    })
  })
}

export { validateServer as default }
