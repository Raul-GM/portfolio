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
    component: () => import('../views/developerSide/About.vue')
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
    component: () => import('../views/developerSide/portfolio/Portfolio.vue')
  }, {
    path: '/portfolio/skulls-n-ravens',
    name: 'PortfolioSkulls',
    component: () => import('../views/developerSide/portfolio/SkullsNRavens.vue')
  }, {
    path: '/portfolio/RTC',
    name: 'Rock This Concert',
    component: () => import('../views/developerSide/portfolio/RTC.vue')
  }, {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/common/Blog.vue')
  }, {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/common/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
