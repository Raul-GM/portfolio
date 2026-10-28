<template>
    <NavbarComponent sideType="designer" />
    <main class="main-container">
        <section>
            <h2 class="section-title">Retratos personalizados</h2>
            <div class="portfolio-project-container">
                <article>
                    <p>Colección de retratos personalizados. Para realizarlos suelo recolectar información del cliente como quién o quiénes aparecerán en el retrato final, gustos, fotos varias para tener diferentes referencias de estilos de ropa, expresiones, etc. También hablamos sobre el estilo que le gustaría tener como resultado final, si no lo tiene claro aún. Juntos, llegamos a una idea en común que se traduce en una ilustración que puede regalar o colgar en las paredes de su casa.</p>
                </article>
                <section class="portfolio-project-container__images full" aria-label="Imágenes de las comisiones de retratos">
                    <OptimizedImageComponent
                        image="portfolio/Portraits/comision2"
                        altTitle="Dos retratos de 3 amigas"
                        format="png"/>
                    <OptimizedImageComponent
                        image="portfolio/Portraits/comision1"
                        altTitle="Retrato de una familia para regalo de boda"
                        format="png"/>
                    
                </section>
            </div>
        </section>
    </main>
    <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import OptimizedImageComponent from '@/components/OptimizedImageComponent.vue';
import { useSeoMeta, getSchemaCreativeWork } from '@/composables/useSeoMeta';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    OptimizedImageComponent
  },
  setup() {
    useSeoMeta({
      title: 'Retratos Personalizados | Comisiones de Ilustración - Raúl García',
      description: 'Servicio de retratos personalizados. Ilustraciones únicas basadas en referencias fotográficas del cliente.',
      ogImage: 'portfolio/Portraits/comision2_640.png',
      ogUrl: 'https://raulgarcia.me/portfolio/comision-retratos-personalizados',
      schema: getSchemaCreativeWork({
        title: 'Retratos personalizados',
        description: 'Colección de retratos personalizados realizados según referencias y preferencias del cliente.',
        image: 'https://raulgarcia.me/portfolio/Portraits/comision2_640.png',
        dateCreated: '2023-10-01',
        url: 'https://raulgarcia.me/portfolio/comision-retratos-personalizados'
      })
    });
  }
}
</script>
<style lang="scss">

</style>