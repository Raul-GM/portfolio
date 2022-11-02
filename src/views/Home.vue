<template>
    <section class="main">
      <div class="main__background">
        <router-link class="side left" to="/developer-side">
          <Image
            class="main__developer__title developer"
            file="portfolio/DeveloperSide.svg"
            altTitle="Developer Side"
          />
          <Image
            class="main__option__image"
            file="portfolio/Raul/DeveloperSideDefault.png"
            altTitle="Raúl Developer side por defecto"
          />
          <Image
            class="main__option__hover__image"
            file="portfolio/Raul/DeveloperSideHover.png"
            altTitle="Raúl Developer side por defecto"
          />
        </router-link>
        <router-link to="/designer-side" class="side right">
          <Image
            class="main__option__image"
            file="portfolio/Raul/DesignerSideDefault.png"
            altTitle="Raúl Designer side por defecto"
          />
          <Image
            class="main__developer__title designer"
            file="portfolio/DesignerSide.svg"
            altTitle="Designer Side"
          />
          <Image
            class="main__option__hover__image"
            file="portfolio/Raul/DesignerSideHover.png"
            altTitle="Raúl Designer side por defecto"
          />
        </router-link>
      </div>
      <!--
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
    -->
    <Image
            class="main__option__image"
            file="portfolio/Raul/DesignerSideHover.png"
            altTitle="Raúl Designer side por defecto"
          />
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
@import './../assets/styles/media-variables';
:root {
  --main-border: 3px solid black;
}
.main__designer {
  border-left: var(--main-border);
}
.main {
  height: 100vh;
  width: 100%;
  background: #591B50;
  overflow: hidden;
  &__background,
  &__options {
    height: 100%;
    display: grid;
    width: 100%;
    top: 0;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    @media (max-width: $media-mobile) {
      align-items: flex-start;
    }
    img {
      width: auto;
      height: 99vh;
      @media (max-width: $media-mid-screen) {
        height: 70vh;
      }
      @media (max-width: $media-mobile) {
        height: 50vh;
      }
      @media (max-width: $media-small-mobile) {
        height: 30vh;
      }
    }
  }
  .side {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    position: relative;
    &.left {
      justify-content: flex-end;
      .main__developer__title {
        margin-left: 2rem;
      }
      .main__option__hover__image {
        right: 0;
      }
    }
    &.right {
      .main__developer__title {
        margin-right: 2rem;
      }
      .main__option__hover__image {
        left: 0;
      }
    }
    &:hover {
      .main__option__hover__image {
        opacity: 1;
      }
    }
  }
  .main__option__hover__image {
    position: absolute;
    
    opacity: 0;
    transition: .5s opacity ease-in;
    @media (max-width: $media-mobile) {
      opacity: 1;
    }
  }
  &__options {
    img {
      opacity: 1;
      transition: .5s opacity ease-in;
      @media (max-width: $media-mobile) {
        opacity: 1;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  &__developer__title {
    max-width: 10vw;
  }
}
</style>