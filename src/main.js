// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import {
  Cell,
  TabContainer,
  TabContainerItem,
	MessageBox,
	Toast,
} from 'mint-ui'
import App from './App'

//调用视频播放插件
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)
//复制内容
import VueClipboard from 'vue-clipboard2' 
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.component(Cell.name, Cell)
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

Vue.prototype.$messageBox=MessageBox;
Vue.prototype.$toast = Toast;

Vue.use(Vuex)

// 连接客户端的通用方法
Vue.prototype.isAndroid = function () {
  var u = navigator.userAgent;

  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Windows') > -1; //android终端
  return isAndroid;
}
Vue.prototype.isiOS = function () {
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.match(/Mac OS X/); //ios终端
  return isiOS;
};
Vue.prototype.setupWebViewJavascriptBridge = function (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}
Vue.prototype.GeneralGetData = function (json) {

  if (this.isAndroid()) {
    console.log('Android')
    var reqData = JSON.stringify(json.reqData);
    console.log(reqData)
    window.InviteJs.loadData(json.url, reqData, json.callback);
  } else if (this.isiOS()) {
    console.log('ios')
    this.setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('LOAD_DATA', json);
    })
  }
};
//toWeixin:跳转唤醒到微信
Vue.prototype.toWeixin = function (json) {

  if (this.isAndroid()) {
    console.log('Android')
    window.InviteJs.copytoweixin(json.key);
  } else if (this.isiOS()) {
    console.log('ios')
    this.setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('WEIXINJS_FOLLOW', json);
    })
  }
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
