<template>
    <NavbarComponent sideType="designer" />
    <div class="main-container">
        <h2 class="section-title">Harley Quinn</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Primera ilustración 100% digital basado en una ilustración de Laia López.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImageComponent image="illustrations/HarleyQuinn/Harley_Quinn" altTitle="Enrik de Dark Moor" />
            </div>
        </div>
    </div>
    <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/phaseII/NavbarComponent.vue';
import FooterComponent from '@/components/phaseII/FooterComponent.vue';
import OptimizedImageComponent from '@/components/phaseII/OptimizedImageComponent.vue';

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