<template>
    <Navbar sideType="designer" />
    <div class="main-container">
        <AboutMe />
        <Portfolio />
    </div>
    <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import AboutMe from '@/components/designer/AboutMe.vue';
import Portfolio from '@/components/designer/Portfolio.vue';

export default {
  components: {
    Navbar,
    Footer,
    AboutMe,
    Portfolio
  }
}
</script>

<style>

</style>