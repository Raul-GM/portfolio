<template>
    <NavbarComponent/>
    <main class="main-container">
        <section class="about-me-detail-container">
          <OptimizedImageComponent
            class="about-me-photo"
            image="aboutMe/Bio"
            altTitle="Foto de perfil de Raúl García"
            :width="1280"
            :height="1280"
            sizes="(min-width: 768px) 40vw, 100vw"
            eager />
          <div>
            <h1 class="section-title">Sobre mí</h1>
            <p><b>¡Hola!</b> Soy Raúl García, ilustrador. Dibujo personajes de series, películas y videojuegos, y retratos de personas reales, sobre todo por encargo.</p>
            <p>Empecé como programador front-end. Trabajando junto a diseñadoras y diseñadores de UI/UX me fui metiendo en el diseño, y en 2020 me apunté al Grado de Diseño Digital de la UNIR. Al mismo tiempo desempolvé los lápices, que tenía olvidados desde niño, y volví a dibujar.</p>
            <p>Hoy me centro en la ilustración de cultura pop y en los retratos.</p>
            <div class="social">
              <p>Si tienes una idea, mira <router-link class="simple_link" to="/encargos">cómo trabajo los encargos</router-link> o escríbeme a <a class="simple_link" href="mailto:raulgm83.art@gmail.com">raulgm83.art@gmail.com</a>.</p>
              <p>También me puedes encontrar en redes sociales en los siguientes enlaces:</p>
              <ul class="social--list">
                <li>
                  <a href="https://www.instagram.com/raulgarcia.design/"
                    target="_blank"
                    class="social--list--link"
                    aria-label="Instagram de Raúl García">
                    <ImageComponent file="icons/instagram.svg" altTitle="Logo Instagram"></ImageComponent>
                  </a>
                </li>
                <li>
                  <a href="https://www.behance.net/raulgm2/projects"
                    target="_blank"
                    class="social--list--link"
                    aria-label="Página de Behance de Raúl García">
                    <ImageComponent file="icons/behance.svg" altTitle="Logo Behance"></ImageComponent>
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/@raulgarcia.design?si=vtGtOh9aZKiw1Kkk"
                      target="_blank"
                      class="social--list--link"
                      aria-label="Canal de Youtube de Raúl García">
                      <ImageComponent file="icons/youtube.svg" altTitle="Logo youtube"></ImageComponent>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
    </main>
    <FooterComponent />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';
import OptimizedImageComponent from '@/components/OptimizedImageComponent.vue';
import { pages } from '@/views/data/pages';
import { useSeoMeta, getSchemaPersonProfile } from '@/composables/useSeoMeta';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ImageComponent,
    OptimizedImageComponent
  },
  setup() {
    useSeoMeta({
      title: pages.aboutMe.title,
      description: pages.aboutMe.description,
      schema: getSchemaPersonProfile()
    });
  }
}
</script>
<style lang="scss">
@import './../assets/styles/media-variables';

.about-me-detail-container {
  display: grid;
  grid-template-columns: .65fr 1fr;
  grid-gap: 2rem;
  .about-me-photo {
    width: 100%;
    height: auto;
    align-self: start;
  }
  @media (max-width: $media-mobile) {
    grid-template-columns: 1fr;
    
  }
  .social--list {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, 2rem);
    &--link {
      padding: .5rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background-color: var(--darkest-color);
      transition: background-color .4s ease-in-out;
      &:hover {
        background-color: var(--secondary-color);
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>