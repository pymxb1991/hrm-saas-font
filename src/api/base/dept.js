// 引入工具类，框架帮忙封装好的
import {createAPI, createFormAPI} from '@/utils/request'  

//查询部门列表
export const list = data => createAPI('/company/department', 'get', data)
//保存部门 data :{id:"",name:""}
export const save = data => createAPI('/company/department', 'post', data)
//根据ID，查询部门data :{id:""}
export const find = data => createAPI(`/company/department/${data.id}`, 'get', data)
//根据ID，删除部门data :{id:""}
export const deleteById = data => createAPI(`/company/department/${data.id}`, 'delete', data)
//根据ID，更新部门data :{id:"",name:"",code:""}
export const update = data => createAPI(`/company/department/${data.id}`, 'put', data)
//由于save 跟 update 大同小异 所以重新构造一个保存或更新的方法 同样也需要一个data  参数；
export const saveorupdate = data => { return data.id ? update(data) : save(data)}
