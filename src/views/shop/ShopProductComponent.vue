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
  @media (max-width: $media-mobile) {
    grid-template-columns: 1fr;
  }
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
</style>