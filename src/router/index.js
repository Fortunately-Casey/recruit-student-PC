import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',//门户
    name: 'index',
    component: resolve => require(['../views/index/Index.vue'],resolve)
  },
  {
    path: '/login',//登录
    name: 'login',
    component: resolve => require(['../views/login/Login.vue'],resolve)
  },
  {
    path: '/patriarch',//家长报名
    component: resolve => require(['../views/patriarch/Patriarch.vue'],resolve),
    children:[
      {
        path:'/',
        name:"default",
        redirect:'childManage'
      },
      {
        path:"/patriarch/childManage",//子女管理
        name:"childManage",
        component: resolve => require(['../views/patriarch/child-manage/ChildManage.vue'],resolve),
      },
      {
        path:"/patriarch/addChild",//添加子女
        name:"addChild",
        component: resolve => require(['../views/patriarch/add-child/AddChild.vue'],resolve),
      }
    ]
  },
  {
    path: '/schoolManage',//学校管理
    name: 'schoolManage',
    component: resolve => require(['../views/school-manage/SchoolManage.vue'],resolve)
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
