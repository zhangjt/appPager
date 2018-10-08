import http from '@/utils/http'
const state = {
    captchaShow: false,
    sendShow: true,
    btnDisable: false,
    loginState: localStorage.getItem('token')==null?false:true, 
}
const mutations = {
  SETLOGINVALUE (state, payload) {
    state.captchaShow = payload.captchaShow
    state.sendShow = payload.sendShow
    state.btnDisable = payload.btnDisable
    // state.timer = payload.timer
  },
  
  SETCAPTCHASHOW (state, payload) {
  	state.captchaShow = payload.captchaShow
  },
  SETSENDSHOW (state, payload) {
  	state.sendShow = payload.sendShow
  },
  SETBTNDISABLE (state, payload) {
  	state.btnDisable = payload.btnDisable
  },
  SETLOGINSTATE (state, payload) {
    state.loginState = payload.loginState
    // console.log('设置loginState的值为：'+state.loginState)
  }, 
}
const actions = {

}

export default {
  state,
  mutations,
  actions
}
