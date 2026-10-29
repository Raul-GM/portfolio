<template>
    <NavbarComponent />
    <main class="main-container">
      <h1 class="section-title">Tienda de láminas</h1>
      <p class="shop-intro">Láminas impresas de mis ilustraciones. No hay carrito: elige la que te guste y escríbeme desde su ficha. Te confirmo disponibilidad, envío y plazo antes de que pagues nada.</p>
      <section class="shop-container" aria-label="Láminas disponibles">
        <article v-for="shopItem in shopData"
            :key="shopItem.id"
            class="shop-card">
          <router-link :to="getProductUrl(shopItem)" :aria-label="`Ver la lámina ${shopItem.name}`">
            <div class="shop-card-info">
              <div class="shop-card-info-image">
                <OptimizedImageComponent
                  :image="shopItem.image"
                  :altTitle="shopItem.alt"
                  :width="shopItem.width"
                  :height="shopItem.height"
                  sizes="320px" />
              </div>
              <div class="shop-card-info-data">
                <h2 class="shop-card-info-data-title">{{ shopItem.name }}</h2>
                <span class="shop-card-info-data-price">{{ formatPrice(shopItem.price) }}</span>
                <span v-if="!shopItem.available" class="shop-card-info-data-soldout">Agotada de momento</span>
              </div>
            </div>
          </router-link>
        </article>
      </section>
      <section class="shop-info" aria-label="Otras opciones">
        <p><b>¿Prefieres algo a medida?</b> Mira cómo <router-link class="simple_link" to="/encargos">encargar una ilustración</router-link>.</p>
      </section>
    </main>
    <FooterComponent />
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import OptimizedImageComponent from '@/components/OptimizedImageComponent.vue';
import { shopData, formatPrice, getProductUrl } from '@/views/data/shop';
import { pages } from '@/views/data/pages';
import { useSeoMeta } from '@/composables/useSeoMeta';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    OptimizedImageComponent
  },
  setup() {
    useSeoMeta({
      title: pages.shop.title,
      description: pages.shop.description
    });
  },
  data() {
    return {
      shopData
    }
  },
  methods: {
    formatPrice,
    getProductUrl
  }
}
</script>
<style lang="scss">
.shop-intro {
  max-width: 720px;
  padding-bottom: 1.5rem;
  line-height: 1.5;
}
.shop-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: 1rem;
  padding-bottom: 2rem;
}
.shop-card-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  &-image {
    width: min(320px, 100%);
    aspect-ratio: 1;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .3rem;
    &-title {
      font-family: var(--font-title);
      font-size: 1.4rem;
    }
    &-price {
      font-size: 1.1rem;
      font-family: var(--font-title);
    }
    &-soldout {
      font-size: .9rem;
      color: var(--primary-color);
    }
  }
}
</style>
