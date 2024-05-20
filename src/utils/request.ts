import axios, { AxiosError, type Method } from 'axios';
import { ElMessage } from 'element-plus';

const instance = axios.create({
  baseURL: 'https://localhost:8080/',
  timeout: 10000
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
    (res) => {
        if(res.data.code !== 200){
            ElMessage({
                message: '请求失败，请稍后再试！',
                type: 'error'
            })
        }
        
      return res.data;
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