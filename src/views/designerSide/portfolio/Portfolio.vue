<template>
    <Navbar sideType="designer" />
    <div class="main-container">
        <h1 class="section-title">Portfolio</h1>
        <div class="portfolio">
            <ProjectCard 
                title="CRUSH Helados"
                imgSrc="portfolio/Crush/CRUSH_Street_Billboard.png"
                resume="Resultado del examen final de la asignatura de Diseño Gráfico. Teníamos que representar una gráfica promocionando un helado..."
                projectSrc="/designer-side/portfolio/crush" />
            <ProjectCard 
                title="Gráfica Malas Mujeres"
                imgSrc="portfolio/MalasMujeres/Malas_Mujeres_Poster_2.png"
                resume="Gráfica publicitaria / Póster del libro de María Hesse, 'Malas Mujeres'. Trabajo para la asignatura de diseño gráfico consistente..."
                projectSrc="/designer-side/portfolio/malas-mujeres" />
            <ProjectCard 
                title="Portadas de discos"
                imgSrc="portfolio/DiscosLeyendasMetal/DioCD.png"
                resume="Portadas de discos para colección de música para proyecto para la universidad. La premisa era realizar cinco portadas de una serie..."
                projectSrc="/designer-side/portfolio/portadas-discos" />
            <ProjectCard 
                title="Villalbaria Inmobiliaria"
                imgSrc="portfolio/VillalbariaInmobiliaria/Valla_Publicitaria.png"
                resume="Vaya publicitaria y roll-up para inmobiliaria ficticia llamada Villalbaria. El logotipo fue creado en equipo. A partir de los colores..."
                projectSrc="/designer-side/portfolio/villalbaria" />
            
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
        ProjectCard,
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