<template>
    <NavbarComponent />
    <main class="main-container not-found">
        <h1>404 - Página no encontrada</h1>
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
<style scoped>
.not-found {
  text-align: center;
  padding: 3rem;
}

.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
</style>