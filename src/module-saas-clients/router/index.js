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
    path: '/saas-clients',   //父路径
    component: Layout,
    redirect: 'noredirect',
    name: 'saas-clients',
    meta: {
      title: 'xxx业务模块管理', //没有显示 ，暂不关注
      icon: 'component'
    },
    children: [
      {
        path: 'index',  //请求地址  --/saas-cliens/index
        component: _import('saas-clients/pages/index'), //跳转的VUE 视图
        name: 'saas-clients-index',
        meta: {title: 'SAAS企业', icon: 'component', noCache: true}
      },
      {
        path: 'details/:id', //页面请求的过程中 传参
        name: 'saas-clients-details',
        component: _import('saas-clients/pages/sass-details'),
        meta: {title: 'SaaS企业详情', icon: 'international', noCache: false}
        }
    ]
  }
]
