import axios, { AxiosError, type Method } from 'axios';
import { ElMessage } from 'element-plus';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    ElMessage({
        message: '请求失败，请稍后再试！',
        type: 'error'
    })
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
    (result) => {
        const res = JSON.parse(result.data);
        // console.log(res);
        
      ElMessage({
          message: res.msg,
          type: res.code === 200? 'success' : 'error'
      })

        
      return res;
    },
    (error : AxiosError) => {
        ElMessage({
            message: '请求失败，请稍后再试！',
            type: 'error'
        })
      return Promise.reject(error);
    },
)

// 定义接口返回数据类型
type Data<T> = {
  code: number;
  message: string;
  data: T;
}

// 封装请求方法
export const request = <T>(url: string, method: Method = 'GET', data?: object) => {
     return instance.request<any, Data<T>>({
       url,
       method,
       // 动态属性
       [method.toUpperCase() === 'GET'? 'params' : 'data'] : data
     }) 
}