import Vue from 'vue'
import Router from 'vue-router'
import Promptie from '@/components/Promptie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Promptie',
      component: Promptie
    }
  ]
})
