<template>
    <Navbar />
    <div class="main-container">
        <h1 class="section-title">Portfolio</h1>
        <div class="portfolio">
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
                    <h2 class="section-title">Proyecto: Rock This Concert</h2>
                    <div class="project-container__info">
                        <span>Rock This Concert nace de una necesidad que tuve hace ya bastantes años. Soy una persona que le encanta la música, y sobretodo la música en directo. El estilo de música que me gusta es (o era) minoritario por lo que no hay demasiados medios que tuvieran esa información completa y actualizada. Fue entonces cuando se me ocurrió la idea de...</span>
                        <div class="project-container__info__image-container">
                            <Image
                                file="portfolio/SkullsNRavens01.png" />
                            <Link label="Más información" href="/portfolio/RTC" />
                        </div>
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

.main-container .portfolio {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    grid-auto-rows: min-content;

}
.project-container {
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