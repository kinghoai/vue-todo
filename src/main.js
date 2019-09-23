// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Master from './components/layouts/Master.vue'
import router from './router'
import {store} from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

window.eventBus = new Vue()
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: { Master },
  template: '<Master/>'
})
