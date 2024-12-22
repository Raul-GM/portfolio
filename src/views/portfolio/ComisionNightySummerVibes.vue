<template>
    <NavbarComponent sideType="designer" />
    <div class="main-container">
        <h2 class="section-title">Nighty Summer Vibes</h2>
        <div class="portfolio-project-container">
            <div>
                <p>...</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImageComponent
                    image="portfolio/ComisiónNightySummerVibes/NightySummerVibes"
                    altTitle="Ilustración de tres personas caminando por la carretera en una noche estrellada de verano"
                    format="jpg"/>
                <OptimizedImageComponent
                    image="portfolio/ComisiónNightySummerVibes/mockup1"
                    altTitle="La misma ilustración colocada en un marco como un mockup"
                    format="jpg"/>
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