/** Merge a `source` object to a `target` recursively
  * @see {@link https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6}
  */
const merge = (target, source) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (let key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source)
  return target
}

export default merge
