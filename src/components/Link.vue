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

<style lang="scss">
.link {
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--secondary-text-color);
  font-family: var(--font-text-bold);
  margin-top: 1rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  box-shadow: 0 0 7px 0 var(--secondary-color);
  transition: box-shadow .4s ease-in-out;
  &:hover {
    box-shadow: 0 0 8px 3px var(--secondary-color);
  }
}
</style>