import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Demo from '@/components/demo'
import Filter from '@/components/filter'
import Car from '@/components/car'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/Demo',
      name: 'demo',
      component: Demo
    },
    {
      path: '/Filter',
      name: 'filter',
      component: Filter
    },
    {
      path: '/Car',
      name: 'car',
      component: Car
    }
  ]
})
