<template>
    <NavbarComponent/>
    <main class="main-container">
      <article class="commissions">
        <h1 class="section-title">Encargos</h1>
        <p class="commissions__intro">Ilustro por encargo diferentes tipos de obras. Si tienes una idea, cuéntamela y vemos cómo hacerla.</p>

        <section class="commissions__section" aria-labelledby="commissions-what">
          <h2 id="commissions-what" class="section-title">¿Qué puedes encargarme?</h2>
          <ul class="commissions__types">
            <li>
              <h3>Fan art</h3>
              <p>Tu personaje favorito de una serie, película, libro o videojuego. Esa escena que te sabes de memoria.</p>
            </li>
            <li>
              <h3>Retratos</h3>
              <p>Un retrato ilustrado tuyo, de tu pareja, familia y amigos. Ah, aquí las mascotas también son bienvenidas.</p>
            </li>
            <li>
              <h3>Diseño</h3>
              <p>Marcapáginas, carteles para grupos de música y otras piezas gráficas: yo me encargo del concepto, la ilustración y la maquetación lista para imprimir.</p>
            </li>
          </ul>
        </section>

        <section class="commissions__section" aria-labelledby="commissions-how">
          <h2 id="commissions-how" class="section-title">¿Cómo trabajo?</h2>
          <ol class="commissions__steps">
            <li><b>Me cuentas tu idea:</b> qué quieres, para cuándo lo necesitas y, si es un retrato, las fotos de referencia que tengas. Ahí empezaremos a trabajar en equipo para definir entre los dos qué es lo que estás buscando.</li>
            <li><b>Presupuesto:</b> te paso el precio final y un plazo sin compromiso. Para empezar, se da una señal del 50 %.</li>
            <li><b>Ilustración a falta de revisiones:</b> te enseño una versión casi final del encargo y lo ajustamos juntos, con hasta dos rondas de cambios.</li>
            <li><b>Ilustración final:</b> te la entrego en digital en alta resolución y lista para imprimir o directamente impresa al tamaño que necesites y en papel de gran calidad y gramaje.</li>
          </ol>
        </section>

        <section class="commissions__section" aria-labelledby="commissions-time">
          <h2 id="commissions-time" class="section-title">Plazos y precio</h2>
          <p>El plazo dependerá de la complejidad del encargo y de la carga de trabajo de ese momento. Si necesitas que esté para una fecha específica, como un cumpleaños, aniversario o evento especial, dímelo desde el principio y vemos cómo lo podemos ajustar.</p>
          <p>Cada encargo es distinto: el precio depende del tamaño, número de personas o personajes, número de impresiones... Cuéntame tu idea y te paso presupuesto sin compromiso.</p>
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
  padding-bottom: 2rem;
  p,
  li {
    line-height: 1.5;
  }
  &__intro {
    font-size: 1.1rem;
    padding-bottom: 1.5rem;
    max-width: var(--prose-max);
  }
  &__section {
    padding-bottom: 1rem;
    > p,
    ol {
      max-width: var(--prose-max);
    }
    h2 {
      font-size: 1.4rem;
      padding-bottom: .75rem;
    }
  }
  &__types {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    @media (min-width: $media-mid-screen) {
      grid-template-columns: repeat(3, 1fr);
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
