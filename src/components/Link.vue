<template>
  <router-link
    :to="href"
    class="link"
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.link {
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--secondary-text-color);
  font-family: var(--font-text-bold);
  margin-top: 1rem;
  padding: 1rem 2rem;
}
</style>