import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
        chartList: {
            mapChart: null,
            lineChart: null,
            timeZoneDataLine: null
        },
        userInfo: {
            isLogin: false,
            username: null,
            phone: null,
            single: false
        }
    },

    actions: {},

    mutations: {},

    getters: {}
  })
}
