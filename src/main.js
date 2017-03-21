import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

import store from './store/store'
import api from './config/api.js'
import router from './router.js'

Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.prototype.$api = api;

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
