import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../views/HomeComponent.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
    meta: { title: 'Portfolio' }
  }, {
    path: '/portfolio',
    name: 'Portfolio',
    component: HomeComponent,
    meta: { title: 'Portfolio' }
  }, {
    path: '/about-me',
    name: 'AboutMe',
    component: () => import('../views/AboutMeComponent.vue'),
    meta: { title: 'Sobre mí' }
  }, {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/shop/ShopComponent.vue'),
    meta: { title: 'Tienda' }
  }, {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactComponent.vue'),
    meta: { title: 'Contacto' }
  }, {
    path: '/portfolio/crush',
    name: 'DesignerCrushIceCreams',
    component: () => import('../views/portfolio/CrushComponent.vue')
  }, {
    path: '/portfolio/malas-mujeres',
    name: 'DesignerBadWomen',
    component: () => import('../views/portfolio/BadWomenComponent.vue')
  }, {
    path: '/portfolio/portadas-discos',
    name: 'DesignerAlbumCovers',
    component: () => import('../views/portfolio/AlbumCoversComponent.vue')
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
    path: '/portfolio/comision-nighty-summer-vibes',
    name: 'CommissionNightySummerVibes',
    component: () => import('../views/portfolio/CommissionNightySummerVibes.vue')
  }, {
    path: '/portfolio/comision-queen-elizabeth-ii',
    name: 'CommissionQueenElizabethII',
    component: () => import('../views/portfolio/CommissionQueenElizabethII.vue')
  }, {
    path: '/portfolio/comision-retratos-personalizados',
    name: 'CustomPortraits',
    component: () => import('../views/portfolio/CommissionCustomPortraits.vue')
  }, {
    path: '/portfolio/commision-retratos-personalizados',
    redirect: '/portfolio/comision-retratos-personalizados'
  }, {
    path: '/portfolio/commission-nighty-summer-vibes',
    redirect: '/portfolio/comision-nighty-summer-vibes'
  }, {
    path: '/portfolio/commission-queen-elizabeth-ii',
    redirect: '/portfolio/comision-queen-elizabeth-ii'
  }, {
    path: '/shop/:product',
    name: 'Shop Product',
    component: () => import('../views/shop/ShopProductComponent.vue')
  }, {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFoundComponent.vue'),
    meta: { title: 'Página no encontrada' }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router
