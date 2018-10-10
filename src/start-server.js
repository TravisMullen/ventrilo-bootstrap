import { spawn, spawnSync } from 'child_process'
import { writeFile, readFileSync } from 'fs'

const pidFile = './test-server.pid'

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
  // check for ghost process and kill it
  const pid = readFileSync(pidFile, 'utf8')
  const { status } = spawnSync('ps', [pid])
  if (status === 0) {
    spawnSync('kill', [pid])
  }

  // start server
  const serv = spawn('npm', ['run', npmScript])

  writeFile(pidFile, `${serv.pid}`, 'utf8', () => {
    console.log(`Logging test server pid: ${serv.pid}`)
  })

  // watch server output
  serv.stdout.on('data', data => {
    console.log(`+ ${data}`)
  })
  serv.stderr.on('data', data => {
    console.log(`- ${data}`)
  })
  serv.on('close', code => {
    console.log(`Test server has been stopped. Exit code: ${code}`)
  })

  return serv
}

export { startServer as default }
