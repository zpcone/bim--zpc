// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import Comm from './Comm'
import Store from './store/index'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.Comm = new Comm()

Vue.use(iView)
Vue.use(Vuex)
// vuex
const store = new Vuex.Store(Store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
