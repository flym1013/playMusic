// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueLazyLoad from 'vue-lazyload'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
// import '@/styles/index.scss'
// import './styles/common.scss'
import './utils/rem.js'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import moment from 'moment'
moment.locale('zh_cn') // 添加汉字

Vue.use(VueLazyLoad, {
  // error:'./static/error.png',
  // loading:'./static/loading.png'
})

Vue.use(Vant)

Vue.prototype.$moment = moment // 实例还未挂载，需将方法加到原型链上
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
