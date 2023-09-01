import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../views/HomeComponent.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  }, {
    path: '/portfolio',
    name: 'Portfolio',
    component: HomeComponent
  }, {
    path: '/about-me',
    name: 'AboutMe',
    component: () => import('../views/AboutMeComponent.vue')
  }, {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactComponent.vue')
  }, {
    path: '/portfolio/crush',
    name: 'DesignerCrushIceCreams',
    component: () => import('../views/portfolio/CrushComponent.vue')
  }, {
    path: '/portfolio/malas-mujeres',
    name: 'DesignerMalasMujeres',
    component: () => import('../views/portfolio/MalasMujeresComponent.vue')
  }, {
    path: '/portfolio/portadas-discos',
    name: 'DesignerPortadasDiscos',
    component: () => import('../views/portfolio/PortadasDiscosComponent.vue')
  }, {
    path: '/portfolio/villalbaria',
    name: 'DesignerVillalbaria',
    component: () => import('../views/portfolio/VillalbariaComponent.vue')
  }, {
    path: '/portfolio/metal-portraits',
    name: 'MetalPortraits',
    component: () => import('../views/portfolio/MetalPortraitsComponent.vue')
  }, {
    path: '/portfolio/harley-quinn',
    name: 'HarleyQuinn',
    component: () => import('../views/portfolio/HarleyQuinnComponent.vue')
  }, {
    path: '/portfolio/madrock-fest',
    name: 'MadRockFest',
    component: () => import('../views/portfolio/MadRockFestComponent.vue')
  }, {
    path: '/portfolio/kenya225',
    name: 'Kenya225Logo',
    component: () => import('../views/portfolio/Kenya225Component.vue')
  }, {
    path: '/:pathMatch(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo(0,0);
  }
})

export default router
