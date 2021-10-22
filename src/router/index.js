import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },{
    path: '/developer-side',
    name: 'DeveloperSide',
    component: () => import('../views/DeveloperSide.vue')
  },{
    path: '/designer-side',
    name: 'DesignerSide',
    component: () => import('../views/DesignerSide.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
