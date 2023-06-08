<template>
    <Navbar sideType="designer"/>
    <div class="main-container">
        <h2 class="section-title">CRUSH Helados</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Resultado del examen final de la asignatura de Diseño Gráfico. Teníamos que representar una gráfica promocionando un helado. El logo y naming lo poníamos nosotros. Nos dieron unas pocas decenas de imágenes para usar las que quisiéramos. También podíamos usar elementos gráficos creados por nosotros.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImage image="portfolio/Crush/CRUSH" altTitle="Cartel final de CRUSH Helados" />
                <OptimizedImage image="portfolio/Crush/CRUSH_tres_posters" altTitle="Tres posters en muro" />
                <OptimizedImage image="portfolio/Crush/CRUSH_Street_Billboard" altTitle="Cartel en Billboard en la calle" />
                <OptimizedImage image="portfolio/Crush/CRUSH_Bush_stop" altTitle="Cartel en parada de autobús" />
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