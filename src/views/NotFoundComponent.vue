<template>
    <NavbarComponent />
    <main class="main-container">
        <h1 class="section-title">404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe. <router-link class="simple_link" to="/">Vuelve al portfolio</router-link>.</p>
    </main>
    <FooterComponent />

</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { notFoundPage } from '@/views/data/pages';
import { useSeoMeta } from '@/composables/useSeoMeta';

export default {
    name: 'NotFoundComponent',
    components: {
    NavbarComponent,
    FooterComponent
  },
  setup() {
    useSeoMeta({ ...notFoundPage, noindex: true });
  }
}
</script>
