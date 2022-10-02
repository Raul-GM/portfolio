<template>
    <section class="main">
      <div class="main__background">
        <Image
          class="main__option__image"
          file="portfolio/Raul/DeveloperSideDefault.png"
          altTitle="Raúl Developer side por defecto"
        />
        <Image
          class="main__option__image"
          file="portfolio/Raul/DesignerSideDefault.png"
          altTitle="Raúl Designer side por defecto"
        />
      </div>
      
      <!--
        <div class="main__options">

      </div>
        <article class="main__option main__developer">
          <router-link to="/developer-side">
            <Image
              class="main__option__image"
              file="portfolio/Raul/DeveloperSideDefault.png"
              altTitle="Raúl Developer side por defecto"
            />
          </router-link>
        </article>
        <article class="main__option main__designer">
          <router-link to="/designer-side">
            <Image
              class="main__option__image"
              file="portfolio/Raul/DesignerSideDefault.png"
              altTitle="Raúl Designer side por defecto"
            />
          </router-link>
        </article>
      -->
      
    </section>
</template>

<script>
import Image from '@/components/Image.vue';

export default {
  name: 'Home',
  components: {
    Image
  }
}
</script>
<style lang="scss">
:root {
  --main-border: 3px solid black;
}
.main__designer {
  border-left: var(--main-border);
}
.main {
  height: 100%;
  width: 100%;
  background: pink;
  &__background {
    display: flex;
  }
}
</style>