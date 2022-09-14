<template>
    <Navbar />
    <div class="main-container">
        <h2 class="section-title">Skulls'n Ravens</h2>
        <div class="portfolio-project-container">
            <div>
                <h3 class="section-title">¿Qué es Skulls'n Ravens?</h3>
                <p>Skulls'n Ravens es un blog en el que hablo de música orientada al Rock y al Metal. La idea nació a raíz de dos necesidades, en primer lugar, como apasionado de la música y de los conciertos, quería un sitio donde guardara mis experiencias y mis fotos para volver a ellas cada vez que quisiera recordar la experiencia. Por otro lado, quería probar a hacer algo que no había hecho nunca, construir un blog con Vue, Nuxt y lenguaje Markdown, que conocía a raíz de haber asistido a una conferencia en uno de los múltiples eventos que se organizan</p>
                <p>Con la pandemia, al no poder asistir a conciertos, fui nutriendo el blog de diferentes contenidos y fui madurando y mejorando tanto el contenido como la arquitectura del mismo</p>
                <p>Actualmente esta web está disponible en producción en el siguiente enlace <a class="simple_link" target="_blank" href="https://www.skullsandravens.com/">www.skullsandravens.com</a></p>
                <h3 class="section-title">¿Cómo está construído?</h3>
                <p>Como he comentado anteriormente, este proyecto está hecho con VueJS, Nuxt y Markdown. La base está construida con Nuxt, que se apoya sobre VueJS. De esta forma con unas pocas líneas de código y componentizando la web podría evolucionarla de forma rápida y sencilla. Además está el tema de la performance, que hace que la web vaya más rápida. También he encontrado una mejora en el SEO</p>
                <p>En esta web he optado por una tecnología serverless. De esta forma toda la información de los posts se quedan guardados en formato Markdown que recupero dinámicamente y de forma rápida. Como extras he añadido la posibilidad de elegir el idioma de la aplicación entre inglés y castellano. Las imágenes, al ser bastantes, he optado por usar un lazy loading, de tal forma que hasta que la imagen no aparezca en pantalla, esta no se carga, mejorando aún más el performance.</p>
                <p>Para la parte de estilos, he usado SCSS. Todo el diseño de la web y logo está realizado por mí.</p>
                <p>Si quieres echar un vistazo a mi repo, te dejo el enlace a <a class="simple_link" target="_blank" href="https://github.com/Raul-GM/skullsandravens-blog">Github</a></p>
                <h3 class="section-title">¿Qué he aprendido?</h3>
                <p>Es el "pet project" más ambicioso que he realizado hasta la fecha y me ha supuesto un apredizaje enorme. En primer lugar, evolucionar con VueJS, ya que hasta la fecha había hecho pruebas sueltas muy pequeñas. Además aderezándolo con Nuxt y toda su filosofía ha sido un plus.</p>
                <p>Realizar el contenido en Markdown, ha sido una experiencia muy divertida, ver cómo usar componentes y mejorarlos para que la experiencia de introducción de contenido sea rápida y sencilla. Crear la posibilidad de elegir dos idiomas para leer la web y además intentar mantener el contenido en ambos idiomas ha sido un reto que me ha dado más soltura y seguridad a la hora de escribir en inglés.</p>
                <p>Me gustaría mejorar la web, introducirle más animaciones, ahora mismo queda bastante estática. Además querría crear un buscador para buscar por tags aprovechando la creación de estos tags en cada uno de los markdowns de los posts</p>
            </div>
            <div class="portfolio-project-container__images">
                <Image file="portfolio/SkullsAndRavens/SkullsNRavens02.png"/>
                <Image file="portfolio/SkullsAndRavens/SkullsNRavens03.png"/>
                <Image file="portfolio/SkullsAndRavens/SkullsNRavens04.png"/>
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