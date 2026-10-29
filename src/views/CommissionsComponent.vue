<template>
    <NavbarComponent/>
    <main class="main-container">
      <article class="commissions">
        <h1 class="section-title">Encargos</h1>
        <p class="commissions__intro">Ilustro por encargo dos tipos de piezas. Si tienes una idea, cuéntamela y vemos cómo hacerla.</p>

        <section class="commissions__section" aria-labelledby="commissions-what">
          <h2 id="commissions-what" class="section-title">Qué puedes encargarme</h2>
          <ul class="commissions__types">
            <li>
              <h3>Fan art</h3>
              <p>Tu personaje favorito de una serie, una película o un videojuego, o esa escena que te sabes de memoria.</p>
            </li>
            <li>
              <h3>Retratos</h3>
              <p>Un retrato ilustrado tuyo, de tu pareja, de tu familia o de alguien a quien quieras regalárselo, a partir de fotos.</p>
            </li>
          </ul>
        </section>

        <section class="commissions__section" aria-labelledby="commissions-how">
          <h2 id="commissions-how" class="section-title">Cómo trabajo</h2>
          <ol class="commissions__steps">
            <li><b>Me cuentas tu idea:</b> qué quieres, para cuándo lo necesitas y, si es un retrato, las fotos de referencia que tengas.</li>
            <li><b>Presupuesto:</b> te paso precio y plazo sin compromiso. Para empezar, una señal del 50 %.</li>
            <li><b>Boceto:</b> te enseño un boceto y lo ajustamos juntos, con hasta dos rondas de cambios.</li>
            <li><b>Ilustración final:</b> te la entrego en digital, en alta resolución y lista para imprimir.</li>
          </ol>
        </section>

        <section class="commissions__section" aria-labelledby="commissions-time">
          <h2 id="commissions-time" class="section-title">Plazos y precio</h2>
          <p>Suelo tardar entre 2 y 4 semanas desde que apruebas el boceto, según los encargos que tenga en cola. Si es para una fecha concreta, como un cumpleaños o un aniversario, dímelo desde el principio.</p>
          <p>Cada encargo es distinto: el precio depende del tamaño, del número de personas o personajes y del detalle del fondo. Cuéntame tu idea y te paso presupuesto sin compromiso.</p>
        </section>

        <router-link class="button-primary" to="/contact">Cuéntame tu idea</router-link>
      </article>
    </main>
    <FooterComponent />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { pages } from '@/views/data/pages';
import { useSeoMeta, getSchemaPersonProfile } from '@/composables/useSeoMeta';

export default {
  components: {
    NavbarComponent,
    FooterComponent
  },
  setup() {
    useSeoMeta({
      title: pages.commissions.title,
      description: pages.commissions.description,
      schema: getSchemaPersonProfile()
    });
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/media-variables' as *;

.commissions {
  max-width: 720px;
  padding-bottom: 2rem;
  p,
  li {
    line-height: 1.5;
  }
  &__intro {
    font-size: 1.1rem;
    padding-bottom: 1.5rem;
  }
  &__section {
    padding-bottom: 1rem;
    h2 {
      font-size: 1.4rem;
      padding-bottom: .75rem;
    }
  }
  &__types {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    @media (max-width: $media-mobile) {
      grid-template-columns: 1fr;
    }
    h3 {
      font-size: 1.1rem;
      padding-bottom: .25rem;
    }
  }
  &__steps {
    list-style: decimal;
    padding: 0 0 1rem 1.5rem;
    li {
      padding-bottom: .5rem;
    }
  }
}
</style>
