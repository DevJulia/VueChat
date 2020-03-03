import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bosslogin',
    component: AdminLogin,
  },
  {
    path: '/bossArea',
    name: 'bossArea',
    component: () => import(/* webpackChunkName: "adminLogin" */ '../views/AdminArea.vue'),
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/admin/chat/:user',
    name: 'AdminChat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
