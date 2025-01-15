<template>
  <picture>
    <source :srcset="getLargeImage" media="(min-width: 1024px)" />
    <source :srcset="getMediumImage" media="(min-width: 640px)" />
    <img class="image" :src="getSmallImage" :alt="altTitle" loading="lazy" @error="handleError">
  </picture>
</template>
  
<script>
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
    fallbackImage: {
      type: String,
      default: require('../assets/images/fallback.png')
    }
  },
  computed: {
    getLargeImage() {
      return require(`../assets/images/${this.image}_1280.${this.format}`)
    },
    getMediumImage() {
      return require(`../assets/images/${this.image}_640.${this.format}`)
    },
    getSmallImage() {
      return require(`../assets/images/${this.image}_320.${this.format}`)
    }
  },
    methods: {
    handleError(event) {
      event.target.src = this.fallbackImage;
    }
  }
}
  </script>