<template>
    <img
        class="image"
        :src="getImageSource"
        :alt="altTitle"
        @error="handleError"
        loading="lazy" />
</template>
<script>
import { fallbackImage, getImageUrl } from '@/utils/getImageUrl'

export default {
  props: {
    file: {
      type: String,
      default: ''
    },
    altTitle: {
      type: String,
      default: 'Imagen'
    },
    fallbackSrc: {
      type: String,
      default: fallbackImage
    }
  },
  computed: {
    getImageSource() {
      return getImageUrl(this.file)
    }
  },
  methods: {
    handleError(event) {
      event.target.src = this.fallbackSrc;
    }
  }
}
</script>
