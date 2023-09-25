<template>
    <NavbarComponent sideType="designer" />
    <div class="main-container">
        <h2 class="section-title">Metal Portraits</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Póster creado para la banda de heavy metal Moldava, Infected Rain, celebrando el paso de su gira por España</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImageComponent image="portfolio/InfectedRainPoster/Poster01" altTitle="Póster en marquesina" />
                <OptimizedImageComponent image="portfolio/InfectedRainPoster/Poster02" altTitle="Póster en pared blanca" />
                <OptimizedImageComponent image="portfolio/InfectedRainPoster/Poster03" altTitle="Muchos pósters" />
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