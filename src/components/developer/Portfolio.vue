<template>
    <div class="portfolio-container">
        <h1 class="portfolio-container__title section-title">PORTFOLIO</h1>
        <span class="portfolio-container__text">
            Vis id minim dicant sensibus. Pri aliquip conclusionemque ad, ad malis evertitur torquatos his. Has ei solum harum reprimique, id illum saperet tractatos his. Ei omnis soleat antiopam quo. Ad augue inani postulant mel, mel ea qualisque forensibus.
        </span>
        <div class="portfolio-container__project">Proyecto 1</div>
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
    padding: 2rem 0;
    &__title {
        grid-area: title;
        justify-self: center;
    }
    &__text {
        grid-area: text;
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