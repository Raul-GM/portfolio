<template>
  <nav class="nav">
        <span>
            <router-link to="/" class="simple_link nav--side">{{sideType}} Side</router-link>
        </span>
        <ul class="nav__menu">
            <li class="nav__menu__option"><router-link :to="`/${sideType}-side/about-me`">Sobre mí</router-link></li>
            <li class="nav__menu__option"><router-link :to="`/${sideType}-side/portfolio`">Portfolio</router-link></li>
            <!-- TODO: <li class="nav__menu__option"><router-link to="/blog">Blog</router-link></li> -->
            <li class="nav__menu__option"><router-link to="/contact">Contacto</router-link></li>
            <li class="nav__menu__option" v-if="sideType === 'developer'"><router-link to="/designer-side">Designer Side</router-link></li>
            <li class="nav__menu__option" v-if="sideType === 'designer'"><router-link to="/developer-side">Developer Side</router-link></li>

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
    --nav-border-color: var(--dark-color);
}
.nav {
    background-color: var(--lightest-color);
    border-bottom: 1px solid var(--nav-border-color);
    font-size: 1.1rem;
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
        height: 100%;
        align-items: center;
        &__option {
            height: 100%;
            display: flex;
            align-items: center;
            max-width: 170px;
            min-width: 100px;
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
            .router-link-active  {
                font-weight: bold;
                color: var(--lightest-color);
                background-color: var(--secondary-color);
            }
        }
    }
    &--side {
        text-transform: capitalize;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: bold;
    }
}
</style>