<template>
    <Navbar />
    <div class="main-container">
        <h1 class="portfolio-container__title section-title">Sobre mí</h1>
        <div class="about-me-detail-container">
          <Image file="aboutMe/developer.jpeg"/>
          <div>
            <p>¡Hola! Me llamo Raúl, aunque me puedes llamar simplemente <b>Ra</b>, y soy desarrollador Front-end. Desde que era pequeño, mostré interés por los ordenadores y lo que podían ofrecer. Empecé siendo autodidacta y aprendí lo justo de HTML, CSS y Javascript para hacer varias páginas webs con amigos y diversos proyectos personales sólo por diversión.</p>
            <p>En 2004 conseguí el título de Técnico Superior de Desarrollo de Aplicaciones Informáticas con una nota de Sobresaliente y pudiendo haber optado a una beca por mi examen en bases de datos relacionales. Pero mi camino se dirigía más al mundo front. </p>
            <p>En mi primera etapa laboral, trabajé principalmente para el sector bancario. En un principio usé HTML, CSS y Javascript combinado con una herramienta propia del banco. Aunque estaba focalizado 100% al front, aún realizaba pequeños programas para  back. Al cabo de muchos años, con la evolución de Javascript y el auge de los frameworks y librerías empecé a participar en proyectos con JQUERY, Ember, AngularJs, Angular, React, etc. Incluso en varios proyectos estuve como maquetador usando CSS3, SASS y LESS</p>
            <p>En mi etapa post-banco, opté por retarme a mí mismo trabajando en empresas con proyectos internacionales y en una startup. Esto me permitió, no sólo mejorar mi inglés, ya que he tenido que trabajar con gente de U.K., Estados Unidos, Suiza, Turquía, India, Portugal..., si no conocer otras formas de trabajar, otras culturas y otro tipo de organizaciones que me han enriquecido tanto personal como laboralmente.</p>
          </div>
        </div>
    </div>
    <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Image from '@/components/Image.vue';

export default {
  components: {
    Navbar,
    Footer,
    Image
  }
}
</script>
<style lang="scss">

</style>