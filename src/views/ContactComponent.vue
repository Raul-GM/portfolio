<template>
    <NavbarComponent />
    <main class="main-container">
      <div class="contact">
        <form action="https://formspree.io/f/xqaazjwd"
              @submit.prevent="onSubmit"
              class="form"
              aria-labelledby="contactForm">
          <h2 id="contactForm">Contáctame</h2>
          <div class="field-group">
            <label class="form--label" for="name">Nombre</label>
            <input
              v-model="name"
              type="text"
              name="name"
              id="name"
              required aria-required="true"
              class="form--field"
            />
          </div>
          <div class="field-group">
            <label class="form--label" for="email">Email</label>
            <input
              v-model="email.value"
              v-on:change="validate('email', email.value)"
              type="email"
              name="email"
              id="email"
              required aria-required="true"
              class="form--field"
              :class="{ email, error: !email.isValid }"
            />
          </div>
          <div class="error-message">
            <p v-show="!email.isValid">Ups! Este mail no es válido.</p>
          </div>
          <div class="field-group">
            <label class="form--label" for="textarea">Mensaje</label>
            <textarea
              class="form--field message"
              name="textarea"
              id="textarea"
              required aria-required="true"
              v-model="message.text"
              :maxlength="message.maxlength"
            ></textarea>
            <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
          </div>
          <div>
            <input type="submit" class="form--submit" value="Enviar mensaje" />
          </div>
        </form>
        <div class="social">
          <p>Si quieres contactar conmigo para realizarme algún encargo o propuesta, o si simplemente te apetece conversar o saber algo más 
            de mí, puedes escribirme un mensaje directo en <a class="simple_link" target="_blank" href="https://www.instagram.com/direct/t/104585227603393/">Instagram</a> o rellenando el formulario que se encuentra en esta misma página. Me pondré en contacto contigo lo antes posible.</p>
          <ul class="social--list">
            <li>
              <a href="https://www.instagram.com/raulgarcia.design/"
                target="_blank"
                class="social--list--link"
                aria-label="Visita mi Instagram">
                <ImageComponent file="icons/instagram.svg" altTitle="Logo Instagram"></ImageComponent>
              </a>
            </li>
            <li>
              <a href="https://www.behance.net/raulgm2/projects"
                target="_blank"
                class="social--list--link"
                aria-label="Visita mi página de Begance">
                <ImageComponent file="icons/behance.svg" altTitle="Logo Behance"></ImageComponent>
              </a>
            </li>
            <li>
              <a href="https://youtube.com/@raulgarcia.design?si=vtGtOh9aZKiw1Kkk"
                  target="_blank"
                  class="social--list--link"
                  aria-label="Visita mi canal de Youtube">
                  <ImageComponent file="icons/youtube.svg" altTitle="Logo youtube"></ImageComponent>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
    
    <FooterComponent />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ImageComponent
  }, data() {
    return {
      name: '',
      email: {
        value: '',
        isValid: true,
      },
      message: {
        text: '',
        maxlength: 255,
      },
    }
  },  methods: {
    async onSubmit() {
      const formData = {
        name: this.name,
        email: this.email.value,
        message: this.message.text,
      };

      try {
        const response = await fetch("https://formspree.io/f/xqaazjwd", {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          this.formStatus = 'Correo enviado correctamente.';
          this.formStatusClass = 'success';
          this.resetForm();
        } else {
          throw new Error('Error en el envío del correo.');
        }
      } catch (error) {
        this.formStatus = 'Hubo un problema al enviar el correo. Inténtalo de nuevo.';
        this.formStatusClass = 'error';
      }
    },
    resetForm() {
      this.name = '';
      this.email.value = '';
      this.message.text = '';
    },
    validate(type, value) {
      if(type === 'email') {
        this.email.isValid = this.isEmail(value);
      }
    },
    isEmail: value => {
      return emailRegExp.test(value);
    }
  },
}
</script>
<style lang="scss">
@import './../assets/styles/_media-variables.scss';

:root {
  --error-color: #e94b35;
}
.main-container {
  padding-top: 1rem;
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
.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @media (max-width: $media-mobile) {
    grid-template-columns: 1fr;
  }
}
.form {
  min-width: 30vw;
  max-width: 50vw;
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
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 5px rgba(44, 151, 222, 0.2);
    }
    &.message {
      min-height: 120px;
      resize: none;
      overflow: auto;
    }
    &.error {
      border-color: var(--error-color);
    }
  }
  &--submit {
    border: 1px solid var(--secondary-color);
    background-color: var(--primary-color);
    padding: 12px 20px;
    margin: .5rem 0 1rem;
    color: var(--lightest-color);
    font-weight: bold;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    appearance: none;
    transition: all .2s ease-in-out;
    
    @media (max-width: $media-mobile) {
      width: 100%;
    }
    &:hover,
    &:focus {
      border: 1px solid var(--primary-color);
      background-color: var(--secondary-color);
    }
    &:focus {
      outline: none;
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
  .counter {
    background-color: var(--light-color);
    border-radius: 5px;
    position: absolute;
    right: 2px;
    bottom: .7rem;
    font-size: 10px;
    padding: 4px;
  }
}
</style>