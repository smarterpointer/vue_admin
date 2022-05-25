import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Menu from '../views/sys/Menu.vue'
import Role from '../views/sys/Role.vue'
import User from '../views/sys/User.vue'
import axios from 'axios'
import store from '@/store'

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
      // {
      //   path: '/sys/users',
      //   name: 'SysUser',
      //   component: User
      // },
      // {
      //   path: '/sys/menus',
      //   name: 'SysMenu',
      //   component: Menu
      // },
      // {
      //   path: '/sys/roles',
      //   name: 'SysRole',
      //   component: Role
      // },
      {
        path: '/userCenter',
        name: 'UserCenter',
        meta:{
          title: "个人中心"
        },
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

router.beforeEach((to,from,next)=>{
  let hasRoute=store.state.menus.hasRoute
  let token=localStorage.getItem("token")
  if(to.path=='/login'){
    //console.log("login!")
    next()
  }
  else if(!token){
    //console.log("token is null!")
    next({path:"/login"})
  }
  else if(to.path=='/'||to.path==''){
    next({path:"/index"})
  }
  else if(token && !hasRoute){
    axios.get("/sys/menu/nav",{
      headers:{
        Authorization:localStorage.getItem("token")
      }
   }).then(res=>{
      console.log(res.data.data)
      //MenuList
      store.commit("setMenuList",res.data.data.nav)
      //用户权限
      store.commit("setPermList",res.data.data.authorities)
      //动态绑定路由
      let newRoutes=router.options.routes
      res.data.data.nav.forEach(menu=>{
        if(menu.children){
          menu.children.forEach(e=>{
            // 将导航信息转换成路由
            let route=menuToRoute(e)
            // 把路由添加到routes中
            if(route){
              newRoutes[0].children.push(route)
            }
          })
        }
      })
      console.log("oldRoutes---------")
      console.log(newRoutes)
      // router.addRoutes(newRoutes)
      // 新写法代替addRoutes
      newRoutes.forEach(item=>{
        router.addRoute(item);
      })
      hasRoute=true
      store.commit("changeRouteStatus",true)
      next({path:to.path})
    })
  }
  else{
    console.log("route has existed")
    next()
  }
})

// 导航转换成路由
const menuToRoute=(menu)=>{
  console.log("adding menu---->")
  console.log(menu)
  if(!menu.component){
    return null
  }
  //复制属性
  let route={
    name:menu.name,
    path:menu.path,
    meta:{
      icon: menu.icon,
      title:menu.title
    }
  }
  route.component=()=>import('@/views/'+menu.component+'.vue')
  return route
}

export default router


