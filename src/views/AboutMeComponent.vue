<template>
    <NavbarComponent sideType="designer"/>
    <div class="main-container">
        <div class="about-me-detail-container">
          <ImageComponent file="portfolio/Raul/Vectorizado-assets/Vectorizado.png"/>
          <div>
            <p><b>¡Hola!</b> Soy Raúl García. Soy desarrollador front y estudiante de un grado de Diseño Digital en la Universidad Internacional de La Rioja (UNIR).</p>
            <p>Aunque mi carrera profesional comenzó como programador, siempre he tenido esa chispa artística y creativa latente. Trabajar en estrecha colaboración con talentosos diseñadores de UI/UX a lo largo de los años me inspiró a entender más profundamente las decisiones detrás de sus diseños. Cada vez que adquiría conocimientos de sus perspectivas, mi curiosidad crecía y me sumergía en la exploración de este fascinante mundo del diseño.</p>
            <p>En el inusual año de 2020, en medio de la agitación de la pandemia, tomé una decisión arriesgada: dar rienda suelta a mi pasión y sumergirme en el Grado de Diseño Digital. Desde entonces, he estado disfrutando cada momento como nunca antes. Aprendo nuevas habilidades y no puedo evitar aplicarlas cada vez que surge una oportunidad.</p>
            <p>Por otro lado, decidí desempolvar también mis viejos lápices y empezar a dibujar de nuevo, una afición que había dejado a un lado desde la infancia. Aunque no es una habilidad fundamental para el diseño digital, descubrí que complementa maravillosamente mi enfoque creativo. Más que eso, es una vía para liberar mi mente y encontrar relajación en un mundo cada vez más vertiginoso.</p>
          </div>
        </div>
    </div>
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
}
</style>