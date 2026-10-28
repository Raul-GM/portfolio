<template>
  <img
    class="image"
    :src="getImage(640)"
    :srcset="srcset"
    :sizes="sizes"
    :width="width"
    :height="height"
    :alt="altTitle"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : null"
    @error="handleError">
</template>

<script>
import { IMAGE_WIDTHS } from '@/views/data/imageWidths';

export default {
  props: {
    image: {
      type: String
    },
    altTitle: {
      type: String,
      default: 'Image'
    },
    format: {
      type: String,
      default: 'jpeg'
    },
    // Dimensiones intrínsecas de la variante mayor: reservan el hueco y evitan saltos de layout
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    sizes: {
      type: String,
      default: '100vw'
    },
    // true solo para la imagen principal visible al cargar (LCP)
    eager: {
      type: Boolean,
      default: false
    },
    fallbackImage: {
      type: String,
      default: require('@/assets/images/fallback.png')
    }
  },
  computed: {
    srcset() {
      return IMAGE_WIDTHS.map(width => `${this.getImage(width)} ${width}w`).join(', ');
    }
  },
  methods: {
    getImage(width) {
      return require(`@/assets/images/${this.image}_${width}.${this.format}`);
    },
    handleError(event) {
      event.target.srcset = '';
      event.target.src = this.fallbackImage;
    }
  }
}
</script>
