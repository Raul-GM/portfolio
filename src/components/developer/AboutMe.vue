<template>
  <div class="aboutme-container">
      <h1 class="aboutme-container__title section-title">Sobre mí</h1>
      <div class="aboutme-container__part image">
          IMAGEN
      </div>
      <div class="aboutme-container__part">
            <p>
                Me llamo Raúl García, residente en España, y soy Front-end developer desde el año 2004. Con más de 15 años de experiencia en empresas de diferentes sectores, he podido trabajar en diferentes ambientes con distintas herramientas.
            </p>
            <p>
                Me interesa acercarme a la experiencia de usuario, por lo que intento aprender todo lo que puedo de mis compañeros y compañeras diseñadores. Para ello procuro darle todo el mimo posible a la maquetación e intentar que la experiencia de usuario sea la mejor.
            </p>
            <Link
                class="aboutme-container__full"
                label="Más sobre mí"
                href="/developer-side/about-me"
            />
      </div>
  </div>
</template>

<script>
import Link from '@/components/Link.vue';

export default {
    components: {
        Link,
    }
}
</script>

<style lang="scss">
</style>