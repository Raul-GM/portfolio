<template>
  <NavbarComponent sideType="designer" />
  <main class="main-container">
    <section>
      <h2 class="section-title">CRUSH Helados</h2>
      <div class="portfolio-project-container">
        <article>
          <p>Resultado del examen final de la asignatura de Diseño Gráfico. Teníamos que representar una gráfica promocionando un helado. El logo y naming lo poníamos nosotros. Nos dieron unas pocas decenas de imágenes para usar las que quisiéramos. También podíamos usar elementos gráficos creados por nosotros.</p>
        </article>
        <section class="portfolio-project-container__images full" aria-label="Imágenes del cartel del helado Crush">
          <OptimizedImageComponent image="portfolio/Crush/CRUSH_Bush_stop" altTitle="Cartel en parada de autobús" />
          <OptimizedImageComponent image="portfolio/Crush/CRUSH_tres_posters" altTitle="Tres posters en muro" />
          <OptimizedImageComponent image="portfolio/Crush/CRUSH_Street_Billboard" altTitle="Cartel en Billboard en la calle" />
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
      title: 'CRUSH Helados | Diseño Gráfico - Raúl García',
      description: 'Proyecto de diseño gráfico: campaña publicitaria integral de CRUSH Helados. Incluye logo, naming y materiales de promoción.',
      ogImage: 'portfolio/Crush/CRUSH_Street_Billboard_640.jpeg',
      ogUrl: 'https://raulgarcia.me/portfolio/crush',
      schema: getSchemaCreativeWork({
        title: 'CRUSH Helados',
        description: 'Resultado del examen final de la asignatura de Diseño Gráfico. Campaña publicitaria integral para marca de helados.',
        image: 'https://raulgarcia.me/portfolio/Crush/CRUSH_Street_Billboard_640.jpeg',
        dateCreated: '2022-06-01',
        url: 'https://raulgarcia.me/portfolio/crush'
      })
    });
  }
}
</script>
<style lang="scss">
</style>