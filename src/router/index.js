import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../views/HomeComponent.vue'
import { findWork } from '@/views/data/works'
import { shopData } from '@/views/data/shop'

const toNotFound = (to) => ({
  name: 'NotFound',
  params: { pathMatch: to.path.substring(1).split('/') },
  query: to.query,
  hash: to.hash
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
    meta: { title: 'Portfolio' }
  }, {
    // Duplicaba la home; Netlify también lo redirige (public/_redirects)
    path: '/portfolio',
    redirect: '/'
  }, {
    path: '/encargos',
    name: 'Commissions',
    component: () => import('../views/CommissionsComponent.vue')
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
    path: '/portfolio/:slug',
    name: 'Work',
    component: () => import('../views/portfolio/WorkComponent.vue'),
    // Slug inexistente o archivado: muestra la 404 manteniendo la URL
    beforeEnter: (to) => findWork(to.params.slug) ? true : toNotFound(to)
  }, {
    path: '/shop/:product',
    name: 'Shop Product',
    component: () => import('../views/shop/ShopProductComponent.vue'),
    beforeEnter: (to) => shopData.some(item => item.id === to.params.product) ? true : toNotFound(to)
  }, {
    path: '/:pathMatch(.*)*',
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

// Al navegar, el foco pasa al título de la nueva página para que el lector de pantalla la anuncie
router.afterEach((to, from) => {
  if (!from.matched.length) return
  nextTick(() => {
    const target = document.querySelector('main h1') || document.querySelector('main')
    if (!target) return
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  })
})

export default router
