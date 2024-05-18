<template>
  <NavbarComponent />
  <div class="main-container">
    SHOP PRODUCT COMPONENT
  </div>
  <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { shopData } from './../data/shop';
export default {
  components: {
    NavbarComponent,
    FooterComponent
  }, data() {
    return {
      shopData
    }
  }
}
</script>