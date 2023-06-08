<template>
    <Navbar />
    <div class="main-container">
        <h2 class="section-title">Rock This Concert</h2>
        <div class="portfolio-project-container">
            <div>
                <h3 class="section-title">¿Qué es Rock This Concert?</h3>
                <p><b>Rock This Concert</b> nace de una necesidad que tuve hace ya bastantes años. Soy una persona que le encanta la música, y sobretodo la música en directo. El estilo de música que me gusta es (o era) minoritario por lo que no hay demasiados medios que tuvieran una información completa de conciertos en España de forma completa y actualizada.</p>
                <p>Fue entonces cuando se me ocurrió la idea de realizar una aplicación que hiciera una especie de scrapping en tres o cuatro webs que tuvieran más información, recoger esos datos de forma ordenada y guardarlos en una base de datos que posteriormente consumiría para sacar el listado de conciertos ordenados y con bastante información de utilidad como precio de las entradas, lugar donde se celebraba el concierto con un link hacia más información sobre el mismo dando datos como la dirección y un enlace en google maps</p>
                <p>La web resultante aglutinaría la gran mayoría de los conciertos no amateurs de rock/metal de todo nuestro país, incluyendo la posibilidad también de guardar la fecha en el google calendar o incluso guardarlos como favoritos</p>
                <p>Este proyecto está abandonado por falta de tiempo, pero en su momento sacaba todos los conciertos de una página, los guardaba en la base de datos y mostraba en mi web toda la infomación</p>
                <p>Aunque personalmente creo que tenía potencial, empezaron a aparecer otras aplicaciones parecidas, de más amplio espectro musical y con más recursos, así que ese fue el otro motivo por los que dejé este proyecto iniciado, estable, pero inacabado.</p>
                <h3 class="section-title">¿Cómo está construído?</h3>
                <p><b>Rock This Concert</b> tenía dos partes diferenciadas. La parte del servidor y la parte del cliente. En el servidor por un lado teníamos toda la funcionalidad de scrapping para leer de una de las webs de conciertos que incluía lectura, recolección de datos y guardado en la base de datos de MongoDB.</p>
                <p>Por otro lado, en la parte servidor, se realiza todo el proceso de lectura y escritura en la base de datos en MongoDB, creación de las apis para consumo del Front. Toda esta parte está realizada con NodeJS, Express y MongoDB (Mongoose).</p>
                <p>Para la parte del front opté por el Framework que estaba aprendiendo en ese momento, Angular 4, usando Typescript y para los estilos, SCSS con PostCSS más adelante.</p>
                <p>Una de las últimas implementaciones que hice fue usar la Api gratuita de Spotify para conectar la web con las canciones y discos de los grupos seleccionados además de mostrar las fotografías de las bandas. Para ahondar en el código puedes encontrar el repositorio del proyecto <a class="simple_link" target="_blank" href="https://github.com/Raul-GM/A4-rtc/tree/develop">aquí</a> </p>
                <h3 class="section-title">¿Qué he aprendido?</h3>
                <p>Este proyecto fue un reto enorme para mí en su momento. Construir una aplicación de cero con parte front y parte back. Poder aplicar todo lo aprendido hasta la fecha de NodeJS con express fue un aliciente más.</p>
                <p>Cabe destacar que fue la primera vez que usé MongoDB en un proyecto real. Tras hacerme el curso en la Mongo Academy, decidí aplicarlo a mi proyecto para practicar y el resultado fue sumamente satisfactorio ya que no es lo mismo aplicar MongoDB en los ejercicios propuestos y exámenes que en un proyecto "real".</p>
                <p>Por el lado del front me permitió seguir mejorando y aplicando también los conocimientos obtenidos en diferentes cursos de Angular 2 y 4. Y es que este proyecto es la versión 2, ya que la primera versión estuvo hecho con Angular 2. También existe una versión beta con Angular. Fue muy útil el proceso de componentización y de evolución por las diferentes versiones de Angular.</p>
                <p>La decisión de introducir PostCSS también fue un reto. Después de haber escuchado varias charlas, haber leído por internet sobre ello y haber hecho un par de pruebas, decidí meterlo en mi proyecto para usarlo también en un entorno cercano al real.</p>
            </div>
            <div class="portfolio-project-container__images">
                <OptimizedImage image="portfolio/RockThisConcert/ListDesktop" altTitle="Pantallazo del listado de conciertos de Rock This Concert para desktop" />
                <OptimizedImage image="portfolio/RockThisConcert/ListMobile" class="vertical" altTitle="Pantallazo del listado de conciertos de Rock This Concert para mobile" />
                <OptimizedImage image="portfolio/RockThisConcert/DetailDesktop" altTitle="Pantallazo del detalle de un concierto de Rock This Concert para desktop" />
                <OptimizedImage image="portfolio/RockThisConcert/DetailMobile" class="vertical" altTitle="Pantallazo del detalle de un concierto de Rock This Concert para mobile" />
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