import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import play from './modules/play'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    play
  },
  getters
})

export default store
