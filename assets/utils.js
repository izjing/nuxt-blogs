
export function throttle (func, wait) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}
