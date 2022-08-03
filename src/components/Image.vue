<template>
    <img
        class="image"
        :src="getImageSource" />
</template>
<script>
export default {
    props: {
        file: {
            type: String,
            default: ''
        }
    },
    computed: {
        getImageSource() {
            return require(`../assets/images/${this.file}`)
        }
    }
}
</script>
