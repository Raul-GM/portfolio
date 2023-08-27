<template>
    <img
        class="image"
        :src="getImageSource"
        :alt="altTitle" />
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
    }
  },
  computed: {
    getImageSource() {
      return require(`../assets/images/${this.file}`)
    }
  }
}
</script>
