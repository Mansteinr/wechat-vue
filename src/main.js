import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './common/css/index.styl'
import weui from 'weui.js'
import 'weui'
import API from './config/api'
import Vconsole from 'vconsole'
import { setCookie, getCookie } from './utils'

Vue.prototype.API = API
const vConsole = new Vconsole()
Vue.use(vConsole) 

Vue.prototype.$weui = weui

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let path = to.path
  let authCode = getCookie('authCode')
  if (path === '/Authorization') {
    next()
    return
  }
  if (authCode) {
    next()
  } else {
    setCookie('originUrl', path)
    next({
      path: '/Authorization'
    })
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
