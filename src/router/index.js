import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/developer-side',
    name: 'DeveloperSide',
    component: () => import('../views/DeveloperSide.vue')
  }, {
    path: '/developer-side/about-me',
    name: 'DeveloperSideAboutMe',
    component: () => import('../views/developerSide/About.vue')
  }, {
    path: '/developer-side/portfolio',
    name: 'DeveloperSidePortfolio',
    component: () => import('../views/developerSide/portfolio/Portfolio.vue')
  }, {
    path: '/developer-side/portfolio/skulls-n-ravens',
    name: 'PortfolioSkulls',
    component: () => import('../views/developerSide/portfolio/SkullsNRavens.vue')
  }, {
    path: '/developer-side/portfolio/RTC',
    name: 'Rock This Concert',
    component: () => import('../views/developerSide/portfolio/RTC.vue')
  }, {
    path: '/designer-side',
    name: 'DesignerSide',
    component: () => import('../views/DesignerSide.vue')
  }, {
    path: '/designer-side/about-me',
    name: 'DesignerSideAbout',
    component: () => import('../views/designerSide/About.vue')
  }, {
    path: '/designer-side/portfolio',
    name: 'DesignerSidePortfolio',
    component: () => import('../views/designerSide/portfolio/Portfolio')
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
