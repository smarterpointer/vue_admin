import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import request from './axios'
//import axios from 'axios'
import './mock.js'
import global from "./globalFun"


require("./mock")



Vue.use(Element)
Vue.prototype.$axios=request
//Vue.prototype.$axios=axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
