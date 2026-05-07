<template>
    <NavbarComponent sideType="designer" />
    <main class="main-container">
        <section>
            <h2 class="section-title">Póster de grupo de músico</h2>
            <div class="portfolio-project-container">
                <article>
                    <p>Póster creado para la banda de heavy metal Moldava, Infected Rain, celebrando el paso de su gira por España</p>
                </article>
                <section class="portfolio-project-container__images full" aria-label="Imágenes del poster de Infected Rain">
                    <OptimizedImageComponent image="portfolio/InfectedRainPoster/Poster01" altTitle="Póster en marquesina" />
                    <OptimizedImageComponent image="portfolio/InfectedRainPoster/Poster02" altTitle="Póster en pared blanca" />
                    <OptimizedImageComponent image="portfolio/InfectedRainPoster/Poster03" altTitle="Muchos pósters" />
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
      title: 'Infected Rain | Póster Banda Heavy Metal - Raúl García',
      description: 'Póster diseñado para la banda de heavy metal Infected Rain celebrando su gira por España.',
      ogImage: 'portfolio/InfectedRainPoster/Poster03_640.jpeg',
      ogUrl: 'https://raulgarcia.me/portfolio/infected-rain-poster',
      schema: getSchemaCreativeWork({
        title: 'Póster de grupo de música',
        description: 'Póster creado para la banda de heavy metal Infected Rain, celebrando el paso de su gira por España.',
        image: 'https://raulgarcia.me/portfolio/InfectedRainPoster/Poster03_640.jpeg',
        dateCreated: '2023-06-01',
        url: 'https://raulgarcia.me/portfolio/infected-rain-poster'
      })
    });
  }
}
</script>
<style lang="scss">
</style>