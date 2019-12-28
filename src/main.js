import 'babel-polyfill'
import Vue from 'vue'
// 引入iview样式库
import iView from 'iview'
import './theme/index.less'
// import 'iview/dist/styles/iview.css'
import './style/index.scss'
import App from './App'
import router from './router'
// 引入axios
import axios from 'axios';
import store from './store'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle);
Vue.use(iView);
Vue.prototype.$axios = axios;


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    //console.log('需要登录');
    const token = sessionStorage.getItem('token')
    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
