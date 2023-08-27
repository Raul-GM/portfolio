<template>
    <NavbarComponent sideType="designer"/>
    <div class="main-container">
        <h2 class="section-title">Gráfica Malas Mujeres</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Gráfica publicitaria / Póster del libro de María Hesse, "Malas Mujeres". Trabajo para la asignatura de diseño gráfico consistente en hacer una gráfica publicitaria en formato A4 sobre un producto a nuestra elección usando sólamente componentes hechos con papel, cartulina o derivados y sin realizar ningún retoque via Photoshop más que ajustes de luces, sombras, tono, etc.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImageComponent image="portfolio/MalasMujeres/Malas_Mujeres"
                    altTitle="Gráfica final de Malas Mujeres" />
                <OptimizedImageComponent image="portfolio/MalasMujeres/Malas_Mujeres_Poster_2" altTitle="Póster de la gráfica en marco apoyado en la pared" />
                <OptimizedImageComponent image="portfolio/MalasMujeres/Malas_Mujeres_Poster" altTitle="Póster de la gráfica colgado en la pared" />
            </div>
        </div>
    </div>
    <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/phaseII/NavbarComponent.vue';
import FooterComponent from '@/components/phaseII/FooterComponent.vue';
import OptimizedImageComponent from '@/components/phaseII/OptimizedImageComponent.vue';
export default {
  components: {
    NavbarComponent,
    FooterComponent,
    OptimizedImageComponent
  }
}
</script>
<style lang="scss">
</style>