<template>
    <NavbarComponent sideType="designer" />
    <div class="main-container">
        <h2 class="section-title">Metal Portraits</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Serie de retratos realizados en digital sobre artistas del rock y del metal.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImageComponent image="illustrations/MetalPortraits/Enrik" altTitle="Enrik de Dark Moor" />
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