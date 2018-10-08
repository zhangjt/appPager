import axios from 'axios';
import qs from 'qs'
import NProgress from 'nprogress'
import Vue from 'vue'
// import { Toast } from 'mint-ui';
import {
  baseUrl
} from './env';
// import VueWeui from 'vue-weui'
import 'nprogress/nprogress.css'
// import 'element-ui/lib/theme-chalk/message.css';

Vue.prototype.$message = ({
  message,
  type
}) => {
  console.log(message)

};
var vm = new Vue();

axios.interceptors.request.use(config => {
  // loading
  NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  // loading
  NProgress.done()
  // 如果http状态码正常，则直接返回数据
  //console.log(response);
  if (response == undefined) {
    vm.$message({
      message: '系统异常，请稍后再试',
      type: 'error'
    });
  }
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else if (response.status === 401) {
    //alert('登录失效，请重新登录');
    return {
      code: 401,
      msg: '登录失效，请重新登录'
    }
  }
  // 异常状态下，把错误信息返回去
  return {
    code: 404,
    msg: '网络异常'
  }
}

function checkCode(res) {

  let {
    code,
    msg
  } = res;
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  //console.log(res);
  if (code === 0 || code === 1 || code === -1 || code === 'ok') {
    //console.log(res.data)
    return res;
  } else if (code === 401) {
    vm.$message({
      message: '登录失效，请重新登录',
      type: 'error'
    });
    localStorage.removeItem('token');
    setTimeout(function () {
      window.location.href = "/";
    }, 2000);
  } else {
    vm.$message({
      message: msg,
      type: 'error'
    });
    return false;
  }

}



//--App方法start--


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
Vue.prototype.isPC = function () {
  var u = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var isPC = true;
  for (var v = 0; v < Agents.length; v++) {
    if (u.indexOf(Agents[v]) > 0) {
      isPC = false;
      break;
    }
  }
  return isPC;
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

Vue.prototype.GetUserPhone = function () {

  if (this.isAndroid()) {
    console.log('Android')
    return window.InviteJs.getUserPhone();
  } else if (this.isiOS()) {
    console.log('ios')
    this.setupWebViewJavascriptBridge(function (bridge) {
      return bridge.callHandler('GET_USER_PHONE');
    })
  }
};

Vue.prototype.GetUserID = function () {

  if (this.isAndroid()) {
    console.log('Android')
    return window.InviteJs.getUserUid();
  } else if (this.isiOS()) {
    console.log('ios')
    this.setupWebViewJavascriptBridge(function (bridge) {
      return bridge.callHandler('GET_USER_UID');
    })
  }
};

//app内页跳转

Vue.prototype.ToAppPage = function (url, data, toAppPage) {
  console.log(url)
  if (url == '') {
    console.log('空连接');
    return;
  }

  if (!toAppPage) {
    //跳转app的h5页面;
    var newUrl = url
    var d = data ? JSON.stringify(data) : '';
    if (d.length > 0) {
      d = encodeURIComponent(d);
      newUrl = url + '?query=' + d;
    }
    newUrl = encodeURIComponent(newUrl);
    let appBaseUrl = '/common/webView/&url=';
    url = appBaseUrl + newUrl;

  } else if (toAppPage == true) {
    //跳转到app内页的原生页面, data作为json字符串 由query参数传递
    let d = data ? JSON.stringify(data) : '';
    var newUrl = url
    if (d.length > 0) {
      newUrl = url + '?query=' + d;
    }
    url = newUrl;
  }

  var json = {
    url: url
  };
  if (this.isiOS()) {
    console.log('ios')
    // json.url = 'routecommon:/' + url;   //外部启动app
    json.url = 'routeglobal:/' + url; //APP内跳转
    console.log(json);
    window.webkit.messageHandlers.pushUrl.postMessage(json);
  }
  if (this.isAndroid()) {
    console.log('Android')
    json = JSON.stringify(json);
    console.log(json);
    window.InviteJs.pushUrl(json);
  }
};

// app内页跳转到广告详情页

Vue.prototype.ToAppADWebPage = function (url, data) {
  let routerUrl = '/news/newsDetail';
  var targetUrl = routerUrl;
  data = data || {};
  url = url || "";
  data.title = data.title || "";
  data.intro = data.intro || data.title||"";
  data.img = data.img ||"";
  targetUrl = routerUrl + "/&url=" + encodeURIComponent(url);
  targetUrl = targetUrl + "/&title=" + data.title;
  targetUrl = targetUrl + "/&intro=" + data.intro;
  targetUrl = targetUrl + "/&img=" + data.img;

  this.ToAppPage(targetUrl, "", true);
};

// app内跳转到浏览器
Vue.prototype.ToBrowserFromAppPage = function (url, data) {
  let appBaseUrl = '/common/browser/&url=';
  url = appBaseUrl + encodeURIComponent(url);
  this.ToAppPage(url, data, true);
}



Vue.prototype.getQuery = function (params) {
  let str = location.search;
  let query = str.split(params + "=").slice(-1).join('');
  query = decodeURIComponent(query);

  query = JSON.parse(query);
  console.log(query);
  // console.log(query)
  return query;
}




// --App方法end---

// --wap方法start--
function postWapWithoutCode(url, data,callback) {

  return axios({
    method: 'post',
    baseURL: baseUrl,
    url,
    data: qs.stringify(data),
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    }
  }).then(
    (response) => {
      let data= checkStatus(response)
      callback=eval(callback) //字符串作为函数名调用函数
      callback&&callback(data)
    }
  )
}
function postWap(url, data,callback) {
  let AUTH_TOKEN = localStorage.getItem('token');
  //console.log(AUTH_TOKEN);
  return axios({
    method: 'post',
    baseURL: baseUrl,
    url,
    data: qs.stringify(data),
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8 ',
      'token': AUTH_TOKEN || ''
    }
  }).then(
    (response) => {
      return checkStatus(response)
    }
  ).then(
    (res) => {
      return checkCode(res)
    }
  )
}
function getWapWithoutCode(url, params,callback) {
  return axios({
    method: 'get',
    baseURL: baseUrl,
    url,
    params, // get 请求时带的参数
    timeout: 10000,
  }).then(
    (response) => {
      return checkStatus(response)
    }
  )
}
function getWap(url, params,callback) {
  let AUTH_TOKEN = localStorage.getItem('token');
  //console.log(AUTH_TOKEN);
  return axios({
    method: 'get',
    baseURL: baseUrl,
    url,
    params, // get 请求时带的参数
    timeout: 10000,
    headers: {
      'token': AUTH_TOKEN
    }
  }).then(
    (response) => {
      return checkStatus(response)
    }
  ).then(
    (res) => {
      return checkCode(res)
    }
  )
}
function getWapLocal(url,callback) {

  return axios({
    method: 'get',
    baseURL: '',
    url,
    timeout: 10000

  }).then(
    (response) => {

      return checkStatus(response)
    }
  ).then(
    (res) => {

      return res
    }
  )
}
// --wap方法end--

