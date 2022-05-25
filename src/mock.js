//引入mock
const Mock=require('mockjs')
//获取mock.Random对象
const Random=Mock.Random
//模拟后端统一返回结果
let Result={
  code:200,
  msg:'操作成功',
  data: null
}
/**
 * Mock.mock( url, post/get , function(options))；
 * url 表示需要拦截的 URL，
 * post/get 需要拦截的 Ajax 请求类型
 *
 * 用于生成响应数据的函数
 */
// 获取验证码图片base64编码以及一个随机码
Mock.mock('/captcha','get',()=>{
  Result.data={
    token: Random.string(32),//获取一个随机32位字符串
    captchaImg: Random.dataImage("120x40","11111")//生成验证码为11111的base64图片编码
  }
  return Result
})

//登录接口 正则表达式
Mock.mock(RegExp('/login*'), 'post', (config) => {
  // 这里无法在header添加authorization，直接跳过验证
  console.log("mock----------------login")
  // Result.code=400
  // Result.msg='有错误哦，不过拦截器成功！'
  return Result
})

//取用户信息接口 正则表达式
Mock.mock('/sys/userInfo', 'get', (config) => {
  Result.data={
    id: '11',
    username: "admin",
    avatar: "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg"
  }
  return Result
})

//退出登录
Mock.mock("/logout", 'post', (config) => {
  console.log("mock----------------logout")
  return Result
})

//动态菜单
Mock.mock("/sys/menu/nav", 'get', (config) => {
  //菜单json
  let nav=[
    {    
      id: '1',
      name: "SysManage",
      title: "系统管理",
      icon: 'el-icon-s-operation',
      path: '',
      component: '',
      children: [
        {
          id: '2',
          name: 'SysUser',
          title: "用户管理",
          icon: 'el-icon-s-operation',
          path: '/sys/users',
          component: 'sys/User',
          children: []
        },
        {
          id: '3',
          name: 'SysRole',
          title: "角色管理",
          icon: 'el-icon-rank',
          path: '/sys/roles',
          component: 'sys/Role',
          children: []
        },
        {
          id: '4',
          name: 'SysMenu',
          title: "菜单管理",
          icon: 'el-icon-menu',
          path: '/sys/menus',
          component: 'sys/Menu',
          children: []
        }
      ]
    },
    {
      id: '5',
      name: "SysTools",
      title: "系统工具",
      icon: 'el-icon-s-tools',
      path: '',
      component: '',
      children: [
        {
          id:'6',
          name: 'SysDict',
          title: "数字字典",
          icon: 'el-icon-s-order',
          path: '/sys/dicts',
          component: 'sys/Dict',
        }
      ]    
    }
  ]
  //权限数据
  let authorities=["SysUser","SysUser:save"]

  Result.data={}
  Result.data.nav=nav
  Result.data.authorities=authorities
  return Result
})

//菜单管理
Mock.mock('/sys/menu/list', 'get', () => {
	let menus = [
		{
			"id": 1,
			"created": "2021-01-15T18:58:18",
			"updated": "2021-01-15T18:58:20",
			"statu": 1,
			"parentId": 0,
			"name": "系统管理",
			"path": "",
			"perms": "sys:manage",
			"component": "",
			"type": 0,
			"icon": "el-icon-s-operation",
			"ordernum": 1,
			"children": [
				{
					"id": 2,
					"created": "2021-01-15T19:03:45",
					"updated": "2021-01-15T19:03:48",
					"statu": 1,
					"parentId": 1,
					"name": "用户管理",
					"path": "/sys/users",
					"perms": "sys:user:list",
					"component": "sys/User",
					"type": 1,
					"icon": "el-icon-s-custom",
					"ordernum": 1,
					"children": [
						{
							"id": 9,
							"created": "2021-01-17T21:48:32",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "添加用户",
							"path": null,
							"perms": "sys:user:save",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 1,
							"children": []
						},
						{
							"id": 10,
							"created": "2021-01-17T21:49:03",
							"updated": "2021-01-17T21:53:04",
							"statu": 1,
							"parentId": 2,
							"name": "修改用户",
							"path": null,
							"perms": "sys:user:update",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 2,
							"children": []
						},
						{
							"id": 11,
							"created": "2021-01-17T21:49:21",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "删除用户",
							"path": null,
							"perms": "sys:user:delete",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 3,
							"children": []
						},
						{
							"id": 12,
							"created": "2021-01-17T21:49:58",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "分配角色",
							"path": null,
							"perms": "sys:user:role",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 4,
							"children": []
						},
						{
							"id": 13,
							"created": "2021-01-17T21:50:36",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "重置密码",
							"path": null,
							"perms": "sys:user:repass",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 5,
							"children": []
						}
					]
				},
				{
					"id": 3,
					"created": "2021-01-15T19:03:45",
					"updated": "2021-01-15T19:03:48",
					"statu": 1,
					"parentId": 1,
					"name": "角色管理",
					"path": "/sys/roles",
					"perms": "sys:role:list",
					"component": "sys/Role",
					"type": 1,
					"icon": "el-icon-rank",
					"ordernum": 2,
					"children": []
				},

			]
		},
		{
			"id": 5,
			"created": "2021-01-15T19:06:11",
			"updated": null,
			"statu": 1,
			"parentId": 0,
			"name": "系统工具",
			"path": "",
			"perms": "sys:tools",
			"component": null,
			"type": 0,
			"icon": "el-icon-s-tools",
			"ordernum": 2,
			"children": [
				{
					"id": 6,
					"created": "2021-01-15T19:07:18",
					"updated": "2021-01-18T16:32:13",
					"statu": 1,
					"parentId": 5,
					"name": "数字字典",
					"path": "/sys/dicts",
					"perms": "sys:dict:list",
					"component": "sys/Dict",
					"type": 1,
					"icon": "el-icon-s-order",
					"ordernum": 1,
					"children": []
				}
			]
		}
	]

	Result.data = menus

	return Result
})

Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {

	Result.data = {
		"id": 3,
		"statu": 1,
		"parentId": 1,
		"name": "角色管理",
		"path": "/sys/roles",
		"perms": "sys:role:list",
		"component": "sys/Role",
		"type": 1,
		"icon": "el-icon-rank",
		"orderNum": 2,
		"children": []
	}

	return Result
})


Mock.mock(RegExp('/sys/menu/*'), 'post', () => {
	return Result
})