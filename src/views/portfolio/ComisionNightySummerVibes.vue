<template>
    <NavbarComponent sideType="designer" />
    <main class="main-container">
        <section>
            <h2 class="section-title">Nighty Summer Vibes</h2>
            <div class="portfolio-project-container">
                <article>
                    <p>
                        La premisa fue la necesidad de plasmar las noches de verano en un conocido pueblo madrileño donde veraneaban tres amigos. Había la necesidad de representar la vuelta a casa tras salir de fiesta, o de cenar, o de tomar algo. Era necesario destacar el cielo nocturno de verano, despojado de la contaminación lumínica de la capital. 
                    </p>
                </article>
                <section class="portfolio-project-container__images full" aria-label="Imágenes del retrato a Isabel II de Inglaterra">
                    <OptimizedImageComponent
                        image="portfolio/ComisiónNightySummerVibes/NightySummerVibes"
                        altTitle="Ilustración de tres personas caminando por la carretera en una noche estrellada de verano"
                        format="jpg"/>
                    <OptimizedImageComponent
                        image="portfolio/ComisiónNightySummerVibes/mockup1"
                        altTitle="La misma ilustración colocada en un marco como un mockup"
                        format="jpg"/>
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