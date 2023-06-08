<template>
    <Navbar sideType="designer"/>
    <div class="main-container">
        <h2 class="section-title">Portadas collección de discos</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Portadas de discos de colección de música para proyecto de la universidad. La premisa era realizar cinco portadas de una serie de discos que pertenecieran a una misma colección (inventada). Dicha colección debería compartir atributos de tal forma que se distinguiera a simple vista que los cinco volúmenes forman parte de un todo.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <OptimizedImage image="portfolio/DiscosLeyendasMetal/DioCD" altTitle="Portada CD Ronnie James Dio" />
                <OptimizedImage image="portfolio/DiscosLeyendasMetal/DoroCD" altTitle="Portada CD Doro Pesch" />
                <OptimizedImage image="portfolio/DiscosLeyendasMetal/LemmyCD" altTitle="Portada CD Lemmy Kilmister" />
                <OptimizedImage image="portfolio/DiscosLeyendasMetal/RobCD" altTitle="Portada CD Rob Halford" />
                <OptimizedImage image="portfolio/DiscosLeyendasMetal/JoanCD" altTitle="Portada CD Joan Jett" />
            </div>
        </div>
    </div>
    <Footer />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import OptimizedImage from '@/components/OptimizedImage.vue';

export default {
    components: {
        Navbar,
        Footer,
        OptimizedImage
    }
}
</script>
<style lang="scss">
</style>