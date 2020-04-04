import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: resolve => require(['../page/Login.vue'], resolve),
      meta: {
        title: '百川教育 | 登录'
      }
    },
    {
      name:'indexModel',
      path:'/indexModel',
      component:resolve => require(['../page/index/indexModel.vue'],resolve),
      meta: {
        title: '百川教育 | 菜单'
      }
    },
    {
      name:'codeSearchDetail',
      path:'/codeSearchDetail',
      component:resolve => require(['../page/codeSearch/codeSearchDetail.vue'],resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/index',
      redirect: '/index',
      meta: {
        requireAuth: false, // 判断是否需要登录
      },
      component: resolve => require(['../page/index/index.vue'], resolve),
      children: [
        {
          name:'index',
          path:'/index',
          component:resolve => require(['../page/home/index.vue'],resolve),
          meta: {
            title: '百川教育'
          }
        },
        {
          name:'grcList',
          path:'/grcList',
          component:resolve => require(['../page/grcList/grcList.vue'],resolve),
          meta: {
            title: '百川教育'
          }
        },
        {
          name:'publicClient',
          path:'/publicClient',
          component:resolve => require(['../page/publicClient/publicClient.vue'],resolve),
          meta: {
            title: '百川教育'
          }
        },
        {
          name:'dataSharing',
          path:'/dataSharing',
          component:resolve => require(['../page/dataSharing/dataSharing.vue'],resolve),
          meta: {
            title: '百川教育'
          }
        },
        {
          name:'creditFunds',
          path:'/creditFunds',
          component:resolve => require(['../page/creditFunds/creditFunds.vue'],resolve),
          meta: {
            title: '百川教育'
          }
        },
        {
          name:'bankApi',
          path:'/bankApi',
          component:resolve => require(['../page/bankApi/bankApi.vue'],resolve),
          meta: {
            title: '百川教育'
          }
        },
        {
          name:'accountApi',
          path:'/accountApi',
          component:resolve => require(['../page/accountApi/accountApi.vue'],resolve),
          meta: {
            title: '百川教育'
          }
        },
        {
          name:'myApply',
          path:'/myApply',
          component:resolve => require(['../page/dataCheck/myApply/myApply.vue'],resolve)
        },
        {
          name:'watingProcess',
          path:'/watingProcess',
          component:resolve => require(['../page/dataCheck/watingProcess/watingProcess.vue'],resolve)
        },
        {
          name:'reviewDetails',
          path:'/reviewDetails',
          component:resolve => require(['../page/dataCheck/reviewDetails/reviewDetails.vue'],resolve)
        },
        {
          name:'codeSearch',
          path:'/codeSearch',
          component:resolve => require(['../page/codeSearch/codeSearch.vue'],resolve),
          meta: {
            title: '百川教育'
          }
        }
      ]
    },
    {
      path: '/review',
      redirect: '/watingProcess',
      meta: {
        requireAuth: true, // 判断是否需要登录
      },
      component: resolve => require(['../page/index/index.vue'], resolve),
      children: [
        {
          name:'myApply',
          path:'/myApply',
          component:resolve => require(['../page/dataCheck/myApply/myApply.vue'],resolve)
        },
        {
          name:'watingProcess',
          path:'/watingProcess',
          component:resolve => require(['../page/dataCheck/watingProcess/watingProcess.vue'],resolve)
        },
        {
          name:'checkDetails',
          path:'/watingProcess/checkDetails',
          component:resolve => require(['../page/dataCheck/checkDetails/checkDetails.vue'],resolve)
        },
        {
          name:'reviewDetails',
          path:'/myApply/reviewDetails',
          component:resolve => require(['../page/dataCheck/reviewDetails/reviewDetails.vue'],resolve)
        }
      ]
    },
  ]
})
