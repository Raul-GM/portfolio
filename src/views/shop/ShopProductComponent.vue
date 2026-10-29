<template>
  <NavbarComponent />
  <main class="main-container">
    <article class="shop-product" :aria-labelledby="`product-title-${shopItem.id}`">
      <OptimizedImageComponent
        class="shop-product__image"
        :image="shopItem.image"
        :altTitle="shopItem.alt"
        :width="shopItem.width"
        :height="shopItem.height"
        sizes="(min-width: 750px) 50vw, 100vw"
        eager />
      <div class="shop-product__info">
        <header class="shop-product__header">
          <h1 :id="`product-title-${shopItem.id}`">{{ shopItem.name }}</h1>
          <p class="shop-product__price">{{ formatPrice(shopItem.price) }}</p>
        </header>
        <p>{{ shopItem.available ? 'Disponible.' : 'Agotada de momento.' }} {{ shopItem.description }}</p>
        <p class="shop-product__mockup">La foto es un mockup para que veas cómo quedaría enmarcada. El marco no está incluido.</p>
        <p v-if="work">Es una obra de mi portfolio: <router-link class="simple_link" :to="`/portfolio/${work.slug}`">ver «{{ work.title }}»</router-link>.</p>
        <section class="shop-product__buy" aria-label="Cómo comprarla">
          <p v-if="shopItem.available">No hay carrito ni pago en la web. Escríbeme y te confirmo disponibilidad, gastos de envío y plazo de entrega antes de que pagues nada.</p>
          <p v-else>Ahora mismo no tengo copias. Escríbeme si te interesa y vemos cómo conseguirla.</p>
          <router-link class="button-primary" :to="{ path: '/contact', query: { lamina: shopItem.id } }">
            {{ shopItem.available ? 'Quiero esta lámina' : 'Preguntar por esta lámina' }}
          </router-link>
        </section>
      </div>
    </article>
    <p class="shop-product__back"><router-link class="simple_link" to="/shop"><span aria-hidden="true">←</span> Volver a la tienda</router-link></p>
  </main>
  <FooterComponent />
</template>
<script>
import { useRoute } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import OptimizedImageComponent from '@/components/OptimizedImageComponent.vue';
import { findProduct, formatPrice, getProductOgImage, getProductUrl } from '@/views/data/shop';
import { findWork } from '@/views/data/works';
import { useSeoMeta, getSchemaProduct } from '@/composables/useSeoMeta';

const SITE_URL = 'https://raulgarcia.me';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    OptimizedImageComponent
  },
  setup() {
    // El router solo entra aquí con una lámina existente (ver beforeEnter)
    const shopItem = findProduct(useRoute().params.product);
    const url = `${SITE_URL}${getProductUrl(shopItem)}`;
    // Mismos textos y schema que scripts/prerender-meta.js
    useSeoMeta({
      title: `${shopItem.name}, lámina ilustrada | Raúl García`,
      description: `${shopItem.description} Escríbeme para comprarla.`,
      ogImage: getProductOgImage(shopItem),
      ogUrl: url,
      schema: getSchemaProduct({
        name: `Lámina «${shopItem.name}»`,
        description: shopItem.description,
        image: `${SITE_URL}/${getProductOgImage(shopItem)}`,
        price: shopItem.price,
        available: shopItem.available,
        url
      })
    });
    return {
      shopItem
    }
  },
  computed: {
    work() {
      return this.shopItem.workSlug ? findWork(this.shopItem.workSlug) : null;
    }
  },
  methods: {
    formatPrice
  }
}
</script>
<style lang="scss">
@use '@/assets/styles/media-variables' as *;

.shop-product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding-bottom: 1rem;
  @media (max-width: $media-mobile) {
    grid-template-columns: 1fr;
  }
  p {
    line-height: 1.5;
    padding-bottom: 1rem;
  }
  &__image {
    width: 100%;
    height: auto;
  }
  &__header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: .75rem;
    padding-bottom: 1rem;
    font-family: var(--font-title);
    h1 {
      font-size: 1.6rem;
    }
  }
  &__price {
    font-size: 1.2rem;
    font-weight: bold;
    padding-bottom: 0;
  }
  &__mockup {
    font-size: .9rem;
    color: var(--primary-color);
  }
  &__buy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid var(--primary-color);
    padding: 1rem;
    border-radius: 6px;
  }
  &__back {
    padding-bottom: 2rem;
  }
}
</style>
