<template>
    <section class="main">
      <div class="main__background">
        <div>
          <Image
            class="main__option__image"
            file="portfolio/Raul/DeveloperSideDefault.png"
            altTitle="Raúl Developer side por defecto"
          />
        </div>
        <div>
          <Image
            class="main__option__image"
            file="portfolio/Raul/DesignerSideDefault.png"
            altTitle="Raúl Designer side por defecto"
          />
        </div>
      </div>
      <div class="main__options">
        <router-link to="/developer-side">
          <Image
            class="main__option__image"
            file="portfolio/Raul/DeveloperSideHover.png"
            altTitle="Raúl Developer side por defecto"
          />
        </router-link>
        <router-link to="/designer-side">
          <Image
            class="main__option__image"
            file="portfolio/Raul/DesignerSideHover.png"
            altTitle="Raúl Designer side por defecto"
          />
        </router-link>
      </div>
      
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
  height: 100vh;
  width: 100%;
  background: pink;
  overflow: hidden;
  &__background,
  &__options {
    height: 100%;
    display: grid;
    width: 100%;
    top: 0;
    position: absolute;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    div:first-child,
    a:first-child {
      justify-self: flex-end;
    }
    img {
      width: auto;
      height: 100vh;
    }
  }
  &__options {
    img {
      opacity: 0%;
      transition: .5s opacity ease-in;
      &:hover {
        opacity: 99.9%;
      }
    }
  }
}
</style>