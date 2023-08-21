import axios from 'axios';
import { get } from './LocalStore';

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8999/blog/', // 设置 baseURL
  timeout: 5000, // 设置超时时间，单位为毫秒
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const token = get('Authorization')
    if(token) {
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
    // 对响应数据进行处理，如统一处理错误码等
    return response;
  },
  error => {
    // 处理响应错误
    if(error.response.status == 403) {
        window.toastr.error('请求被拒绝!')
    }else if(error.response.status == 500){
        window.toastr.error(error.response.data)
    }
    return Promise.reject(error);
  }
);

export default instance;
