<template>
    <img
        class="image"
        :src="getImageSource"
        :alt="altTitle"
        @error="handleError"
        loading="lazy" />
</template>
<script>
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
      default: require('../assets/images/fallback.png') // Reemplaza con una ruta válida
    }
  },
  computed: {
    getImageSource() {
      return require(`../assets/images/${this.file}`)
    }
  },
  methods: {
    handleError(event) {
      event.target.src = this.fallbackSrc;
    }
  }
}
</script>
