<template>
  <NavbarComponent sideType="designer" />
  <div class="main-container">
    <h2 class="section-title">Logo 50 Aniversario</h2>
    <div class="portfolio-project-container">
      <div>
        <p>Logo especial 50 aniversario para grupo scout.</p>
      </div>
      <div class="portfolio-project-container__images full">
        <OptimizedImageComponent image="portfolio/Kenya225/Scouts05" altTitle="Logo en sudadera morada" />
        <OptimizedImageComponent image="portfolio/Kenya225/Scouts04" altTitle="Logo en sudadera dorada" />
        <OptimizedImageComponent image="portfolio/Kenya225/Scouts01" altTitle="Logo en tazas de acampada" />
        <OptimizedImageComponent image="portfolio/Kenya225/Scouts02" altTitle="Logo bordado en camiseta morada" />
        <OptimizedImageComponent image="portfolio/Kenya225/Scouts03" altTitle="Logo bordado en camiseta dorada" />
        
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
</style>