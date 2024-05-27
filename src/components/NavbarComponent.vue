<template>
  <header class="mobile-header">
    <router-link to="/" class="simple_link menu--ra--link--mobile">
      <ImageComponent
        class="menu--ra--icon--mobile"
        file="RaulGarciaRowLogo.png"
        altTitle="Ra icon"
        v-if="!isOpened">
      </ImageComponent>
    </router-link>
    <span class="menu--icon" v-on:click="onMenuIconClick">
      <ImageComponent
        class="menu--icon--image"
        file="icons/menu.svg"
        altTitle="Menu icon"
        v-if="!isOpened">
      </ImageComponent>
      <ImageComponent
        class="menu--icon--image"
        file="icons/cross.svg"
        altTitle="Close cross icon"
        v-if="isOpened">
      </ImageComponent>
    </span>
  </header>
  <nav class="nav" :class="{ 'nav--mobile': isMobile(), opened: isOpened }">
    <div class="nav--container">
      <span class="nav--home">
        <router-link to="/" class="simple_link nav--side">
          <ImageComponent
            class="menu--ra--icon"
            file="RaulGarciaRowLogo.png"
            altTitle="Ra icon"
            v-if="!isOpened">
          </ImageComponent>
        </router-link>
      </span>
      <ul class="nav__menu">
        <li class="nav__menu__option" :class="{ 'option-active': isPortfolioRoute }">
          <router-link :to="'/'">Portfolio</router-link>
        </li>
        <li class="nav__menu__option">
          <router-link :to="'/about-me'">
            <span>Sobre mí</span>
          </router-link>
        </li>
        <li class="nav__menu__option" :class="{ 'option-active': isShopActive }">
          <router-link :to="'/shop'">
            <span>Tienda</span>
          </router-link>
        </li>
        <li class="nav__menu__option">
          <router-link :to="'/contact'">Contacto</router-link>
        </li>
      </ul>
    </div>
  </nav>
  
</template>

<script>
import ImageComponent from '@/components/ImageComponent';

export default {
  components: { ImageComponent },
  props: {
    sideType: {
      type: String,
      default: 'developer',
    }
  },
  data() {
    return {
      isOpened: false
    }
  },
  methods: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    onMenuIconClick() {
      this.isOpened = !this.isOpened;
    }
  },
  computed: {
    isPortfolioRoute() {
      return this.$route.path.includes('portfolio');
    },
    isShopActive() {
      return this.$route.path.includes('shop');
    }
  }
}
</script>

<style lang="scss">
@import './../assets/styles/media-variables';

:root {
  --nav-border-color: var(--dark-color);
}
.mobile-header {
  display: none;
  @media (max-width: $media-mobile) {
    display: flex;
    height: var(--navbar-height);
    width: 100%;
    position: relative;
    border-bottom: 1px solid var(--dark-color);
    margin-bottom: 1rem;
    justify-content: center;
    align-items: center;
  }
  .menu--ra--icon--mobile,
  .menu--ra--link--mobile {
    height: calc(var(--navbar-height) - 30px);
  }
}

.nav {
  background-color: var(--lightest-color);
  color: var(--dark-color);
  border-bottom: 1px solid var(--nav-border-color);
  font-size: 1rem;
  height: var(--navbar-height);
  position: sticky;
  top: 0;
  z-index: 10;
  &--container {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1fr auto;
      grid-auto-flow: dense;
      height: 100%;
      left: 0;
      right: 0;
      margin: auto;
      padding: 0 5rem;
      @media (max-width: $media-mobile) {
        .nav__menu {
          padding-top: 1rem;
        }
      }
  }
  @media (max-width: $media-mobile) {
      display: none;
      visibility: hidden;
      &.opened {
          display: inherit;
          visibility: visible;
      }
      &--container {
          padding: 0;
          height: 100vh;
      }
  }
  
  &__menu {
      display: flex;
      flex-direction: row;
      height: 100%;
      align-items: center;
      &__option {
          height: 100%;
          display: flex;
          align-items: center;          
          transition: .6s color;
          a {
              padding: 0 .8rem;
              height: 100%;
              display: flex;
              align-items: center;
          }
          &:last-child {
              padding-right: 0;
          }
          &:hover,
          &.--active {
              color: var(--secondary-color);
          }
          .router-link-active,
          &.option-active a {
              font-weight: bold;
              color: var(--lightest-color);
              background-color: var(--dark-color);
          }
      }
  }
  @media (max-width: $media-mobile) {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      &--home {
          display: none
      }
      &__menu {
          flex-direction: column;
          height: unset;
          padding-top: 3rem;
          width: 100vw;
          position: fixed;
          &__option {
              height: 3rem;
              width: 100%;
              a {
                  text-align: center;
                  width: 100%;
                  padding: 0;
                  justify-content: center;
              }
          }
      }
  }
}

.menu--ra--icon {
  height: calc(var(--navbar-height) - 15px);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  @media (max-width: 860px) {
    height: calc(var(--navbar-height) - 30px);
  }
}

.menu--icon {
  display: none;
  @media (max-width: $media-mobile) {
    background-color: var(--lightest-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 1rem;
    top: .9rem;
    z-index: 15;
    &--image {
      width: 40px;
      height: 40px;
      padding: .5rem;
    }
  }
}
</style>