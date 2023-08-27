<template>
    <NavbarComponent sideType="designer"/>
    <div class="main-container">
        <h2 class="section-title">Villalbaria: Valla publicitaria y roll-up</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Valla publicitaria y roll-up para inmobiliaria ficticia llamada Villalbaria. El logotipo fue creado en equipo. A partir de los colores del imagotipo trabajé para crear una valla publicitaria y un roll-up que promocionase la venta de una serie de viviendas en las que destacara sus virtudes.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImageComponent image="portfolio/VillalbariaInmobiliaria/Valla_Publicitaria" altTitle="Valla publicitaria de Villalbaria" />
                <OptimizedImageComponent image="portfolio/VillalbariaInmobiliaria/Roll_Up" altTitle="Roll-up de Villalbaria" />
            </div>
        </div>
    </div>
    <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import OptimizedImageComponent from '@/components/OptimizedImageComponent.vue';

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