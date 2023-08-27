<template>
  <picture>
    <source :srcset="getLargeImage" media="(min-width: 1024px)" />
    <source :srcset="getMediumImage" media="(min-width: 640px)" />
    <img class="image" :src="getSmallImage" :alt="altTitle">
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
    }
  },
  computed: {
    getLargeImage() {
      return require(`../assets/images/${this.image}_1024.jpeg`)
    },
    getMediumImage() {
      return require(`../assets/images/${this.image}_640.jpeg`)
    },
    getSmallImage() {
      return require(`../assets/images/${this.image}_320.jpeg`)
    }
  }
  }
  </script>