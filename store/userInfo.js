import Cookie from 'js-cookie'
import { setToken } from '../assets/utils'
const state = () => ({
  name: '',
  token: '',
  userInfo: ''
})
const getters = {
  isLogin: (state) => {
    return !!state.token
  }
}

const mutations = {
  SET_TOKEN (state, res) {
    state.token = res.token
    state.name = res.name
    // state.name = value.data.name
    // state.isLogin = true
    // const a = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(a)
  },
  LOG_OFF (state, res) {
    state.token = false
    state.name = ''
    Cookie.remove('token')
    Cookie.remove('name')
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
      commit('SET_TOKEN', {
        token,
        name: data.name
      })
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
