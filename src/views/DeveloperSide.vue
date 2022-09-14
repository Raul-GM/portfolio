<template>
    <Navbar />
    <div class="main-container">
        <AboutMe />
        <Portfolio />
    </div>
    <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import AboutMe from '@/components/developer/AboutMe.vue';
import Portfolio from '@/components/developer/Portfolio.vue';

export default {
    components: {
        Navbar,
        Footer,
        AboutMe,
        Portfolio
    }
}
</script>

<style lang="scss">
</style>