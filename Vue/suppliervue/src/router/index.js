import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/User/login.vue'
import PurchaseOrders from '../views/PurchaseOrders.vue'

//import Register from '../views/getUser.vue'



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      allowAnonymous: true
    },
  },

  {
    path: '/PurchaseOrders',
    name: 'PurchaseOrders',
    component: PurchaseOrders,
    meta: {
      allowAnonymous: true
    }
  },

  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User/getUser.vue'),
    meta: {
      allowAnonymous: false
    }
  }
]



const router = new VueRouter({
  routes
})

export default router
