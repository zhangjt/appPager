import Vue from 'vue'
import Vuex from 'vuex'
//个人信息
import accountInfo from './modules/accountInfo'
import loginInfo from './modules/loginInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginInfo,
    accountInfo
  }
})