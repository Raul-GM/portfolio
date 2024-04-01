<template>
  <NavbarComponent sideType="designer" />
  <div class="main-container">
    <h2 class="section-title">Videoclip Nebula</h2>
    <div class="portfolio-project-container">
      <div>
        <p>Videclip creado para la canción Nebula del grupo Ankor. Este videoclip ha sido realizado con clips grabados por mi y clips libres de derechos que se pueden encontrar en bibliotecas online.</p>
      </div>      
      <div class="portfolio-project-container__images full video">
        <iframe width="640" height="360" src="https://www.youtube.com/embed/Fb4N0MDjgyc?si=jeV084QD6GuZUbOQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div class="portfolio-project-container__images full">
        <OptimizedImageComponent image="portfolio/VideoclipNebula/Reloj" altTitle="El reloj no perdona a nadie" />
        <OptimizedImageComponent image="portfolio/VideoclipNebula/Padre" altTitle="El padre" />
        <OptimizedImageComponent image="portfolio/VideoclipNebula/Hija" altTitle="La hija" />
      </div>
    </div>
  </div>
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
.portfolio-project-container__images.video {
  padding-bottom: 1.2rem;
}
</style>