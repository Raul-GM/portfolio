<template>
    <div class="portfolio-container">
        <h1 class="portfolio-container__title section-title">Portfolio</h1>
        <span class="portfolio-container__text">
            A día de hoy no tengo ningún trabajo profesional que mostrar así que voy a compartir los mejores trabajos, los más cercanos al producto final que he hecho hasta la fecha en la carrera. Además, compartiré también otros trabajos artísticos que a priori no estén relacionados con el diseño.
        </span>
        <router-link
        class="portfolio-container__project"
            to="/designer-side/portfolio/skulls-n-ravens"
        >
            <h4 class="portfolio-container__project__title">Helado Crush</h4>
            <Image
                class="portfolio-container__project__image" 
                file="portfolio/SkullsNRavens01.png"/>
        </router-link>
        <router-link
        class="portfolio-container__project"
            to="/designer-side/portfolio/RTC"
        >
            <h4 class="portfolio-container__project__title">Gráfica para "Malas Mujeres" de María Hesse</h4>
            <Image
                class="portfolio-container__project__image" 
                file="portfolio/SkullsNRavens01.png"/>
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
.portfolio-container {
    display: grid;
    grid-template-areas: 'title title title title'
                         'text text text text'
                         '. project1 project2 .';
    grid-template-columns: .3fr 1fr 1fr .3fr;
    grid-auto-rows: min-content;
    align-items: center;
    min-height: 400px;
    padding-bottom: 1rem;
    &__title {
        grid-area: title;
        justify-self: center;
    }
    &__text {
        grid-area: text;
        padding-bottom: 2rem;
    }
    &__project {
        display: flex;
        flex-direction: column;
        justify-self: center;
        align-items: center;
        &:hover {
            font-weight: bold;
        }
        &:first-of-type {
            grid-area: project1;
        }
        &:last-of-type {
            grid-area: project2;
        }
        &__title {
            margin-bottom: 1rem;
        }
        .image {
            width: 300px;
        }
    }
}
.portfolio-more-projects-button {
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
}
</style>
