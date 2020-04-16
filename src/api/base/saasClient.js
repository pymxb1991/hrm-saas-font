// 引入工具类，框架帮忙封装好的
import {createAPI, createFormAPI} from '@/utils/request'  

//请求路径  完整路径：部分路径配置config/
export const list = data => createAPI('/company', 'get', data)
export const detail = data => createAPI(`/company/${data.id}`, 'get', data)
