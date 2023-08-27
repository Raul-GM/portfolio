import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../views/phaseII/HomeComponent.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  }, {
    path: '/about-me',
    name: 'DeveloperSideAboutMe',
    component: () => import('../views/developerSide/About.vue')
  }, {
    path: '/contact',
    name: 'DeveloperSideContact',
    component: () => import('../views/common/Contact.vue')
  }, {
    path: '/portfolio/crush',
    name: 'DesignerCrushIceCreams',
    component: () => import('../views/phaseII/portfolio/CrushComponent.vue')
  }, {
    path: '/portfolio/malas-mujeres',
    name: 'DesignerMalasMujeres',
    component: () => import('../views/phaseII/portfolio/MalasMujeresComponent.vue')
  }, {
    path: '/portfolio/portadas-discos',
    name: 'DesignerPortadasDiscos',
    component: () => import('../views/phaseII/portfolio/PortadasDiscosComponent.vue')
  }, {
    path: '/portfolio/villalbaria',
    name: 'DesignerVillalbaria',
    component: () => import('../views/phaseII/portfolio/VillalbariaComponent.vue')
  }, {
    path: '/portfolio/metal-portraits',
    name: 'MetalPortraits',
    component: () => import('../views/phaseII/portfolio/MetalPortraitsComponent.vue')
  }, {
    path: '/portfolio/harley-quinn',
    name: 'HarleyQuinn',
    component: () => import('../views/phaseII/portfolio/HarleyQuinnComponent.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo(0,0);
  }
})

export default router
