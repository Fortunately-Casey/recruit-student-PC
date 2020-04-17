import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['../views/index/Index.vue'],resolve)
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../views/login/Login.vue'],resolve)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
