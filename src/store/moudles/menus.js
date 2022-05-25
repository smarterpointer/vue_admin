import { Table } from 'element-ui'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default{
  state:{
    //菜单栏数据
    menuList:[],
    //权限数据
    permList:[],
    hasRoute: false,
    editableTabsValue:'Index',
    editableTabs:[
      {
        title:'首页',
        name: 'Index'
      }
    ]
  },
  mutations:{
    changeRouteStatus(state,hasRoute){
      state.hasRoute=hasRoute
      sessionStorage.setItem("hasRoute",hasRoute)
    },
    setMenuList(state,menus){
      state.menuList=menus
    },
    setPermList(state,authorities){
      state.permList=authorities
    },
    addTab(state,item){
      console.log(item);
      //判断是否在栈内
      let index=state.editableTabs.findIndex(e=>e.name===item.name);
      if(index===-1){
        //添加到tabs中
        state.editableTabs.push({
          title:item.title,
          name:item.name
        })
      }
      //当前激活的tab
      state.editableTabsValue=item.name;
    },
    setActiveTab(state,tabName){
      state.editableTabsValue=tabName;
    },
    resetState:(state)=>{
      //清空所有状态
      state.menuList = []
			state.permList = []

			state.hasRoutes = false
			state.editableTabsValue = 'Index'
			state.editableTabs = [{
				title: '首页',
				name: 'Index',
			}]
    }
  }
}