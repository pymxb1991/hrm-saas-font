/*
 * @Author: itcast 
 * @Description: xxx业务模块 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/myCompany-clients',   //父路径
    component: Layout,
    redirect: 'noredirect',
    name: 'myCompany-clients',
    meta: {
      title: 'xxx业务模块管理', //没有显示 ，暂不关注
      icon: 'component'
    },
    children: [
      {
        path: 'index',  //请求地址  --/myCompany-cliens/index
        component: _import('my-company/pages/index'), //跳转的VUE 视图
        name: 'myCompany-clients-index',
        meta: {title: '我的公司', icon: 'component', noCache: true}
      },
      {
        path: 'details/:id',  //请求地址  --/myCompany-cliens/index
        component: _import('my-company/pages/myCompany-details'), //跳转的VUE 视图
        name: 'myCompany-clients-details',
        meta: {title: '公司详情', icon: 'international', noCache: false}
      }
    ]
  }
]
