<template>
  <NavbarComponent sideType="designer" />
  <main class="main-container">
    <section>
      <h2 class="section-title">Videoclip Nebula</h2>
      <div class="portfolio-project-container">
        <article>
          <p>Videoclip creado para la canción Nebula del grupo Ankor. Este videoclip ha sido realizado con clips grabados por mi y clips libres de derechos que se pueden encontrar en bibliotecas online.</p>
        </article>      
        <section class="portfolio-project-container__images full video" aria-label="Vídeo de Nebula">
          <iframe width="640" height="360" src="https://www.youtube.com/embed/Fb4N0MDjgyc?si=jeV084QD6GuZUbOQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </section>
        <section class="portfolio-project-container__images full" aria-label="Fotogramas del vídeo de Nebula">
          <OptimizedImageComponent image="portfolio/VideoclipNebula/Reloj" altTitle="El reloj no perdona a nadie" />
          <OptimizedImageComponent image="portfolio/VideoclipNebula/Padre" altTitle="El padre" />
          <OptimizedImageComponent image="portfolio/VideoclipNebula/Hija" altTitle="La hija" />
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
      title: 'Videoclip Nebula | Ankor - Raúl García',
      description: 'Videoclip creado para la canción "Nebula" del grupo Ankor. Mezcla de clips propios y material de libre acceso.',
      ogImage: 'portfolio/VideoclipNebula/Reloj_640.jpeg',
      ogUrl: 'https://raulgarcia.me/portfolio/videoclip-nebula',
      schema: getSchemaCreativeWork({
        title: 'Videoclip Nebula',
        description: 'Videoclip creado para la canción Nebula del grupo Ankor con clips grabados y material libre de derechos.',
        image: 'https://raulgarcia.me/portfolio/VideoclipNebula/Reloj_640.jpeg',
        dateCreated: '2023-07-01',
        url: 'https://raulgarcia.me/portfolio/videoclip-nebula'
      })
    });
  }
}
</script>
<style lang="scss">
.portfolio-project-container__images.video {
  padding-bottom: 1.2rem;
}
</style>