import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about-me',
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
  }, {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('../views/portfolio/Portfolio.vue')
  }, {
    path: '/portfolio/skulls-n-ravens',
    name: 'PortfolioSkulls',
    component: () => import('../views/portfolio/SkullsNRavens.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
