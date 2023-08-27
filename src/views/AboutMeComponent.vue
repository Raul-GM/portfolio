<template>
    <NavbarComponent sideType="designer"/>
    <div class="main-container">
        <div class="about-me-detail-container">
          <ImageComponent file="aboutMe/RaulGarcia.png"/>
          <div>
            <p><b>¡Hola!</b>Soy Raúl García. Soy desarrollador front y estudiante de un grado de Diseño Digital en la Universidad Internacional de La Rioja (UNIR).</p>
            <p>Siempre he sentido interés por el diseño y el mundo más "artístico" pero nunca me había animado a estudiar nada al respecto ya que estaba trabajando como programador. Desde hace años, trabajo codo con codo con compañeros y compañeras de diseño (UI/UX designers) y siempre he intentado entender el porqué de sus decisiones. Cada vez que aprendía más de ellos, más investigaba por mi cuenta sobre el tema y más me interesaba este mundo.</p>
            <p>En 2020, en medio de la explosión de la pandemia decidí arriesgarme y empezar el Grado de Diseño Digital y así me encuentro actualmente, disfrutando como no había disfrutado en mucho tiempo. Aprendiendo muchas cosas y poniéndolas en práctica cada vez que puedo</p>
            <p>Por otro lado, decidí desempolvar también mis viejos lápices y empezar a dibujar de nuevo, ya que desde pequeño no lo había vuelto a hacer. Aunque no es imprescindible para el diseño, es una habilidad muy importante y que se complementa muy bien, a parte de ser una vía de escape; un momento de relax, de liberar mi mente.</p>
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

</style>