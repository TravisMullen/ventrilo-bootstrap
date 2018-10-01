import pkg from './package.json'
import json from 'rollup-plugin-json'

const external = [
  ...Object.keys(pkg.dependencies),
  'child_process'
]

export default {
  input: 'src/main.js',
  external,
  output: [
    // { file: pkg.main, format: 'cjs' },
    { file: pkg.main, format: 'es' }
  ],
  plugins: [
    json({
      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true
    })
  ]
}