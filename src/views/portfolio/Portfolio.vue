<template>
    <Navbar />
    <h1 class="section-title">Portfolio</h1>
    <div class="main-container portfolio">
        <div class="project-container">
            <h2 class="section-title">Proyecto: Skulls'n Ravens</h2>
            <div class="project-container__info">
                <span>Skulls'n Ravens es un blog en el que hablo de música orientada al Rock y al Metal. La idea nació a raíz de dos necesidades, en primer lugar, como apasionado de la música y de los conciertos, quería un sitio donde guardara mis experiencias y mis fotos para volver a ellas cada vez que quisiera recordar la experiencia. Por otro lado, quería probar a hacer...</span>
                <div class="project-container__info__image-container">
                    <Image
                        file="portfolio/SkullsNRavens01.png" />
                    <Link label="Más información" href="/portfolio/skulls-n-ravens" />
                </div>
            </div>
        </div>
        <div class="project-container">
            <div class="project-container">
            <h2 class="section-title">Proyecto: X</h2>
            <div class="project-container__info">
                <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, aut quas quo beatae ullam harum sint? Architecto doloribus exercitationem a? Voluptatum distinctio dolorum officia at dolores molestias reprehenderit in rem....</span>
                <div class="project-container__info__image-container">
                    <Image
                        file="portfolio/SkullsNRavens01.png" />
                    <Link label="Más información" href="/portfolio/skulls-n-ravens" />
                </div>
            </div>
        </div>
        </div>
    </div>
    <Footer />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Link from '@/components/Link.vue';

import Image from '@/components/Image.vue';

export default {
    components: {
        Navbar,
        Footer,
        Link,
        Image
    }
}
</script>
<style lang="scss">
.main-container.portfolio {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    grid-auto-rows: min-content;

}
.project-container {
    .section-title {
        text-align: center;
    }
    &__info {
        display: flex;
        &__image-container {
            display: flex;
            flex-direction: column;
            padding-left: 1rem;
            a {
                text-align: center;
            }
        }
    }
    img {
        height: 150px;
    }
}
</style>