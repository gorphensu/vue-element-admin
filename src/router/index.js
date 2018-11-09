import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'Order',
    meta: {
      title: '发货管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/order/index'),
        name: 'OrderList',
        meta: { title: '订单查询', icon: 'dashboard', noCache: true }
      }, {
        path: 'detail/:id',
        component: () => import('@/views/order/detail'),
        name: 'OrderDetail',
        props: true,
        hidden: true,
        meta: { title: '订单详情', icon: 'dashboard', noCache: true }
      }, {
        path: '/feight/index',
        component: () => import('@/views/feight/index'),
        name: 'Feight',
        meta: { title: '运费模板', icon: 'dashboard', noCache: true }
      }, {
        path: '/feight/detail/:id',
        component: () => import('@/views/feight/detail'),
        name: 'FeightAdd',
        props: true,
        hidden: true,
        meta: { title: '运费模板详情', icon: 'dashboard', noCache: true }
      }, {
        path: '/feight/detail',
        component: () => import('@/views/feight/detail'),
        name: 'FeightDetail',
        props: true,
        hidden: true,
        meta: { title: '运费模板详情', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/aftersale',
    component: Layout,
    redirect: '/aftersale/index',
    name: 'AfterSale',
    meta: {
      title: '售后管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/aftersale/index'),
        name: 'AfterSaleList',
        meta: { title: '退款退货', icon: 'dashboard', noCache: true }
      }, {
        path: 'detail/:id',
        component: () => import('@/views/aftersale/detail'),
        name: 'AfterSaleDetail',
        props: true,
        hidden: true,
        meta: { title: '订单详情', icon: 'dashboard', noCache: true }
      }, {
        path: 'setting',
        component: () => import('@/views/aftersale/setting'),
        name: 'Setting',
        meta: { title: '售后设置', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/index',
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/product/index'),
        name: 'ProductList',
        meta: { title: '商品列表', icon: 'dashboard', noCache: true }
      }, {
        path: 'detail/:id',
        component: () => import('@/views/product/detail'),
        name: 'ProductDetail',
        props: true,
        hidden: true,
        meta: { title: '商品详情', icon: 'dashboard', noCache: true }
      }, {
        path: 'detail',
        component: () => import('@/views/product/detail'),
        name: 'ProductAdd',
        meta: { title: '商品发布', icon: 'dashboard', noCache: true }
      }, {
        path: 'evaluate',
        component: () => import('@/views/product/evaluate'),
        name: 'Evaluate',
        meta: { title: '评价管理', icon: 'dashboard', noCache: true }
      }]
  },
  {
    path: '/marking',
    component: Layout,
    redirect: '/marking/coupon',
    name: 'Marking',
    alwaysShow: true,
    meta: {
      title: '营销管理',
      icon: 'dashboard'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/marking/index'),
      name: 'MarkingTool',
      meta: { title: '营销工具', icon: 'dashboard', noCache: true }
    }, {
      path: 'coupon',
      component: () => import('@/views/marking/coupon'),
      props: true,
      hidden: true,
      name: 'Coupon',
      meta: { title: '优惠券', icon: 'dashboard', noCache: true }
    }, {
      path: 'storedetail',
      component: () => import('@/views/marking/storecoupondetail'),
      props: true,
      hidden: true,
      name: 'StoreCouponAdd',
      meta: { title: '店铺优惠券详情', icon: 'dashboard', noCache: true }
    }, {
      path: 'storedetail/:id',
      component: () => import('@/views/marking/storecoupondetail'),
      props: true,
      hidden: true,
      name: 'StoreCouponDetail',
      meta: { title: '店铺优惠券详情', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/storemanager',
    component: Layout,
    redirect: '/storemanager/index',
    name: 'StoreManager',
    alwaysShow: true,
    meta: {
      title: '店铺管理',
      icon: 'dashboard'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/storemanager/index'),
      name: 'Store',
      meta: { title: '店铺信息', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
