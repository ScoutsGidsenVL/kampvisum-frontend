import UserModel from '@/models/userModel'

export default {
  state: () => ({
    user: {},
  }),
  getters: {
    isLoaded(state: { user: UserModel }): boolean {
      return state.user.id ? true : false
    },
    user(state: any): UserModel {
      return state.user
    },
  },
  mutations: {
    SET_USER(state: any, payload: any) {
      state.user = payload
    },
  },
  actions: {
    setUser({ commit }: any, data: any) {
      commit('SET_USER', data)
    },
  },
}
