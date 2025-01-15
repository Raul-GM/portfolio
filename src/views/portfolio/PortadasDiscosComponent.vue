<template>
  <NavbarComponent sideType="designer"/>
  <main class="main-container">
    <section>
      <h2 class="section-title">Portadas para colección de discos</h2>
      <div class="portfolio-project-container">
        <article>
          <p>Portadas de discos de colección de música para proyecto de la universidad. La premisa era realizar cinco portadas de una serie de discos que pertenecieran a una misma colección (inventada). Dicha colección debería compartir atributos de tal forma que se distinguiera a simple vista que los cinco volúmenes forman parte de un todo.</p>
        </article>
        <section class="portfolio-project-container__images full" aria-label="Imágenes de colección de CDs, Leyendas del Metal">
          <OptimizedImageComponent image="portfolio/DiscosLeyendasMetal/DioCD" altTitle="Portada CD Ronnie James Dio" />
          <OptimizedImageComponent image="portfolio/DiscosLeyendasMetal/DoroCD" altTitle="Portada CD Doro Pesch" />
          <OptimizedImageComponent image="portfolio/DiscosLeyendasMetal/LemmyCD" altTitle="Portada CD Lemmy Kilmister" />
          <OptimizedImageComponent image="portfolio/DiscosLeyendasMetal/RobCD" altTitle="Portada CD Rob Halford" />
          <OptimizedImageComponent image="portfolio/DiscosLeyendasMetal/JoanCD" altTitle="Portada CD Joan Jett" />
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