<template>
    <NavbarComponent />
    <main class="main-container">
      <article class="privacy">
        <h1 class="section-title">Política de privacidad</h1>
        <p class="privacy__intro">Esta página explica qué hago con los datos que me envías a través del formulario de <router-link class="simple_link" to="/contact">contacto</router-link>. Última actualización: 29 de octubre de 2026.</p>

        <section aria-labelledby="privacy-controller">
          <h2 id="privacy-controller" class="section-title">Quién es el responsable</h2>
          <p>Raúl García Martín. Para cualquier cuestión sobre tus datos puedes escribirme a <a class="simple_link" href="mailto:raulgm83.art@gmail.com">raulgm83.art@gmail.com</a>.</p>
        </section>

        <section aria-labelledby="privacy-data">
          <h2 id="privacy-data" class="section-title">Qué datos recojo y para qué</h2>
          <p>Tu nombre, tu correo electrónico y el mensaje que escribas. Los uso para responder a tu consulta y, si me lo pides, para prepararte un presupuesto o una propuesta de encargo o de lámina.</p>
          <p>No los uso para publicidad ni para enviarte boletines, y no tomo decisiones automatizadas con ellos.</p>
        </section>

        <section aria-labelledby="privacy-legal">
          <h2 id="privacy-legal" class="section-title">Por qué puedo usarlos</h2>
          <p>Porque tú me los envías y consientes su uso al enviar el formulario (art. 6.1.a del RGPD). Si me pides un presupuesto, también porque lo necesito para atender tu petición (art. 6.1.b). Puedes retirar tu consentimiento cuando quieras escribiéndome; no afectará a lo que ya hubiera hecho con tus datos hasta entonces.</p>
        </section>

        <section aria-labelledby="privacy-recipients">
          <h2 id="privacy-recipients" class="section-title">Quién más accede a ellos</h2>
          <ul class="privacy__list">
            <li><b>Formspree, Inc.</b> (EE. UU.): es el servicio que recibe el formulario y me lo reenvía. Actúa como encargado del tratamiento. Al estar fuera de la UE, la transferencia se apoya en las garantías que el RGPD prevé para estos casos, y puede tratar además datos técnicos asociados al envío.</li>
            <li><b>Mi proveedor de correo</b> (Gmail, de Google): es donde recibo tus mensajes y mis respuestas.</li>
          </ul>
          <p>No cedo tus datos a nadie más, salvo que una ley me obligue.</p>
        </section>

        <section aria-labelledby="privacy-time">
          <h2 id="privacy-time" class="section-title">Cuánto tiempo los guardo</h2>
          <p>Mientras dure la conversación. Si no llega a haber encargo ni compra, borro tu mensaje un año después de la última comunicación. Si lo hay, conservo los datos necesarios durante el tiempo que exijan las obligaciones legales, como las fiscales.</p>
        </section>

        <section aria-labelledby="privacy-rights">
          <h2 id="privacy-rights" class="section-title">Tus derechos</h2>
          <p>Puedes pedirme acceso a tus datos, que los corrija o los borre, limitar su uso, oponerte a él o recibirlos en un formato que puedas llevarte (portabilidad). Escríbeme a <a class="simple_link" href="mailto:raulgm83.art@gmail.com">raulgm83.art@gmail.com</a> y te respondo lo antes posible.</p>
          <p>Si crees que no he tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (<a class="simple_link" href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">aepd.es</a>).</p>
        </section>

        <section aria-labelledby="privacy-cookies">
          <h2 id="privacy-cookies" class="section-title">Cookies y analítica</h2>
          <p>Esta web no usa cookies ni herramientas de analítica.</p>
        </section>
      </article>
    </main>
    <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { pages } from '@/views/data/pages';
import { useSeoMeta } from '@/composables/useSeoMeta';

export default {
  components: {
    NavbarComponent,
    FooterComponent
  },
  setup() {
    useSeoMeta({
      title: pages.privacy.title,
      description: pages.privacy.description,
      noindex: pages.privacy.noindex
    });
  }
}
</script>
<style lang="scss">
.privacy {
  max-width: 720px;
  padding-bottom: 2rem;
  p,
  li {
    line-height: 1.5;
    padding-bottom: .75rem;
  }
  &__intro {
    font-size: 1.1rem;
    padding-bottom: 1.5rem;
  }
  section {
    padding-bottom: .5rem;
    h2 {
      font-size: 1.3rem;
      padding-bottom: .5rem;
    }
  }
  &__list {
    list-style: disc;
    padding-left: 1.5rem;
  }
}
</style>
