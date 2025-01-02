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
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/shop/ShopComponent.vue')
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
    path: '/portfolio/infected-rain-poster',
    name: 'InfectedRainPoster',
    component: () => import('../views/portfolio/InfectedRainPosterComponent.vue')
  }, {
    path: '/portfolio/videoclip-nebula',
    name: 'VideoclipNebula',
    component: () => import('../views/portfolio/VideoclipNebula.vue')
  }, {
    path: '/portfolio/commission-nighty-summer-vibes',
    name: 'ComisionNightySummerVibes',
    component: () => import('../views/portfolio/ComisionNightySummerVibes.vue')
  }, {
    path: '/portfolio/commission-queen-elizabeth-ii',
    name: 'ComisionQueenElizabethII',
    component: () => import('../views/portfolio/ComisionQueenElizabethII.vue')
  }, {
    path: '/portfolio/commision-retratos-personalizados',
    name: 'RetratosPersonalizados',
    component: () => import('../views/portfolio/ComisionRetratosPersonalizados.vue')
  }, {
    path: '/shop/:product',
    name: 'Shop Product',
    component: () => import('../views/shop/ShopProductComponent.vue')
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
