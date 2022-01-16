import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'ReceiptList' }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/receipt/list',
    name: 'ReceiptList',
    component: () => import( '../views/receipt/ReceiptList.vue')
  },
  {
    path: '/receipt/add',
    name: 'AddReceipt',
    component: () => import( '../views/receipt/AddReceipt.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
