// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import 'font-awesome/css/font-awesome.min.css'
import global from '../static/config'

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(VueAwesomeSwiper)

Vue.prototype.GLOBAL = global
Vue.config.productionTip = false
Vue.http.options.xhr = { withCredentials: true }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
