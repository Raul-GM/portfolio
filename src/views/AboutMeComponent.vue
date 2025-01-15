<template>
    <NavbarComponent/>
    <main class="main-container">
        <section class="about-me-detail-container">
          <ImageComponent file="aboutMe/Bio 1.png" alt="Raúl García - Foto de perfil"/>
          <div>
            <p><b>¡Hola!</b> Soy Raúl García, estudiante de Grado de Diseño Digital en la Universidad Internacional de La Rioja (UNIR) y desarrollador front.</p>
            <p>Aunque mi carrera profesional comenzó como programador, siempre he tenido esa chispa artística y creativa latente. Trabajar en estrecha colaboración con grandes diseñadoras y diseñadores de UI/UX a lo largo de los años me inspiró a entender más profundamente las decisiones detrás de sus diseños. Cada vez que adquiría conocimientos desde sus perspectivas, mi curiosidad crecía y me sumergía en la exploración de este fascinante mundo del diseño.</p>
            <p>En 2020, en medio la turbulenta pandemia, tomé una decisión arriesgada: dar rienda suelta a mi pasión y apuntarme en el Grado de Diseño Digital. Desde entonces, he estado disfrutando cada momento como nunca antes. Cada día aprendo nuevas habilidades que no puedo evitar aplicarlas cada vez que surge una oportunidad.</p>
            <p>Por otro lado, decidí desempolvar también mis viejos lápices y empezar a dibujar de nuevo, una afición que había dejado a un lado desde la infancia. Aunque no es una habilidad fundamental para el diseño digital, descubrí que complementa maravillosamente mi enfoque creativo. Además, es una vía para liberar mi mente y encontrar un momento de relax.</p>
            <div class="social">
              <p>Si quieres contactar conmigo para realizarme algún encargo o propuesta, o si simplemente te apetece conversar o saber algo más 
                de mí, puedes enviarme un correo a <a class="simple_link" href="mailto:raulgm83.art@gmail.com">raulgm83.art@gmail.com</a>.</p>
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

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ImageComponent
  }
}
</script>
<style lang="scss">
@import './../assets/styles/media-variables';

.about-me-detail-container {
  display: grid;
  grid-template-columns: .65fr 1fr;
  grid-gap: 2rem;
  .image {
    width: 100%;
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