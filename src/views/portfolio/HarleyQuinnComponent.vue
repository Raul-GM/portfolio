<template>
    <NavbarComponent sideType="designer" />
    <main class="main-container">
        <section>
            <h2 class="section-title">Harley Quinn</h2>
            <div class="portfolio-project-container">
                <article>
                    <p>Primera ilustración 100% digital basado en una ilustración de Laia López.</p>
                </article>
                <section class="portfolio-project-container__images full" aria-label="Ilustración de Harley Quinn">
                    <OptimizedImageComponent image="illustrations/HarleyQuinn/Harley_Quinn" altTitle="Ilustración de Harley Quinn" />
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
      title: 'Harley Quinn | Ilustración Digital - Raúl García',
      description: 'Primera ilustración 100% digital de Harley Quinn. Obra basada en el estilo de Laia López.',
      ogImage: 'illustrations/HarleyQuinn/Harley_Quinn_640.jpeg',
      ogUrl: 'https://raulgarcia.me/portfolio/harley-quinn',
      schema: getSchemaCreativeWork({
        title: 'Harley Quinn',
        description: 'Primera ilustración 100% digital basada en una ilustración de Laia López.',
        image: 'https://raulgarcia.me/illustrations/HarleyQuinn/Harley_Quinn_640.jpeg',
        dateCreated: '2022-11-01',
        url: 'https://raulgarcia.me/portfolio/harley-quinn'
      })
    });
  }
}
</script>
<style lang="scss">
</style>