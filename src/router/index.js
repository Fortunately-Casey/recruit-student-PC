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
    meta:{
      requireAuth:false
    },
    component: resolve => require(['../views/index/Index.vue'], resolve)
  },
  {
    path: '/login', //登录
    name: 'login',
    meta:{
      requireAuth:false
    },
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
        meta:{
          requireAuth:true
        },
        component: resolve => require(['../views/patriarch/child-manage/ChildManage.vue'], resolve),
      },
      {
        path: "/patriarch/addChild", //添加子女
        name: "addChild",
        meta:{
          requireAuth:true
        },
        component: resolve => require(['../views/patriarch/add-child/AddChild.vue'], resolve),
      }
    ]
  },
  {
    path: '/schoolManage', //打印老师管理
    component: resolve => require(['../views/school-manage/SchoolManage.vue'], resolve),
    children: [{
        path: "/",
        name: 'schoolManage',
        redirect: 'registList'
      },
      {
        path: "/schoolManage/savedList", //已保存
        name: 'savedList',
        meta:{
          requireAuth:true
        },
        component: resolve => require(['../views/school-manage/saved-list/SavedList.vue'], resolve),
      },
      {
        path: "/schoolManage/registList", //已登记
        name: 'registList',
        meta:{
          requireAuth:true
        },
        component: resolve => require(['../views/school-manage/regist-list/RegistList.vue'], resolve),
      },
      {
        path: "/schoolManage/addChild", //新增子女
        name: 'schoolAdd',
        meta:{
          requireAuth:true
        },
        component: resolve => require(['../views/school-manage/add-child/AddChild.vue'], resolve),
      },
    ]
  },
  {
    path: '/schoolAudit', //审核老师管理
    component: resolve => require(['../views/school-audit/SchoolAudit.vue'], resolve),
    children: [{
      path: "/",
      name: "schoolAudit",
      redirect: 'savedList'
    }, {
      path: "/schoolAudit/savedList", //未审核
      name: 'savedAudit',
      meta:{
        requireAuth:true
      },
      component: resolve => require(['../views/school-audit/saved-list/SavedList.vue'], resolve)
    }, {
      path: "/schoolAudit/auditList", //已审核
      name: 'auditList',
      meta:{
        requireAuth:true
      },
      component: resolve => require(['../views/school-audit/audit-list/AuditList.vue'], resolve)
    },{
      path: "/schoolAudit/auditChild", //子女审核
      name: 'auditChild',
      meta:{
        requireAuth:true
      },
      component: resolve => require(['../views/school-audit/audit-child/AuditChild.vue'], resolve),
    }]
  },
  {
    path: '/schoolConfig', //学校配置
    name: "schoolConfig",
    meta:{
      requireAuth:true
    },
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
      meta:{
        requireAuth:true
      },
      component: resolve => require(['../views/admin-page/article-list/ArticleList.vue'], resolve),
    }, {
      path: "/adminPage/schoolStatistics", //学校统计
      name: 'schoolStatistics',
      meta:{
        requireAuth:true
      },
      component: resolve => require(['../views/admin-page/school-statistics/SchoolStatistics.vue'], resolve),
    }, {
      path: "/adminPage/addArticle", //新增文章
      name: 'addArticle',
      meta:{
        requireAuth:true
      },
      component: resolve => require(['../views/admin-page/add-article/AddArticle.vue'], resolve),
    }]
  }, {
    path: "/printPage", //打印页面
    name: "printPage",
    meta:{
      requireAuth:true
    },
    component: resolve => require(["../views/school-manage/print-page/PrintPage.vue"], resolve)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token');
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (token) {  // 通过localStorage state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})

export default router