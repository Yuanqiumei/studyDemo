// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import moment from 'moment'

Vue.filter('formatDate', function(dataStr, fmtstring) {
    return moment(dataStr).format(fmtstring)

})

Vue.use(VueRouter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 全局过滤器
Vue.filter ('Money', function(value, type) { //Money是方法名，value是传入的值，type是后面添加的参数
    return '￥' + value + type;

})
