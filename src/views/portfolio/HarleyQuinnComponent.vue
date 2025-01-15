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