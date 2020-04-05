import { Message } from 'element-ui'
import { getToken } from '../assets/utils'

export default function ({ store, redirect, app: { $axios } }) {
  // 数据访问前缀
  // $axios.defaults.baseURL = 'http://127.0.0.1:7001/'
  $axios.defaults.baseURL = 'http://izjing.com:8080/'
  // request拦截器，我这里设置了一个token，当然你可以不要
  $axios.onRequest((config) => {
    if (getToken()) {
      // config.headers.common.Authorization = `Bearer ${getToken()}`
      config.headers.common.Authorization = getToken()
    }
    config.headers.common['Access-Control-Allow-Origin'] = '*'
    config.headers.common.vary = 'Origin'
  })

  // response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.response.use((response) => {
    if (response.data.code === 1) {
      Message.success(response.data.msg)
    } else if (response.data.code === -100) {
      Message.error(response.data.msg)
    } else {
      Message.error(response.data.msg)
    }
    return response.data
  })
}
