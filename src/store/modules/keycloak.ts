export default {
  state: () => ({
    keycloak: {},
  }),
  getters: {
    keycloak(state: any): any {
      return state.keycloak
    },
  },
  mutations: {
    SET_KEYCLOAK(state: any, payload: any) {
      state.keycloak = payload
    },
  },
  actions: {
    setKeycloak({ commit }: any, data: any) {
      commit('SET_KEYCLOAK', data)
    },
  },
}
