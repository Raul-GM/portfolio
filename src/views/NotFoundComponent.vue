<template>
    <NavbarComponent />
    <div class="main-container not-found">
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
    </div>
    <FooterComponent />

</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
export default {
    name: 'NotFoundComponent',
    components: {
    NavbarComponent,
    FooterComponent
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