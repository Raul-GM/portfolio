<template>
    <NavbarComponent sideType="designer" />
    <div class="main-container">
        <h2 class="section-title">Queen Elizabeth II</h2>
        <div class="portfolio-project-container">
            <div>
                <p>...</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImageComponent
                    image="portfolio/ComisionQueenElizabethII/elizabeth_ii"
                    altTitle="Ilustración de la Reina Isabel II"
                    format="jpg"/>
                <OptimizedImageComponent
                    image="portfolio/ComisionQueenElizabethII/mockup1"
                    altTitle="Retrato de Isabel II de Inglaterra en mockup"
                    format="jpg"/>
                <OptimizedImageComponent
                    image="portfolio/ComisionQueenElizabethII/mockup2"
                    altTitle="Otro etrato de Isabel II de Inglaterra en mockup"
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