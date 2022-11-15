<template>
    <div class="portfolio-container">
        <h1 class="portfolio-container__title section-title">Portfolio</h1>
        <span class="portfolio-container__text">
            A día de hoy no tengo ningún trabajo profesional que mostrar así que voy a compartir los mejores trabajos, los más cercanos al producto final que he hecho hasta la fecha en la carrera. Además, compartiré también otros trabajos artísticos que a priori no estén relacionados con el diseño.
        </span>
        <router-link
        class="portfolio-container__project"
            to="/designer-side/portfolio/crush"
        >
            <h4 class="portfolio-container__project__title">Helado Crush</h4>
            <Image
                class="portfolio-container__project__image" 
                file="portfolio/Crush/main.png"/>
        </router-link>
        <router-link
            class="portfolio-container__project"
            to="/designer-side/portfolio/malas-mujeres"
        >
            <h4 class="portfolio-container__project__title">Gráfica para "Malas Mujeres"</h4>
            <Image
                class="portfolio-container__project__image" 
                file="portfolio/MalasMujeres/main.png"/>
        </router-link>
    </div>
    <div class="portfolio-more-projects-button">
        <Link
            class="aboutme-container__full"
            label="Más proyectos"
            href="/designer-side/portfolio"
        />
    </div>
    
</template>

<script>
import Image from '../Image.vue';
import Link from '@/components/Link.vue';

export default {
    components: { Image, Link }
}
</script>

<style lang="scss">

.portfolio-more-projects-button {
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
}
</style>
