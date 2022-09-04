<template>
    <Navbar />
    <div class="main-container">
      <h1 class="aboutme-container__title section-title">Contacto</h1>
      <div class="contact">
        <div class="social">
          <p>Puedes encontrarmeen las siguientes redes sociales </p>
          <ul class="social--list">
            <li>
              <a href="www.linkedin.com/in/raúl-garcia-martin-2106897b"
                target="_blank"
                class="social--list--link">
                <Image file="icons/linkedin2.svg" altTitle="Logo Linkedin"></Image>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/raugart/"
                target="_blank"
                class="social--list--link">
                <Image file="icons/instagram.svg" altTitle="Logo Instagram"></Image>
              </a>
            </li>
            <li>
              <a href="https://www.behance.net/raulgm2/projects"
                target="_blank"
                class="social--list--link">
                <Image file="icons/behance.svg" altTitle="Logo Behance"></Image>
              </a>
            </li>
            <li>
              <a href="https://github.com/Raul-GM"
                target="_blank"
                class="social--list--link">
                <Image file="icons/github.svg" altTitle="Logo Github"></Image>
              </a>
            </li>
            <li>
              <a href="https://codepen.io/your-work"
                target="_blank"
                class="social--list--link">
                <Image file="icons/codepen.svg" altTitle="Logo Codepen"></Image>
              </a>
            </li>
            
          </ul>
        </div>
        <form @submit.prevent="onSubmit" class="form">
          <div class="error-message">
            <p v-show="!email.isValid">Vaya! Este no es un email válido.</p>
          </div>
          <h3>Si quieres, envíame un mensaje</h3>
          <div class="field-group">
            <label class="form--label" for="name">Nombre</label>
            <input
              v-model="name"
              type="text"
              name="name"
              id="name"
              required=""
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
              required=""
              class="form--field"
              :class="{ email, error: !email.isValid }"
            />
          </div>
          <div class="field-group">
            <label class="form--label" for="textarea">Mensaje</label>
            <textarea
              class="form--field message"
              name="textarea"
              id="textarea"
              required=""
              v-model="message.text"
              :maxlength="message.maxlength"
            ></textarea>
            <span class="counter">{{ message.text.length}} / {{ message.maxlength }}</span>
          </div>
          <div>
            <input type="submit" class="form--submit" value="Enviar mensaje" />
          </div>
        </form>
      </div>
    </div>
    
    <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Image from '@/components/Image';
import emailjs from 'emailjs-com';
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export default {
  components: {
    Navbar,
    Footer,
    Image
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
    onSubmit(e) {
      emailjs.sendForm(
        'service_mhctxgf',
        'template_49wkdaf',
        e.target,
        'IEiGOBeWtpHqZKUoc',
        {
          name: this.name,
          email: this.email.value,
          message: this.message.text,
        }
      );

      this.resetForm();
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
.main-container {
  padding-top: 1rem;
}
.social--list {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, 2rem);
  &--link {
    border: 1px solid;
    padding: .5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: var(--main-color);
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
}
.form {
  min-width: 30vw;
  max-width: 50vw;
  h3,
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
    border: 1px solid var(--footer-background-color);
    border-radius: .25rem;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
    &:focus {
      outline: none;
      border-color: var(--alternative-color);
      box-shadow: 0 0 5px rgba(44, 151, 222, 0.2);
    }
    &.message {
      min-height: 120px;
      resize: none;
      overflow: auto;
    }
    &.error {
      border-color: #e94b35;
    }
  }
  &--submit {
    border: none;
    background: #2c3e50;
    border-radius: 0.25em;
    padding: 12px 20px;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    appearance: none;
    &:hover {
      background: #42a2e1;
    }
    &:focus {
      outline: none;
      background: #2b3e51;
    }
    &:active {
      transform: scale(0.97);
    }
  }
  .error-message {
    margin: 0;
    p {
      background: #e94b35;
      font-size: 1.4rem;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      border-radius: 0.25em;
      padding: 1rem;
    }
  }
  .counter {
    background-color: #ecf0f1;
    position: absolute;
    right: 2px;
    bottom: .7rem;
    font-size: 10px;
    padding: 4px;
  }
}
</style>