import axios from 'axios';
import qs from 'qs'
// import NProgress from 'nprogress'
import Vue from 'vue'
import { Toast } from 'mint-ui';
import {baseUrl} from './env';

import 'nprogress/nprogress.css'
// import 'element-ui/lib/theme-chalk/message.css';

Vue.prototype.$message = Toast;
var vm = new Vue();

axios.interceptors.request.use(config => {
  // loading
  // NProgress.start()
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
  // NProgress.done()
  // 如果http状态码正常，则直接返回数据
  //console.log(response);
  if ( response == undefined){
  	vm.$message({
    	message: '网络异常，请稍后再试',
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
  
  let { code, msg } = res;
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  //console.log(res);
  if (code === 0 ||code === 1||code === -1||code === 'ok') {
    //console.log(res.data)
    return res;
  }else if(code === 401){
    vm.$message({
      message: '登录失效，请重新登录',
        type: 'error'
    });
    localStorage.removeItem('token');
    setTimeout(function(){
      window.location.href="/";
    },2000);
  }else{
    vm.$message({
      message: msg,
        type: 'error'
    });
  	return false;
  }
  
}

export default {
  postWithoutCode(url, data) {
    return axios({
      method: 'post',
      baseURL: baseUrl,
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8 ',
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  },
  post(url, data) {
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
  },
  getWithoutCode(url, params) {
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
  },
  get(url, params) {
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
  },
  getLocal(url) {

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
  },
  baseUrl
}
