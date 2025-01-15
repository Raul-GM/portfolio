<template>
    <NavbarComponent sideType="designer" />
    <main class="main-container">
        <section>
            <h2 class="section-title">Retratos de música</h2>
            <div class="portfolio-project-container">
                <article>
                    <p>Serie de retratos realizados en digital sobre artistas del rock y del metal.</p>
                </article>
                <section>
                    <h4 class="section-title">Ankor</h4>
                    <section class="portfolio-project-container__images full" aria-label="Ilustraciones del grupo Ankor">
                        <OptimizedImageComponent image="illustrations/MetalPortraits/Ankor/JesseWilliams" altTitle="Jesse Williams de Ankor" />
                        <OptimizedImageComponent image="illustrations/MetalPortraits/Ankor/David" altTitle="David Romeu de Ankor" />
                        <OptimizedImageComponent image="illustrations/MetalPortraits/Ankor/EleniNota" altTitle="Eleni Nota de Ankor" />
                        <OptimizedImageComponent image="illustrations/MetalPortraits/Ankor/Fito" altTitle="Fito Martínez de Ankor" />
                        <OptimizedImageComponent image="illustrations/MetalPortraits/Ankor/Julio" altTitle="Julio Sánchez de Ankor" />
                    </section>
                </section>
                <section>
                    <h4 class="section-title">Enrik García de Dark Moor</h4>
                    <section class="portfolio-project-container__images full" aria-label="Ilustraciones del grupo Dark Moor">
                        <OptimizedImageComponent image="illustrations/MetalPortraits/Enrik" altTitle="Enrik de Dark Moor" />
                    </section>
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