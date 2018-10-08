import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('@/view/Home')), 'home');
const help = r => require.ensure([], () => r(require('@/view/Help')), 'help');
const contact = r => require.ensure([], () => r(require('@/view/Contact')), 'contact');
const teachDetail = r => require.ensure([], () => r(require('@/view/teachDetail')), 'teachDetail');
const test = r => require.ensure([], () => r(require('@/view/test')), 'test');
Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/wap/other/userService/',
  routes: [{
      path: '/home',
      name: 'home',
      meta: {
        keepAlive: true, // 需要缓存
      },
      component: home
    },
    {
      path: '/',
      name: 'help',
      component: help,
      meta: {},
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
      meta: {},
    },
    // 财喵学院-start
    {
      path: '/teachDetail',
      name: 'teachDetail',
      component: teachDetail,
      meta: {},
    },
    // 财喵学院-end
    // test
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {},
    },
  ]
})
