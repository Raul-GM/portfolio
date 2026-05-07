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
import { useSeoMeta, getSchemaCreativeWork } from '@/composables/useSeoMeta';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    OptimizedImageComponent
  },
  setup() {
    useSeoMeta({
      title: 'Mad Rock Fest | Cartel Festival de Rock - Raúl García',
      description: 'Cartel para festival de rock ficticio en Madrid. Incluye diseño de póster, camiseta y pegatina.',
      ogImage: 'portfolio/MadRockFest/MadRockFest02_640.jpeg',
      ogUrl: 'https://raulgarcia.me/portfolio/madrock-fest',
      schema: getSchemaCreativeWork({
        title: 'Mad Rock Fest',
        description: 'Cartel para concurso basado en un festival de rock ficticio realizado en Madrid.',
        image: 'https://raulgarcia.me/portfolio/MadRockFest/MadRockFest02_640.jpeg',
        dateCreated: '2023-02-01',
        url: 'https://raulgarcia.me/portfolio/madrock-fest'
      })
    });
  }
}
</script>
<style lang="scss">
</style>