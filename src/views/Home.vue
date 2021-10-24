<template>
      <h1 class="title">HELLO WORLD</h1>
    <section class="main">
      <article class="main__option main__developer">
        <router-link to="/developer-side">
          <h1>Developer Side</h1>
        </router-link>
      </article>
      <article class="main__option main__designer">
        <router-link to="/designer-side">
          <h1>Designer Side</h1>
        </router-link>
      </article>
    </section>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>
<style lang="scss">
:root {
  --main-border: 3px solid black;
}
.title {
  position: absolute;
}
.main {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.main__option {
  flex: 1;
}
.main__option a{
  display: block;
  height: 100%;
}
.main__developer {
  border-right: var(--main-border);
}
.main__designer {
  border-left: var(--main-border);
}
</style>