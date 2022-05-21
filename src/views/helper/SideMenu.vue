<template>
<!--   @open="handleOpen"
    @close="handleClose"-->
  <el-menu 
    default-active="2"
    class="el-menu-vertical-demo"   
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">

    <router-link to="/index">
      <el-menu-item index="Index"> 
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
    </router-link>

    <el-submenu default-active="Index" :index="menu.name" v-for="menu in menuList" :key='menu.name'>
        <template slot="title">
          <i class="menu.icon"></i>
          <span>{{menu.title}}</span>
        </template>
        <router-link to="item.path" v-for="item in menu.children" :key="item.name">
          <el-menu-item :index="item.name">
          <template slot="title">
            <i class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>          
        </el-menu-item>
        </router-link>
        <router-link to="/roles">
          <el-menu-item index="1-2">
            <template slot="title">
              <i class="el-icon-rank"></i>
              <span slot="title">角色管理</span>
            </template>          
          </el-menu-item>
        </router-link>
        <router-link to="/menus">
          <el-menu-item index="1-3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">菜单管理</span>
            </template>          
          </el-menu-item>
        </router-link>        
    </el-submenu>

    <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-tool"></i>
          <span>系统工具</span>
        </template>
        <el-menu-item index="2-1">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">数字字典</span>
          </template>          
        </el-menu-item>      
    </el-submenu>    
  </el-menu>
</template>

<script>
  export default{
    name:"SideMenu",
    data(){
      return{
        menuList:[
          {
            name: "SysManage",
            title: "系统管理",
            icon: 'el-icon-s-operation',
            path: '',
            component: '',
            children: [
              {
                name: 'SysUser',
                title: "用户管理",
                icon: 'el-icon-s-operation',
                path: '/sys/users',
                component: '',
              }
            ]
          },
          {
            name: "SysTools",
            title: "系统工具",
            icon: 'el-icon-s-tools',
            path: '',
            component: '',
            children: [
              {
                name: 'SysDict',
                title: "数字字典",
                icon: 'el-icon-s-order',
                path: '/sys/dicts',
                component: '',
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo{
    height: 100%;
  }
  a{
    text-decoration: none;
  }
</style>