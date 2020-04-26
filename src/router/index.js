import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index', //门户
    name: 'index',
    component: resolve => require(['../views/index/Index.vue'], resolve)
  },
  {
    path: '/login', //登录
    name: 'login',
    component: resolve => require(['../views/login/Login.vue'], resolve)
  },
  {
    path: '/patriarch', //家长报名
    component: resolve => require(['../views/patriarch/Patriarch.vue'], resolve),
    children: [{
        path: '/',
        name: "default",
        redirect: 'childManage'
      },
      {
        path: "/patriarch/childManage", //子女管理
        name: "childManage",
        component: resolve => require(['../views/patriarch/child-manage/ChildManage.vue'], resolve),
      },
      {
        path: "/patriarch/addChild", //添加子女
        name: "addChild",
        component: resolve => require(['../views/patriarch/add-child/AddChild.vue'], resolve),
      }
    ]
  },
  {
    path: '/schoolManage', //学校管理
    component: resolve => require(['../views/school-manage/SchoolManage.vue'], resolve),
    children: [{
        path: "/",
        name: 'schoolManage',
        redirect: 'registList'
      },
      {
        path: "/schoolManage/savedList", //已保存
        name: 'savedList',
        component: resolve => require(['../views/school-manage/saved-list/SavedList.vue'], resolve),
      },
      {
        path: "/schoolManage/registList", //已登记
        name: 'registList',
        component: resolve => require(['../views/school-manage/regist-list/RegistList.vue'], resolve),
      },
      {
        path: "/schoolManage/addChild", //新增子女
        name: 'schoolAdd',
        component: resolve => require(['../views/school-manage/add-child/AddChild.vue'], resolve),
      },
    ]
  },
  {
    path: '/schoolConfig', //学校管理
    name: "schoolConfig",
    component: resolve => require(['../views/school-config/SchoolConfig.vue'], resolve),
  },
  {
    path: '/adminPage', //社会事业局管理
    component: resolve => require(['../views/admin-page/AdminPage.vue'], resolve),
    children: [{
      path: "/",
      name: 'adminPage', 
      redirect: 'articleList'
    }, {
      path: "/adminPage/articleList", //文章列表
      name: 'articleList',
      component: resolve => require(['../views/admin-page/article-list/ArticleList.vue'], resolve),
    }, {
      path: "/adminPage/schoolStatistics", //学校统计
      name: 'schoolStatistics',
      component: resolve => require(['../views/admin-page/school-statistics/SchoolStatistics.vue'], resolve),
    }, {
      path: "/adminPage/addArticle", //新增文章
      name: 'addArticle',
      component: resolve => require(['../views/admin-page/add-article/AddArticle.vue'], resolve),
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router