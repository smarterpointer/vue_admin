import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Menu from '../views/sys/Menu.vue'
import Role from '../views/sys/Role.vue'
import User from '../views/sys/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index', 
        name: 'Index',
        meta:{
          title: '首页'
        },
        component: ()=>import('../views/Index.vue')
      },
      {
        path: '/sys/users',
        name: 'SysUser',
        component: User
      },
      {
        path: '/sys/menus',
        name: 'SysMenu',
        component: Menu
      },
      {
        path: '/sys/roles',
        name: 'SysRole',
        component: Role
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        component: ()=>import('@/views/UserCenter.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