//--参数报文头start--

//请求报文 
function dataRequest(data) {

  let defaultA = {
    key:"session_id,加密后的aesKey,为空时即通过session查找",
    "body":{
      "head":{
        "device_type":"设备类型",
        "appVersion":"app版本号",
        "clientModel":"手机型号",
        "OSVersion":"手机系统版本",
        "uuid":"uuid",
        "packageName":"应用包名",
        "channel":""
      },
      "defaultTag":"TAG名",
      "content":{
        "业务报文接口键值":"业务报文接口值"
      }
    }
  }
  defaultA.body.content=data||{};
  return defaultA
}
// 响应报文
function dataResponse(data){
  return data.body.content||undefined;
}
//--参数报文头end--

export default {
  postWithoutCode(data){
    if (!vm.isPC) {

      vm.GeneralGetData(data);
    }else{
      console.log('pc')
      let reqData=data.reqData,
      url=data.url,
      callback=data.callback;
      postWapWithoutCode(url,reqData,callback)
    }
  },
  post(data){
    if (!vm.isPC) {

      vm.GeneralGetData(data);
    }else{
      console.log('pc')
      let reqData=data.reqData,
      url=data.url,
      callback=data.callback;
      postWap(url,reqData,callback)
    }
  },
  get(data){
    if (!vm.isPC) {

      vm.GeneralGetData(data);
    }else{
      let reqData=data.reqData,
      url=data.url,
      callback=data.callback;
      getWap(url,reqData,callback)
    }
  },

}
