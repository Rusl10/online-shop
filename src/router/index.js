import Vue from 'vue'
import VueRouter from 'vue-router'

import vCatalog from '../components/catalog/v-catalog'
import vCart from '../components/cart/v-cart'
import vMainPage from '../components/catalog/main-page/v-main-page'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: vMainPage
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: vCatalog
  },
  {
    path: '/product',
    name: 'products',
    component: () => import('../components/catalog/v-product-page')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../components/cart/v-cart'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
