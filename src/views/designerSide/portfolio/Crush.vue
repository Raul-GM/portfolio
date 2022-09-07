<template>
    <Navbar sideType="designer"/>
    <div class="main-container">
        <h2 class="section-title">CRUSH Helados</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Resultado del examen final de la asignatura de Diseño Gráfico. Teníamos que representar una gráfica promocionando un helado. El logo y naming lo poníamos nosotros. Nos dieron unas pocas decenas de imágenes para usar las que quisiéramos. También podíamos usar elementos gráficos creados por nosotros.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <Image file="portfolio/Crush/CRUSH.jpg" altTitle="Cartel final de CRUSH Helados" />
                <Image file="portfolio/Crush/CRUSH_tres_posters.png" altTitle="Tres posters en muro" />
                <Image file="portfolio/Crush/CRUSH_Street_Billboard.png" altTitle="Cartel en Billboard en la calle" />
                <Image file="portfolio/Crush/CRUSH_Bush_stop.png" altTitle="Cartel en parada de autobús" />
            </div>
        </div>
    </div>
    <Footer />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Image from '@/components/Image.vue';

export default {
    components: {
        Navbar,
        Footer,
        Image
    }
}
</script>
<style lang="scss">
</style>