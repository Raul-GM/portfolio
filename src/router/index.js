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
