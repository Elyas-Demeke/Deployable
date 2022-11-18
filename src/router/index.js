import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import store from '../store'
import {HTTP} from '../plugins/axios'

const authGuard = async (to, from, next) => {
  try{
    if(store.state.auth.isLoggedIn) 
      return next('/')
    const { data: userInfo } = await HTTP.get('/user/info') 
    store.commit('auth/setUserInfo', userInfo.user)
    store.commit('auth/setIsLoggedIn', userInfo.success)
    next('/')
  }catch(e){
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // beforeEnter: authGuard
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      beforeEnter: authGuard
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: authGuard
    },
  ]
})

export default router
