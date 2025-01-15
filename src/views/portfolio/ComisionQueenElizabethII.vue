<template>
    <NavbarComponent/>
    <main class="main-container">
        <section>
            <h2 class="section-title">Queen Elizabeth II</h2>
            <div class="portfolio-project-container">
                <article>
                    <p>Este retrato fue creado por petición de una persona que me pidió una ilustración de la Reina Isabel II de Inglaterra siendo el icono Pop que fue. El resto me lo dejó a mi elección. Lo primero que hice fue empaparme de la vida y obra de esta persona. Desde lo oficial hasta lo publicado en la prensa más amarilla de Inglaterra. Desgranando los aspectos más interesantes o los que yo pensaba que podían enriquecer a la ilustración final. Tras el proceso de investigación, llegué a la conclusión que sería interesante imaginar a la Reina de Inglaterra como una persona que bajo esa rectitud y pomposidad que requiere la corona británica, subyacía una vena irreverente que sólo se lo guardaba para ella misma. De ahí que jugara con la idea que, debajo de toda la ropa, Isabel II tenía innumerables tatuajes sobre eventos o personas que hayan marcado su vida. Todo esto arropada por la bandera británica y sobre un fondo con una colección de noticias suyas de periódicos de diferentes países del mundo ya que, la prensa ha sido un elemento constante en su vida.</p>
                </article>
                <section class="portfolio-project-container__images full" aria-label="Imágenes del retrato a Isabel II">
                    <OptimizedImageComponent
                        image="portfolio/ComisionQueenElizabethII/elizabeth_ii"
                        altTitle="Ilustración de la Reina Isabel II"
                        format="jpg"/>
                    <OptimizedImageComponent
                        image="portfolio/ComisionQueenElizabethII/mockup1"
                        altTitle="Retrato de Isabel II de Inglaterra en mockup"
                        format="jpg"/>
                    <OptimizedImageComponent
                        image="portfolio/ComisionQueenElizabethII/mockup2"
                        altTitle="Otro etrato de Isabel II de Inglaterra en mockup"
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