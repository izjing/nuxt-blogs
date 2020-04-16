import { Message } from 'element-ui'

export default function ({ store, redirect, app: { $axios } }) {
  // 数据访问前缀
  $axios.defaults.baseURL = process.env.BASE_URL || 'http://izjing.com/api/'
  // $axios.defaults.withCredentials = true
  // request拦截器，我这里设置了一个token，当然你可以不要
  $axios.onRequest((config) => {
    if (store.state.userInfo.token) {
      // config.headers.common.Authorization = `Bearer ${getToken()}`
      config.headers.common.Authorization = store.state.userInfo.token
    }
  })

  // response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.response.use((response) => {
    if (response.data.code === 1) {
      // Message.success(response.data.msg)
    } else if (response.data.code === -100) {
      Message.error(response.data.msg)
    } else {
      Message.error(response.data.msg)
    }
    return response.data
  })
}
