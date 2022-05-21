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