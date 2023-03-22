<template>
    <Navbar sideType="designer"/>
    <div class="main-container">
        <h2 class="section-title">Gráfica Malas Mujeres</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Gráfica publicitaria / Póster del libro de María Hesse, "Malas Mujeres". Trabajo para la asignatura de diseño gráfico consistente en hacer una gráfica publicitaria en formato A4 sobre un producto a nuestra elección usando sólamente componentes hechos con papel, cartulina o derivados y sin realizar ningún retoque via Photoshop más que ajustes de luces, sombras, tono, etc.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImage image="portfolio/MalasMujeres/Malas_Mujeres"
                    altTitle="Gráfica final de Malas Mujeres" />
                <Image file="portfolio/MalasMujeres/Malas_Mujeres_Poster_2.png" altTitle="Póster de la gráfica en marco apoyado en la pared" />
                <Image file="portfolio/MalasMujeres/Malas_Mujeres_Poster.png" altTitle="Póster de la gráfica colgado en la pared" />
            </div>
        </div>
    </div>
    <Footer />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Image from '@/components/Image.vue';
import OptimizedImage from '@/components/OptimizedImage.vue';
export default {
    components: {
        Navbar,
        Footer,
        Image,
        OptimizedImage
    }
}
</script>
<style lang="scss">
</style>