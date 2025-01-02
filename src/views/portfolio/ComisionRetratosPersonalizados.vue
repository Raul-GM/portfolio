<template>
    <NavbarComponent sideType="designer" />
    <div class="main-container">
        <h2 class="section-title">Retratos personalizados</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Colección de retratos personalizados. Para realizarlos suelo recolectar información del cliente como quién o quiénes aparecerán en el retrato final, gustos, fotos varias para tener diferentes referencias de estilos de ropa, expresiones, etc. También hablamos sobre el estilo que le gustaría tener como resultado final, si no lo tiene claro aún. Juntos, llegamos a una idea en común que se traduce en una ilustración que puede regalar o colgar en las paredes de su casa.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImageComponent
                    image="portfolio/Portraits/comision2"
                    altTitle="Dos retratos de 3 amigas"
                    format="png"/>
                <OptimizedImageComponent
                    image="portfolio/Portraits/comision1"
                    altTitle="Retrato de una familia para regalo de boda"
                    format="png"/>
                
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