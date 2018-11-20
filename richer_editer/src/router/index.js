import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RicherEditer from '@/components/RicherEditer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/richer_editer',
      name: 'RicherEditer',
      component: RicherEditer
    }
  ]
})
