<template>
  <a href="#contenido" class="skip-link" v-on:click.prevent="skipToContent">Saltar al contenido</a>
  <header class="mobile-header">
    <router-link to="/" class="simple_link menu--ra--link--mobile">
      <ImageComponent
        class="menu--ra--icon--mobile"
        file="RaulGarciaRowLogo.png"
        altTitle="Raúl García, ir al inicio"
        eager>
      </ImageComponent>
    </router-link>
    <button class="menu--icon"
            ref="menuButton"
            v-on:click="onMenuIconClick"
            v-on:keydown.esc="closeMenu"
            :aria-expanded="isOpened"
            aria-controls="main-navigation"
            :aria-label="isOpened ? 'Cerrar menú' : 'Abrir menú'">
      <ImageComponent
        class="menu--icon--image"
        file="icons/menu.svg"
        altTitle=""
        v-if="!isOpened">
      </ImageComponent>
      <ImageComponent
        class="menu--icon--image"
        file="icons/cross.svg"
        altTitle=""
        v-if="isOpened">
      </ImageComponent>
    </button>
  </header>
  <nav id="main-navigation"
       class="nav"
       :class="{ 'nav--mobile': isMobile(), opened: isOpened }"
       aria-label="Navegación principal"
       v-on:keydown.esc="closeMenu">
    <div class="nav--container">
      <span class="nav--home">
        <router-link to="/"
            class="simple_link nav--side">
          <ImageComponent
            class="menu--ra--icon"
            file="RaulGarciaRowLogo.png"
            altTitle="Raúl García, ir al inicio"
            eager>
          </ImageComponent>
        </router-link>
      </span>
      <ul class="nav__menu">
        <li class="nav__menu__option" :class="{ 'option-active': isPortfolioRoute }">
          <router-link :to="'/'" ref="firstLink">
            Portfolio
          </router-link>
        </li>
        <li class="nav__menu__option">
          <router-link :to="'/encargos'">
            <span>Encargos</span>
          </router-link>
        </li>
        <li class="nav__menu__option" :class="{ 'option-active': isShopRoute }">
          <router-link :to="'/shop'">
            <span>Tienda</span>
          </router-link>
        </li>
        <li class="nav__menu__option">
          <router-link :to="'/about-me'">
            <span>Sobre mí</span>
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
import ImageComponent from '@/components/ImageComponent.vue';

export default {
  components: { ImageComponent },
  data() {
    return {
      isOpened: false,
      PORTFOLIO_PATH: 'portfolio',
      SHOP_PATH: '/shop'
    }
  },
  watch: {
    isOpened(opened) {
      this.setPageInert(opened);
    }
  },
  beforeUnmount() {
    this.setPageInert(false);
  },
  methods: {
    // Con el menú móvil abierto tapa el contenido: main y footer (que pinta cada vista) no deben recibir foco
    setPageInert(inert) {
      document.querySelectorAll('main, footer').forEach(element => { element.inert = inert; });
      // El fondo no debe desplazarse bajo el menú
      document.body.style.overflow = inert ? 'hidden' : '';
    },
    skipToContent() {
      const main = document.querySelector('main');
      if (!main) return;
      main.setAttribute('tabindex', '-1');
      main.focus();
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    onMenuIconClick() {
      this.isOpened = !this.isOpened;
      if (this.isOpened) {
        this.$nextTick(() => this.$refs.firstLink.$el.focus());
      }
    },
    closeMenu() {
      if (!this.isOpened) return;
      this.isOpened = false;
      this.$refs.menuButton.focus();
    }
  },
  computed: {
    isPortfolioRoute() {
      return this.$route.name === 'Work';
    },
    // Las fichas de lámina (/shop/:product) son otra ruta, así que router-link-active no las cubre
    isShopRoute() {
      return this.$route.path.startsWith(this.SHOP_PATH);
    }
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/media-variables' as *;

/* Enlace de salto: invisible hasta que recibe el foco con teclado */
.skip-link {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 20;
  padding: .75rem 1.5rem;
  border-radius: 5px;
  background-color: var(--darkest-color);
  color: var(--lightest-color);
  font-weight: bold;
  &:focus {
    top: 1rem;
  }
}
:root {
  --nav-border-color: var(--dark-color);
}
.mobile-header {
  display: none;
  @media (max-width: $media-mobile) {
    display: flex;
    height: var(--navbar-height);
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 30;
    background-color: var(--lightest-color);
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
      max-width: var(--page-max);
      padding: 0 var(--main-padding);
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
          display: flex;
          visibility: visible;
      }
      &--container {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 0;
          height: auto;
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
          a:focus-visible {
              outline-offset: -2px;
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
      // Menú abierto: ocupa lo que queda bajo la cabecera fija y hace scroll por su cuenta
      position: fixed;
      top: var(--navbar-height);
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      z-index: 20;
      overflow-y: auto;
      border-bottom: 0;
      flex-direction: column;
      padding: 0;
      &--home {
          display: none
      }
      &__menu {
          flex-direction: column;
          height: unset;
          padding-top: 3rem;
          width: 100%;
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