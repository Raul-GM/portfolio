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