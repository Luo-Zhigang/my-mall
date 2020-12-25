import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instant = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  });
  //2.axios的拦截器
  //2.1请求拦截的作用
  instant.interceptors.request.use(config=>{
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，都希望再界面中显示一个请求的图标
    // 3.某些网络请求（比如登录token），需要携带一些特殊的信息
    return config;
  },err=>{
    console.log(err);
  });

  // 2.2响应拦截
  instant.interceptors.response.use(res=>{
    // console.log(res);
    return res.data;
  },err=>{
    console.log(err);
  });
  //3.发送真正的网络请求
  return instant(config);
}
