import axios from 'axios';
import { get, remove } from './LocalStore';
import { userStore, configStore } from './Store'

// 创建 axios 实例
const instance = axios.create({
  baseURL: '/', // 设置 baseURL
  timeout: 20000, // 设置超时时间，单位为毫秒
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const token = get('Authorization')
    if (token) {
      config.headers['Authorization'] = "Bearer " + token
    }
    return config;
  },
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 处理响应错误
    const cfgStore = configStore()
    cfgStore.closeLoading();
    console.log(error);
    if(error.message.indexOf('timeout') != -1) {
      window.toastr.error('请求超时!')
    } else if (error.response.status == 403) {
      window.toastr.error('请求被拒绝! 请登录后重试')
    } else if (error.response.status == 500) {
      window.toastr.error(error.response.data)
    } else if (error.response.status == 501) {
      window.toastr.error("身份认证过期，请重新登录!")
      remove('Authorization')
      const store = userStore()
      store.logout()
    }
    return Promise.reject(error);
  }
);

export default instance;
