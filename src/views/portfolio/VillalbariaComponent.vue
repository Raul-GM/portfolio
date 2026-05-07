<template>
    <NavbarComponent/>
    <main class="main-container">
        <section>
            <h2 class="section-title">Villalbaria: Valla publicitaria y roll-up</h2>
            <div class="portfolio-project-container">
                <article>
                    <p>Valla publicitaria y roll-up para inmobiliaria ficticia llamada Villalbaria. El logotipo fue creado en equipo. A partir de los colores del imagotipo trabajé para crear una valla publicitaria y un roll-up que promocionase la venta de una serie de viviendas en las que destacara sus virtudes.</p>
                </article>
                <section class="portfolio-project-container__images full" aria-label="Imágenes del proyecto Villalbaria Inmobiliaria">
                    <OptimizedImageComponent image="portfolio/VillalbariaInmobiliaria/Valla_Publicitaria" altTitle="Valla publicitaria de Villalbaria" />
                    <OptimizedImageComponent image="portfolio/VillalbariaInmobiliaria/Roll_Up" altTitle="Roll-up de Villalbaria" />
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
      title: 'Villalbaria Inmobiliaria | Valla y Roll-up - Raúl García',
      description: 'Proyecto de diseño para inmobiliaria ficticia. Valla publicitaria y roll-up con identidad visual cohesiva.',
      ogImage: 'portfolio/VillalbariaInmobiliaria/Valla_Publicitaria_640.jpeg',
      ogUrl: 'https://raulgarcia.me/portfolio/villalbaria',
      schema: getSchemaCreativeWork({
        title: 'Villalbaria: Valla publicitaria y roll-up',
        description: 'Valla publicitaria y roll-up para inmobiliaria ficticia con identidad visual cohesiva basada en su imagotipo.',
        image: 'https://raulgarcia.me/portfolio/VillalbariaInmobiliaria/Valla_Publicitaria_640.jpeg',
        dateCreated: '2023-04-01',
        url: 'https://raulgarcia.me/portfolio/villalbaria'
      })
    });
  }
}
</script>
<style lang="scss">
</style>