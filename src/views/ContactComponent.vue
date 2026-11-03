<template>
    <NavbarComponent />
    <main class="main-container">
      <h1 id="contactForm" class="section-title">Contáctame</h1>
      <p class="contact__intro">Cuéntame qué quieres (un personaje, una escena, un retrato) y para cuándo lo necesitas. Te respondo lo antes posible con presupuesto y plazo, sin compromiso.</p>
      <div class="contact">
        <form action="https://formspree.io/f/xqaazjwd"
              @submit.prevent="onSubmit"
              novalidate
              class="form"
              aria-labelledby="contactForm">
          <div class="field-group">
            <label class="form--label" for="name">Nombre</label>
            <input
              v-model="name"
              v-on:input="errors.name = ''"
              ref="name"
              type="text"
              name="name"
              id="name"
              autocomplete="name"
              required aria-required="true"
              class="form--field"
              :class="{ error: errors.name }"
              :aria-invalid="errors.name ? 'true' : null"
              aria-describedby="name-error"
            />
          </div>
          <div class="error-message" id="name-error" role="alert">
            <p v-if="errors.name">{{ errors.name }}</p>
          </div>
          <div class="field-group">
            <label class="form--label" for="email">Email</label>
            <input
              v-model="email.value"
              v-on:change="validate('email', email.value)"
              v-on:input="errors.email = ''"
              ref="email"
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required aria-required="true"
              class="form--field"
              :class="{ error: errors.email }"
              :aria-invalid="errors.email ? 'true' : null"
              aria-describedby="email-error"
            />
          </div>
          <div class="error-message" id="email-error" role="alert">
            <p v-if="errors.email">{{ errors.email }}</p>
          </div>
          <div class="field-group">
            <label class="form--label" for="textarea">Mensaje</label>
            <textarea
              class="form--field message"
              name="textarea"
              id="textarea"
              required aria-required="true"
              v-model="message.text"
              v-on:input="errors.message = ''"
              ref="message"
              :maxlength="message.maxlength"
              :class="{ error: errors.message }"
              :aria-invalid="errors.message ? 'true' : null"
              :aria-describedby="errors.message ? 'message-error textarea-counter' : 'textarea-counter'"
            ></textarea>
            <span class="counter" id="textarea-counter">{{ message.text.length }} / {{ message.maxlength }}</span>
          </div>
          <div class="error-message" id="message-error" role="alert">
            <p v-if="errors.message">{{ errors.message }}</p>
          </div>
          <p class="form--privacy">Uso tu nombre, tu correo y tu mensaje solo para responderte. Responsable: Raúl García Martín. Más información en la <router-link class="simple_link" to="/privacidad">política de privacidad</router-link>.</p>
          <div>
            <input type="submit" class="button-primary form--submit" value="Enviar mensaje" :aria-disabled="status === 'sending' ? 'true' : null" />
          </div>
          <p class="form--status" :class="status" role="status">
            <template v-if="status === 'sending'">Enviando…</template>
            <template v-else-if="status === 'success'">¡Mensaje enviado! Te escribo en cuanto pueda. Mientras tanto, mira <router-link class="simple_link" to="/encargos">cómo trabajo los encargos</router-link>.</template>
            <template v-else-if="status === 'error'">No he podido enviar el mensaje. Inténtalo de nuevo o escríbeme por <a class="simple_link" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/raulgarcia.design/">Instagram (se abre en otra pestaña)</a>.</template>
          </p>
        </form>
        <aside class="social" aria-label="Otras formas de contactar">
          <h2 class="section-title contact__aside-title">Otras formas de contactar</h2>
          <p>Si prefieres, escríbeme a <a class="simple_link" href="mailto:raulgm83.art@gmail.com">raulgm83.art@gmail.com</a> o por mensaje directo en <a class="simple_link" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/raulgarcia.design/">Instagram</a>.</p>
          <p>Y si quieres saber cómo trabajo, mira la página de <router-link class="simple_link" to="/encargos">encargos</router-link>.</p>
          <ul class="social--list">
            <li>
              <a href="https://www.instagram.com/raulgarcia.design/"
                target="_blank"
                rel="noopener noreferrer"
                class="social--list--link"
                aria-label="Visita mi Instagram (se abre en otra pestaña)">
                <ImageComponent file="icons/instagram.svg" altTitle="Logo Instagram"></ImageComponent>
              </a>
            </li>
            <li>
              <a href="https://www.behance.net/raulgm2/projects"
                target="_blank"
                rel="noopener noreferrer"
                class="social--list--link"
                aria-label="Visita mi página de Behance (se abre en otra pestaña)">
                <ImageComponent file="icons/behance.svg" altTitle="Logo Behance"></ImageComponent>
              </a>
            </li>
            <li>
              <a href="https://youtube.com/@raulgarcia.design?si=vtGtOh9aZKiw1Kkk"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social--list--link"
                  aria-label="Visita mi canal de Youtube (se abre en otra pestaña)">
                  <ImageComponent file="icons/youtube.svg" altTitle="Logo youtube"></ImageComponent>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </main>
    
    <FooterComponent />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';
