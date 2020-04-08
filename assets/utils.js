import Cookies from 'js-cookie'

const TokenKey = 'token'
// 节流
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
export function getToken () {
  return Cookies.get(TokenKey)
}
export function setToken (token) {
  const inFifteenMinutes = new Date(new Date().getTime() + 24 * 59 * 60 * 1000)
  return Cookies.set(TokenKey, token || '', { expires: inFifteenMinutes })
}
