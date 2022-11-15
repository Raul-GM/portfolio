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
      <Image
        class="main__logo"
        file="portfolio/Ra.png"
        altTitle="Ra logo"
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
  background-color: var(--primary-color);
  overflow: hidden;
  &__background,
  &__options {
    height: 100%;
    display: grid;
    width: 100%;
    top: 0;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-content: center;
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
        height: 50vh;
      }
    }
  }
  .side {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    position: relative;
    @media (max-width: $media-small-mobile) {
      grid-template-columns: 1fr;
      height: 50vh;
      .main__option__image {
        display: none;
      }
    }
    &.left {
      justify-content: flex-end;
      .main__developer__title {
        margin-left: 2rem;
        @media (max-width: $media-small-mobile) {
          display: none;
        }
      }
      .main__option__hover__image {
        right: 0;
      }
    }
    &.right {
      .main__developer__title {
        margin-right: 2rem;
        @media (max-width: $media-small-mobile) {
          display: none;
        }
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
  &__logo {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    margin: auto;
    height: 180px;
    pointer-events: none;
    @media (max-width: $media-mid-screen) {
      height: 120px;
      bottom: 15vh;
    }
    @media (max-width: $media-mobile) {
      bottom: 20vh;
      height: 100px;
    }
  }
}
</style>