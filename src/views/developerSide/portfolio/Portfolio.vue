<template>
    <Navbar />
    <div class="main-container">
        <h1 class="section-title">Portfolio</h1>
        <div class="portfolio">
            <ProjectCard 
                title="Skulls N' Ravens"
                imgSrc="portfolio/SkullsAndRavens/SkullsNRavens01.png"
                resume="Skulls N'Ravens es un blog en el que hablo de música orientada al Rock y al Metal. La idea nació a raíz de dos necesidades, en primer lugar, como apasionado de la música y de los conciertos..."
                projectSrc="/developer-side/portfolio/skulls-n-ravens" />
            <ProjectCard 
                title="Rock This Concert"
                imgSrc="portfolio/SkullsAndRavens/SkullsNRavens01.png"
                resume="Rock This Concert nace de una necesidad que tuve hace ya bastantes años. Soy una persona que le encanta la música, y sobretodo la música en directo. El estilo de música que me gusta es..."
                projectSrc="/developer-side/portfolio/RTC" />
        </div>
    </div>
    <Footer />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ProjectCard from '@/components/ProjectCard.vue';

export default {
    components: {
        Navbar,
        Footer,
        ProjectCard
    }
}
</script>
<style lang="scss">

.main-container .portfolio {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
    grid-gap: 2rem;
    grid-auto-rows: min-content;
    padding-bottom: 2rem;
    justify-content: space-between;

}
.project-container {
    &__info {
        display: flex;
        &__image-container {
            display: flex;
            flex-direction: column;
            padding-left: 1rem;
            a {
                text-align: center;
            }
        }
    }
    img {
        height: 150px;
    }
}
</style>