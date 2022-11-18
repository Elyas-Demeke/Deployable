import { createStore } from 'vuex'
import auth from './modules/auth'

// Create a new store instance.
export default createStore({
    modules: {

        auth: {
            ...auth, 
            namespaced: true,
        }
    },
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
})

