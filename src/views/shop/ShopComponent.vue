<template>
    <NavbarComponent />
    <main class="main-container">
      <section class="shop-container" role="region" aria-label="Galería de productos">
        <article v-for="(shopItem) in shopData"
            :key="shopItem.id"
            role="article" 
            aria-label="Detalles del producto"
            class="shop-card">
          <router-link :to="`/shop/${shopItem.id}`" aria-label="Ver más sobre {{ shopItem.name }}">
            <div class="shop-card-info">
              <div class="shop-card-info-image">
                <ImageComponent :file="`shop/${shopItem.imgName}_320.jpg`" :altTitle="shopItem.altImage" format="jpg"/>
              </div>
              <div class="shop-card-info-data">
                <h3 class="shop-card-info-data-title">{{ shopItem.name }}</h3>
                <span class="shop-card-info-data-price">{{ shopItem.price }}</span>
              </div>
            </div>
          </router-link>
        </article>
      </section>
      <section class="shop-info" aria-label="Información adicional sobre el proceso de compra">
        <p><b>¿Te gusta lo que ves?</b> Aquí te muestro algunas de mis obras disponibles para llevarte a casa hoy mismo. Si por el contrario estás interesado o interesada en otras de mis obras, coméntamelo y lo arreglamos. Pero esto no es todo...</p>
        <p><b>¿Sueñas con algo más especial?</b> ¡No hay problema! También puedo crear obras personalizadas a tu gusto. Contacta conmigo y hablemos de tus ideas.</p>
    
      </section>
    </main>
    <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';
import { shopData } from './../data/shop';
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
.shop-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
  padding-bottom: 2rem;;
}
.shop-card-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  &-image {
    width: 320px;
    height: 320px;
    overflow: hidden;
  }
  &-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .3rem;
    &-title {
      font-family: var(--font-title);
    }
    &-price {
      font-size: 1.1rem;
      font-family: var(--font-title);
    }
  }
}
</style>