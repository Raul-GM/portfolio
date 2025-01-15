<template>
  <NavbarComponent sideType="designer" />
  <main class="main-container">
    <section>
      <h2 class="section-title">Mad Rock Fest</h2>
      <div class="portfolio-project-container">
        <article>
          <p>Cartel para concurso basado en un festival de rock ficticio realizado en Madrid.</p>
        </article>
        <section class="portfolio-project-container__images full" aria-label="Imágenes del poster del Mad Rock Fest">
          <OptimizedImageComponent image="portfolio/MadRockFest/MadRockFest02" altTitle="Cartel en parada de autobús" />
          <OptimizedImageComponent image="portfolio/MadRockFest/MadRockFest03" altTitle="Camiseta de hombre con el logo del festival" />
          <OptimizedImageComponent image="portfolio/MadRockFest/MadRockFest01" altTitle="Pegatina del festival en entorno urbano" />
        </section>
      </div>
    </section>
  </main>
  <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import OptimizedImageComponent from '@/components/OptimizedImageComponent.vue';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    OptimizedImageComponent
  }
}
</script>
<style lang="scss">
</style>