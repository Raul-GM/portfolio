<template>
  <NavbarComponent />
  <div class="main-container">
    
    <div class="shop-product-container">
      <div>
        <ImageComponent
          class="shop-product-container-image"
          :file="`shop/${shopItem.imgName}_640.jpg`"
          altTitle="Ilustración de Harley Quinn"
          format="jpg"/>
      </div>
      <div class="shop-product-container-info">
        <div class="shop-product-container-info-header">
          <h2>{{ shopItem.name }}</h2><span>-</span>
          <h4>{{ shopItem.price }}</h4>
        </div>
        <p v-if="shopItem.quantity > 1"><span>Quedan </span>{{ shopItem.quantity }} copias</p>
        <p v-if="shopItem.quantity === 1"><span>Queda </span>{{ shopItem.quantity }} copia</p>
        <p v-if="shopItem.quantity <= 0"><span>No existe stock de momento. Ponte en contacto conmigo si estás interesado y lo gestionamos.</span></p>
        <p>{{ shopItem.moreInfo }}</p>
        <div class="shop-product-container-info-disclaimer">
          Si quieres algún print, puedes contactar conmigo por mensaje directo en <a class="simple_link" target="_blank" href="https://www.instagram.com/direct/t/104585227603393/">Instagram</a> o por correo electrónico (<a class="simple_link" href="mailto:raulgm83.art@gmail.com">raulgm83.art@gmail.com</a>) indicando el nombre de la obra que quieres y la cantidad de prints y te informaré de todo el proceso. Asímismo, si tienes alguna duda, no dudes en contactar conmigo también y estaré encantado de responderte.
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>
<script>
import { useRoute } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';
import { shopData } from './../data/shop';

export default {
  setup() {
    const router = useRoute();
    const product = router.params.product;
    const shopItem = shopData.find(shopProduct => shopProduct.id === product);
    return {
      product,
      shopItem
    }
  },
  components: {
    NavbarComponent,
    FooterComponent,
    ImageComponent
  }, data() {
    return {
      shopData,
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
  }
}
</script>
<style lang="scss">
@import './../../assets/styles/_media-variables.scss';

.shop-product-container {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 2rem;
  &-image {
    width: 100%;
  }
  &-info {
    &-header {
      display: flex;
      align-items: baseline;
      gap: .3rem;
      font-weight: bold;
      padding-bottom: 1rem;
      font-family: var(--font-title);
    }
    &-disclaimer {
      border: 1px solid var(--primary-color);
      padding: 1rem;
      border-radius: 6px;
    }
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