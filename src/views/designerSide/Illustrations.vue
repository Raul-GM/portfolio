<template>
    <Navbar sideType="designer" />
    <div class="main-container">
        <h1 class="section-title">Ilustraciones</h1>
        <div class="portfolio-project-container">
            <h2>Heavy Portraits</h2>
            <p>
                Serie de retratos realizados en digital sobre artistas del rock y del metal
            </p>
            <div class="portfolio-project-container__images full">
                <OptimizedImage image="illustrations/Enrik" altTitle="Enrik García. Guitarrista y líder de Dark Moor" />
            </div>
        </div>
        <div class="portfolio-project-container">
            <h2>Harley Quinn</h2>
            <p>
                Primera ilustración 100% digital basado en una ilustración de Laia López.
            </p>
            <div class="portfolio-project-container__images full">
                <OptimizedImage image="illustrations/Harley_Quinn" altTitle="Ilustración de Harley Quinn" />
            </div>
        </div>
    </div>
    <Footer />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import OptimizedImage from '@/components/OptimizedImage.vue';
export default {
    components: {
        Navbar,
        Footer,
        OptimizedImage
    }
}
</script>
<style lang="scss">
</style>