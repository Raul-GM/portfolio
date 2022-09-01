<template>
  <div class="aboutme-container">
      <h1 class="aboutme-container__title section-title">Sobre mí</h1>
      <div class="aboutme-container__part">
          IMAGEN
      </div>
      <div class="aboutme-container__part">
            <p>
                ¡Hola! Soy Raúl García. Desarrollador front de profesión (puedes ver más en el Developer Side) y estudiante de un Grado de Diseño Digital por la Universidad Internacional de La Rioja (UNIR). 
            </p>
            <p>
                Compagino mis estudios con el trabajo y la familia, por lo que estoy cogiéndome unas pocas asignaturas cada año. Actualmente estoy cursando parte de segundo y hasta la fecha tengo una media de sobresaliente.
            </p>
            <Link
                class="aboutme-container__full"
                label="Más sobre mí"
                href="/designer-side/about-me"
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
.aboutme-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, min-content);
    align-items: center;
    justify-items: center;
    min-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 200px);
    padding: 0;
    &__title {
        grid-column: 1/3;
    }
    &__part {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
    }
}
</style>