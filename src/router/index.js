import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Stats from '@/components/Stats'

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
