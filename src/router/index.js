import Vue from 'vue'
import Router from 'vue-router'

import loginPage from '@/components/login/login/loginPage'
// import test from '@/components/login/login/test'
import dialoguePage from '@/components/dialogue/dialoguePage'

import indexPage from '@/components/index/indexPage'
import pdfView from '@/components/dialogue/pdfView'

// 欢迎页
import welcomePage from '@/components/login/welcome/welcomePage'
import welcome1 from '@/components/login/welcome/welcome1'
import welcome2 from '@/components/login/welcome/welcome2'
import welcome3 from '@/components/login/welcome/welcome3'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'test',
    //   component: test
    // },
    {
      path: '/',
      name: 'login',
      component: loginPage
    },
    {
      path: '/welcomePage',
      name: 'welcomePage',
      direct:'/welcomePage/1',
      component: welcomePage,
      children:[
        {
          path: '1',
          name: 'welcome1',
          component: welcome1
        },
        {
          path: '2',
          name: 'welcome2',
          component: welcome2
        },
        {
          path: '3',
          name: 'welcome3',
          component: welcome3
        },
      ]
    },

    {
      path: '/index',
      name: 'indexPage',
      component: indexPage
    },
    {
      path: '/dialogue',
      name: 'dialoguePage',
      component: dialoguePage,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/pdfView',
      name: 'pdfView',
      component: pdfView
    },
  ]
})
