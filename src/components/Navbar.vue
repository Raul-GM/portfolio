<template>
  <nav class="nav">
        <span><router-link to="/">Inicio {{sideType}}</router-link></span>
        <ul class="nav__menu">
            <li class="nav__menu__option"><router-link :to="`/${sideType}-side/about-me`">Sobre mí</router-link></li>
            <li class="nav__menu__option"><router-link :to="`/${sideType}-side/portfolio`">Portfolio</router-link></li>
            <!-- TODO: <li class="nav__menu__option"><router-link to="/blog">Blog</router-link></li> -->
            <li class="nav__menu__option"><router-link to="/contact">Contacto</router-link></li>
        </ul>
  </nav>
</template>

<script>
export default {
    props: {
        sideType: {
            type: String,
            default: 'developer',
        }
    }

}
</script>

<style lang="scss">
:root {
    --nav-border-color: #cccccc;
}
.nav {
    background-color: var(--secondary-color);
    border-bottom: 1px solid var(--nav-border-color);
    height: var(--navbar-height);
    padding: 0 2rem;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr auto;
    grid-auto-flow: dense;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
    &__menu {
        display: flex;
        flex-direction: row;
        &__option {
            margin: 0 .8rem;
            &:last-child {
                padding-right: 0;
            }
            &:hover,
            &.--active {
                color: var(--alternative-color)
            }
        }
    }
}
</style>