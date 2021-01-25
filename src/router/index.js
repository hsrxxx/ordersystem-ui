import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/ordersystem/index.vue'
import OrderSystemMenu from '../views/ordersystem/components/ordersystem-main/ordersystem-menu/index.vue'
import OrderSystemUser from '../views/ordersystem/components/ordersystem-main/ordersystem-user/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '订餐系统',
    component: Index,
    icon: 'el-icon-s-promotion',
    show: true,
    children: [
      {
        path: '/menu',
        name: '菜单管理',
        component: OrderSystemMenu,
      },
      {
        path: '/user',
        name: '用户管理',
        component: OrderSystemUser,
      }
    ]
  },
]

const router = new VueRouter({
  // history 模式下刷新404
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
