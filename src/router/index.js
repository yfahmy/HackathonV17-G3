import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Stats from '@/components/Stats'
var VueD3 = require('vue-d3')
Vue.use(VueD3)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    }
  ]
})
