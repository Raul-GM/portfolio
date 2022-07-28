<template>
    <div class="portfolio-container">
        <h1 class="portfolio-container__title section-title">Portfolio</h1>
        <span class="portfolio-container__text">
            La mayoría de mis proyectos son para las empresas para las que he estado trabajando o son proyectos sencillos para aprender algo en concreto o practicar alguna tecnología. No obstante me gustaría mostraros un par de proyectos más "acabados" en los que he estado (estoy) trabajando
        </span>
        <div class="portfolio-container__project">Skulls N' Ravens</div>
        <div class="portfolio-container__project">Proyecto 2</div>
    </div>
</template>

<script>
export default {

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
    padding: 1rem 0;
    &__title {
        grid-area: title;
        justify-self: center;
    }
    &__text {
        grid-area: text;
        padding-bottom: 2rem;
    }
    &__project {
        justify-self: center;
        &:first-of-type {
            grid-area: project1;
        }
        &:last-of-type {
            grid-area: project2;
        }
    }
}

</style>