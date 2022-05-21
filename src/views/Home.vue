<template>

   <el-container>
      <!-- 左侧菜单 -->
      <el-aside width="200px">
         <SideMenu></SideMenu>
      </el-aside>

      <el-container>
         <el-header style="height: 55px;">
            <Strong>ManHub后台管理系统</Strong>
            <!-- 头部 -->
            <div class="header-avatar">
               <!-- 头像 -->
               <el-avatar class="el-avatar" size="medium" :src="userInfo.avatar"></el-avatar>
               
               <el-dropdown>
                  <!-- 用户名 -->
                  <span class="el-dropdown-link">
                  {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item :underline="false">
                        <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
                     </el-dropdown-item>
                     <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
               </el-dropdown>
               <!-- 超链接 -->
               <el-link href="https://space.bilibili.com/13491144" :underline="false">视频讲解</el-link>
               <el-link href="http://markerhub.com" :underline="false">网站</el-link>
            </div>
         </el-header>

         <el-main>

            <div style="margin: 0 15px;">
               <router-view></router-view>
            </div>
         </el-main>
      </el-container>
   </el-container>

</template>

<script>
import SideMenu from './helper/SideMenu.vue'
export default{
   name: "Home.vue",
   data() {
      return {
         userInfo: {
            id: "",
            username: "",
            avatar: ""   
         }
      };
   },
   components: { SideMenu },
   created(){
      this.getUserInfo()
   },
   methods:{
      getUserInfo(){
         this.$axios.get('/sys/userInfo').then(res=>{
            this.userInfo=res.data.data
         })
      },
      logout(){
         this.$axios.post("/logout").then(res=>{
            localStorage.clear();
            sessionStorage.clear()
            this.$store.commit("resetState")
            this.$router.push("/login")
         })
      }
   }

}
</script>

<style scoped>
   .el-container{
      padding: 0;
      margin: 0;
      height: 100%;
   }

   .header-avatar{
      float: right;
      width: 210px;
      display: flex;
      justify-content: space-around;
      align-items: center;
   }

   .el-dropdown-link{
      cursor: pointer;
      color: #409eff;

   }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }
  
  .el-main {
   
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  .el-menu{
     height: 100%;
  }

  a{
     text-decoration: none;
  }


</style>