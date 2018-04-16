import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    redirect: '/Enterprise/tree',
    name: 'Dashboard',
    hidden: true,
    children: [{
      // path: 'dashboard',
      // component: () => import('@/views/dashboard/index')
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/enterprise/tree'),
      meta: { title: '架构总览', icon: 'tree' }
    }
    ]
  },
  //基础配置
  {
    path: '/Basic',
    component: Layout,
    redirect: '/basic/table',
    name: 'basic',
    meta: { title: '基础配置', icon: 'manage' },
    children: [
      {
        path: 'typeDevice',
        name: 'TypeDevice',
        component: () => import('@/views/basic/typeDevice'),
        meta: { title: '设备类型', icon: 'device' },
      },
      {
        path: 'magDomain',
        name: 'MagDomain',
        component: () => import('@/views/basic/magDomain'),
        meta: { title: '管理域', icon: 'example' },
      },
      {
        path: 'magDomain/:magdomainid/magDomain_electricitySubstation',  //这里的参数要与数据库中的字段对应
        name: 'MagDomain_electricitySubstation',
        component: () => import('@/views/basic/magDomain_electricitySubstation'),
        meta: { title: '管理域-变电所关联', icon: 'example' },
        hidden: true
      },
    ]
  },
  //网关信息
  {
    path: '/Gateway',
    component: Layout,
    children: [
      {
        path: 'gateway',
        name: 'DeviceGateway',
        component: () => import('@/views/gateway/deviceGateway'),
        meta: { title: '网关信息', icon: 'network' },
      }
    ]
  },
  {
    path: '/Gateway/gateway/:gatewayid/deviceGateway_instructions',
    component: Layout,
    redirect: '/Gateway/gateway',
    name: 'deviceGateway_instructions',
    meta: { title: '网关信息', icon: 'network' },
    hidden: true,
    children: [
      {
        path: '',
        meta: { title: '网关指令', icon: 'network' },
        name: 'DeviceGateway_instructions ',
        component: () => import('@/views/gateway/deviceGateway_instructions'),
        hidden: true
      }
    ]
  },
  //企业信息
  {
    path: '/Enterprise',
    component: Layout,
    redirect: '/Enterprise/tree',
    name: 'enterprise',
    meta: { title: '企业信息', icon: 'enterprise' },
    children: [
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/enterprise/tree'),
        meta: { title: '架构总览', icon: 'tree' }
      },
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('@/views/enterprise/customer'),
        meta: { title: '企业信息', icon: 'enterprise' },
      },
      {
        path: 'customer/:companyid/subStation',
        name: 'SubStation',
        component: () => import('@/views/enterprise/subStation'),
        meta: { title: '变电所信息', icon: 'example' },
        hidden: true
      },
    ]
  },
  {
    path: '/Staff',
    component: Layout,
    // redirect: '/staff/table',
    // name: 'staff',
    // meta: { title: '人员配置', icon: 'user' },
    children: [
      {
        path: 'electrician',
        name: 'Electrician',
        component: () => import('@/views/electrician/electrician'),
        meta: { title: '电工信息', icon: 'group_fill' },
      },
      // {
      //   path: 'electrician/:magdomainid/magDomain_electrician',  //这里的参数要与数据库中的字段对应
      //   name: 'MagDomain_electrician',
      //   component: () => import('@/views/electrician/magDomain_electrician'),
      //   meta: { title: '管理域-变电所关联', icon: 'example' },
      //   hidden: true
      // },
    ]
  },
  {
    path: '/Staff/electrician/:magdomainid/magDomain_electrician',
    component: Layout,
    redirect: '/Staff/electrician',
    name: 'magDomain_electrician',
    meta: { title: '电工信息', icon: 'network' },
    hidden: true,
    children: [
      {
        path: '',
        meta: { title: '电工-管理域配置', icon: 'network' },
        name: 'MagDomain_electrician ',
        component: () => import('@/views/electrician/magDomain_electrician'),
        hidden: true
      }
    ]
  },
  {
    path: '/Staff/electrician/:magdomainid/electrician_pic',
    component: Layout,
    redirect: '/Staff/electrician',
    name: 'Electrician_pic',
    meta: { title: '电工信息', icon: 'network' },
    hidden: true,
    children: [
      {
        path: '',
        meta: { title: '电工证件照片', icon: 'network' },
        name: 'Electrician_pic ',
        component: () => import('@/views/electrician/electrician_pic'),
        hidden: true
      }
    ]
  },

  /*{
    path: '/Example',
    component: Layout,
    redirect: '/example/table',
    name: 'example',
    meta: { title: 'example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },*/

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

