<template>
    <Navbar sideType="designer"/>
    <div class="main-container">
        <h2 class="section-title">Villalbaria: Valla publicitaria y roll-up</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Valla publicitaria y roll-up para inmobiliaria ficticia llamada Villalbaria. El logotipo fue creado en equipo. A partir de los colores del imagotipo trabajé para crear una valla publicitaria y un roll-up que promocionase la venta de una serie de viviendas en las que destacara sus virtudes.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImage image="portfolio/VillalbariaInmobiliaria/Valla_Publicitaria" altTitle="Valla publicitaria de Villalbaria" />
                <OptimizedImage image="portfolio/VillalbariaInmobiliaria/Roll_Up" altTitle="Roll-up de Villalbaria" />
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