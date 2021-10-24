<template>
  <div class="aboutme-container">
      <h1 class="aboutme-container__title section-title">Sobre mí</h1>
      <div class="aboutme-container__part">
          IMAGEN
      </div>
      <div class="aboutme-container__part">
            <p>Expetenda tincidunt in sed, ex partem placerat sea, porro commodo ex eam. His putant aeterno interesset at. Usu ea mundi tincidunt, omnium virtute aliquando ius ex. Ea aperiri sententiae duo. Usu nullam dolorum quaestio ei, sit vidit facilisis ea. Per ne impedit iracundia neglegentur. Consetetur neglegentur eum ut, vis animal legimus inimicus id. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. His audiam deserunt in, eum ubique voluptatibus te. In reque dicta usu. Ne rebum dissentiet eam, vim omnis deseruisse id. Ullum deleniti vituperata at quo, insolens complectitur te eos, ea pri dico munere propriae. </p>
            <Link
                class="aboutme-container__full"
                label="Más sobre mí"
                href="/about-me"
            />
      </div>
  </div>
</template>

<script>
import Link from '@/components/Link.vue';

export default {
    components: {
        Link,
    }
}
</script>

<style lang="scss">
.aboutme-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, min-content);
    align-items: center;
    justify-items: center;
    min-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 200px);
    padding: 2rem 0;
    &__title {
        grid-column: 1/3;
    }
    &__part {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
    }
}
</style>