<template>
    <div class="portfolio-container">
        <h1 class="portfolio-container__title section-title">Portfolio</h1>
        <span class="portfolio-container__text">
            La mayoría de mis proyectos son para las empresas para las que he estado trabajando o son proyectos sencillos para aprender algo en concreto o practicar alguna tecnología. No obstante me gustaría mostraros un par de proyectos más "acabados" en los que he estado (estoy) trabajando
        </span>
        <router-link
        class="portfolio-container__project"
            to="/developer-side/portfolio/skulls-n-ravens"
        >
            <h4 class="portfolio-container__project__title">Skulls N' Ravens</h4>
            <Image
                class="portfolio-container__project__image" 
                file="portfolio/SkullsAndRavens/SkullsNRavens01.png"/>
        </router-link>
        <router-link
        class="portfolio-container__project"
            to="/developer-side/portfolio/RTC"
        >
            <h4 class="portfolio-container__project__title">Rock This Concert</h4>
            <Image
                class="portfolio-container__project__image" 
                file="portfolio/SkullsAndRavens/SkullsNRavens01.png"/>
        </router-link>
    </div>
    <div class="portfolio-more-projects-button">
        <Link
            class="aboutme-container__full"
            label="Más proyectos"
            href="/developer-side/portfolio"
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
