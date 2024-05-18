<template>
    <NavbarComponent />
    <div class="main-container">
      <h1 class="aboutme-container__title section-title">Tienda</h1>
      <div v-for="(shopItem) in shopData" :key="shopItem.id"
        class="shop-card">
        <div class="shop-card-image">
          <ImageComponent :file="`shop/${shopItem.imgName}_320.jpg`" altTitle="Ilustración de Harley Quinn" format="jpg"/>
        </div>
        {{ shopItem.name }}
        {{ shopItem.price }}
      </div>
    </div>
    <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';
import { shopData } from './data/shop';
export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ImageComponent
  }, data() {
    return {
      shopData
    }
  }
}
</script>
<style lang="scss">
</style>