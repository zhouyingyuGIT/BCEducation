import axios from 'axios'

//定义base url
//window.developApi = "http://192.168.8.125:9404"; // 全局服务地址

 const developApi =''

//创建axios实例
const service = axios.create({
  //base api url and timeOut
  baseURL: developApi,
  timeout: 150000
})

//request  --  向接口发送请求  --
service.interceptors.request.use(config => {

  config.headers.post['Content-Type'] = 'application/json';
  //如果 有些服务请求需要带token 打开下面的注释
  // config.headers['token'] = sessionStorage.getItem('token');

  return config
}, error => {
  //异步回调--抛出异常
  return Promise.reject(error)
})

//response -- 接口返回数据--信息拦截
service.interceptors.response.use(response => {
  const res = response.data;
  if( res.code === 200) {
    //http请求成功 --本地存储token
    sessionStorage.setItem('token',response.headers['token'])
    return res
  } else {
    //http请求失败
    return res
  }
}, error => {
  //没有权限，退出登录
  window.localStorage.removeItem('imp-sid');
  return Promise.reject(error)
})


export default  service

