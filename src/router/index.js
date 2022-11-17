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
    path: '/developer-side/contact',
    name: 'DeveloperSideContact',
    component: () => import('../views/common/Contact.vue')
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
    path: '/designer-side/portfolio/crush',
    name: 'CrushIceCreams',
    component: () => import('../views/designerSide/portfolio/Crush.vue')
  }, {
    path: '/designer-side/portfolio/malas-mujeres',
    name: 'MalasMujeres',
    component: () => import('../views/designerSide/portfolio/MalasMujeres.vue')
  }, {
    path: '/designer-side/portfolio/portadas-discos',
    name: 'PortadasDiscos',
    component: () => import('../views/designerSide/portfolio/PortadasDiscos.vue')
  }, {
    path: '/designer-side/portfolio/villalbaria',
    name: 'Villalbaria',
    component: () => import('../views/designerSide/portfolio/Villalbaria.vue')
  }, {
    path: '/designer-side/contact',
    name: 'DesignerSideContact',
    component: () => import('../views/common/Contact.vue')
  }, {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/common/Blog.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
