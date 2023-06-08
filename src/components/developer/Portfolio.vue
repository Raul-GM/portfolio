<template>
    <div class="portfolio-container">
        <h1 class="portfolio-container__title section-title">Portfolio</h1>
        <span class="portfolio-container__text">
            La mayoría de mis proyectos son para las empresas para las que he estado trabajando o son proyectos sencillos para aprender algo en concreto o practicar alguna tecnología. No obstante me gustaría mostraros un par de proyectos más "acabados" en los que he estado (y estoy) trabajando
        </span>
        <router-link
            class="portfolio-container__project"
            to="/developer-side/portfolio/skulls-n-ravens"
        >
            <h4 class="portfolio-container__project__title">Skulls N' Ravens</h4>
            <Image
                class="portfolio-container__project__image" 
                file="portfolio/SkullsAndRavens/main.jpeg"/>
        </router-link>
        <router-link
            class="portfolio-container__project"
            to="/developer-side/portfolio/RTC"
        >
            <h4 class="portfolio-container__project__title">Rock This Concert</h4>
            <Image
                class="portfolio-container__project__image" 
                file="portfolio/RockThisConcert/main.jpeg"/>
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

</style>
