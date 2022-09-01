<template>
    <Navbar />
    <form @submit.prevent="onSubmit" class="main-container">
      <div class="error-message">
        <p v-show="!email.isValid">Vaya! Este no es un email válido.</p>
      </div>
      <fieldset>
        <legend>Si quieres, envíame un mensaje</legend>
        <div>
          <label class="label" for="name">Nombre</label>
          <input v-model="name" type="text" name="name" id="name" required="" />
        </div>
        <div>
          <label class="label" for="email">Email</label>
          <input
            v-model="email.value"
            v-on:change="validate('email', email.value)"
            type="email"
            name="email"
            id="email"
            required=""
            :class="{ email, error: !email.error }"
          />
        </div>
        <div>
          <label class="label" for="textarea">Mensaje</label>
          <textarea
            class="message"
            name="textarea"
            id="textarea"
            required=""
            v-model="message.text"
            :maxlength="message.maxlength"
          ></textarea>
          <span class="counter">{{ message.length}} / {{ message.maxlength }}</span>
        </div>
        <div>
          <input type="submit" value="Enviar mensaje" />
        </div>
      </fieldset>
    </form>
    <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export default {
  components: {
    Navbar,
    Footer
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
    onSubmit: () => {
      
    },
    validate(type, value) {
      if(type === 'email') {
        console.log('>>>>>', this)
        this.email.valid = this.isEmail(value);
      }
    },
    isEmail: value => {
      return emailRegExp.test(value);
    }
  },
}
</script>
<style lang="scss">

</style>