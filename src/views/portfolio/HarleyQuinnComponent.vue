<template>
    <NavbarComponent sideType="designer" />
    <div class="main-container">
        <h2 class="section-title">Harley Quinn</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Primera ilustración 100% digital basado en una ilustración de Laia López.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImageComponent image="illustrations/HarleyQuinn/Harley_Quinn" altTitle="Ilustración de Harley Quinn" />
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