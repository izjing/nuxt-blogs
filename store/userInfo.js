import Cookie from 'js-cookie'
import { setToken } from '../assets/utils'
const state = () => ({
  name: '',
  userName: '',
  token: '',
  super: 2
})
const getters = {
  isLogin: (state) => {
    return !!state.token
  },
  superUser: (state) => {
    return state.super === 1
  }
}

const mutations = {
  SET_TOKEN (state, res) {
    state.token = res.token
    state.name = res.name
    state.userName = res.userName
    state.super = +res.super
    // state.name = value.data.name
    // state.isLogin = true
    // const a = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(a)
  },
  LOG_OFF (state, res) {
    state.token = false
    state.name = ''
    state.userName = ''
    state.super = 2
    Cookie.remove('token')
    Cookie.remove('name')
    Cookie.remove('super')
    Cookie.remove('userName')
    location.reload()
  }
}
const actions = {
  async login ({ commit }, userInfo) {
    const res = await this.$axios.post('/login', {
      userName: userInfo.userName,
      userPass: userInfo.userPass

    })
    const { code, token, data } = res
    if (code === 1) {
      setToken(token)
      Cookie.set('name', data.name)
      Cookie.set('super', data.super)
      Cookie.set('userName', data.userName)
      commit('SET_TOKEN', {
        token,
        name: data.name,
        super: data.super,
        userName: data.userName
      })
      location.reload()
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
