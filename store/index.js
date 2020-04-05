export const state = () => ({
})

export const mutations = {

}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    const cookie = (req.headers.cookie && req.headers.cookie.split(';')) || false
    const res = {}
    cookie && cookie.forEach((item) => {
      res[item.split('=')[0].trim()] = decodeURI(item.split('=')[1])
    })
    commit('userInfo/SET_TOKEN', res)
  }
}