import { pages } from '@/views/data/pages';
import { findProduct, formatPrice } from '@/views/data/shop';
import { useSeoMeta } from '@/composables/useSeoMeta';
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ImageComponent
  },
  setup() {
    useSeoMeta({
      title: pages.contact.title,
      description: pages.contact.description
    });
  },
  data() {
    return {
      name: '',
      email: {
        value: ''
      },
      message: {
        text: '',
        maxlength: 1000,
      },
      errors: {
        name: '',
        email: '',
        message: ''
      },
      // '' | 'sending' | 'success' | 'error'
      status: ''
    }
  },
  created() {
    // Viene de la ficha de una lámina (/contact?lamina=<id>): deja el mensaje empezado
    const product = findProduct(this.$route.query.lamina);
    if (product) {
      this.message.text = `Hola, me interesa la lámina «${product.name}» (${formatPrice(product.price)}). ¿Sigue disponible?`;
    }
  },
  methods: {
    async onSubmit() {
      if (this.status === 'sending') return;
      if (!this.validateForm()) return;
      this.status = 'sending';
      const formData = {
        name: this.name,
        email: this.email.value,
        message: this.message.text,
      };

      try {
        const response = await fetch("https://formspree.io/f/xqaazjwd", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          this.status = 'success';
          this.resetForm();
        } else {
          throw new Error('Error en el envío del correo.');
        }
      } catch {
        this.status = 'error';
      }
    },
    // Marca los campos con error y lleva el foco al primero para que se anuncie el motivo
    validateForm() {
      this.errors.name = this.name.trim() ? '' : 'Escribe tu nombre.';
      this.validate('email', this.email.value);
      this.errors.message = this.message.text.trim() ? '' : 'Escribe tu mensaje.';
      const firstInvalid = ['name', 'email', 'message'].find(field => this.errors[field]);
      if (firstInvalid) this.$refs[firstInvalid].focus();
      return !firstInvalid;
    },
    resetForm() {
      this.name = '';
      this.email.value = '';
      this.message.text = '';
    },
    validate(type, value) {
      if (type === 'email') {
        if (!value.trim()) this.errors.email = 'Escribe tu correo para poder responderte.';
        else this.errors.email = this.isEmail(value) ? '' : 'Escribe un correo válido, por ejemplo nombre@correo.com.';
      }
    },
    isEmail: value => {
      return emailRegExp.test(value);
    }
  },
}
</script>
<style lang="scss">
@use '@/assets/styles/media-variables' as *;

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
.contact__intro {
  max-width: var(--prose-max);
  font-size: var(--text-lead);
  line-height: 1.5;
  padding-bottom: 1.5rem;
}
.contact__aside-title {
  font-size: var(--heading-section);
}
.contact {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  grid-gap: 3rem;
  @media (max-width: $media-mobile) {
    grid-template-columns: 1fr;
  }
}
.form {
  min-width: 30vw;
  max-width: var(--prose-max);
  @media (max-width: $media-mobile) {
    max-width: unset;
  }
  .field-group:first-child {
    padding-top: 0;
  }
  &--label {
    margin-bottom: .5rem;
    display: block
  }
  div {
    position: relative;
    &.field-group {
      padding: .5rem 0;
    }
  }
  &--field {
    display: block;
    width: 100%;
    appearance: none;
    padding: .5rem;
    border: 1px solid var(--darkest-color);
    border-radius: .25rem;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 5px rgba(44, 151, 222, 0.2);
    }
    &.message {
      min-height: 120px;
      // Hueco para el contador, que va sobre el borde inferior
      padding-bottom: 2.25rem;
      resize: none;
      overflow: auto;
    }
    &.error {
      border-color: var(--error-color);
      box-shadow: 0 0 0 1px var(--error-color);
    }
  }
  // El aspecto lo da .button-primary; aquí solo lo propio del <input>
  &--submit {
    border: 0;
    margin: .5rem 0 1rem;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    appearance: none;
    @media (max-width: $media-mobile) {
      width: 100%;
    }
    &[aria-disabled='true'] {
      cursor: wait;
      opacity: .7;
    }
    &:active {
      transform: scale(0.97);
    }
  }
  .error-message {
    margin: 0;
    p {
      background: var(--error-color);
      color: var(--lightest-color);
      font-size: 1rem;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      border-radius: 0.25em;
      padding: .5rem;
    }
  }
  &--privacy {
    font-size: var(--text-sm);
    line-height: 1.4;
    padding-bottom: .75rem;
  }
  &--status {
    padding-bottom: 0;
    line-height: 1.4;
    &.success {
      color: var(--primary-color);
      font-weight: bold;
    }
    &.error {
      color: var(--error-color);
      font-weight: bold;
    }
  }
  .counter {
    background-color: var(--light-color);
    border-radius: 5px;
    position: absolute;
    right: 2px;
    bottom: .7rem;
    font-size: var(--text-sm);
    padding: 4px;
  }
}
</style>