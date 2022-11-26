<template>
    <Navbar sideType="designer"/>
    <div class="main-container">
        <h2 class="section-title">Portadas collección de discos</h2>
        <div class="portfolio-project-container">
            <div>
                <p>Portadas de discos de colección de música para proyecto de la universidad. La premisa era realizar cinco portadas de una serie de discos que pertenecieran a una misma colección (inventada). Dicha colección debería compartir atributos de tal forma que se distinguiera a simple vista que los cinco volúmenes forman parte de un todo.</p>
            </div>
            <div class="portfolio-project-container__images full">
                <Image file="portfolio/DiscosLeyendasMetal/DioCD.png" altTitle="Portada CD Ronnie James Dio" />
                <Image file="portfolio/DiscosLeyendasMetal/DoroCD.png" altTitle="Portada CD Doro Pesch" />
                <Image file="portfolio/DiscosLeyendasMetal/LemmyCD.png" altTitle="Portada CD Lemmy Kilmister" />
                <Image file="portfolio/DiscosLeyendasMetal/RobCD.png" altTitle="Portada CD Rob Halford" />
                <Image file="portfolio/DiscosLeyendasMetal/JoanCD.png" altTitle="Portada CD Joan Jett" />
            </div>
        </div>
    </div>
    <Footer />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Image from '@/components/Image.vue';

export default {
    components: {
        Navbar,
        Footer,
        Image
    }
}
</script>
<style lang="scss">
</style>