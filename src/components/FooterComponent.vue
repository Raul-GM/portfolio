<template>
    <footer class="footer" role="contentinfo" aria-label="Pie de página">
        <div class="footer-container">
            <span>
                &copy; {{ getYear() }} Raúl García Martín
            </span>
            <span class="footer-container__rrss">
                <a href="https://www.instagram.com/raulgarcia.design/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ir a Instagram de Raúl García"
                    class="social-icon">
                    <ImageComponent file="icons/instagram.svg" altTitle="Logo Instagram"></ImageComponent>
                </a>
                <a href="https://www.behance.net/raulgm2/projects"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ir a Behance de Raúl García"
                    class="social-icon">
                    <ImageComponent file="icons/behance.svg" altTitle="Logo Behance"></ImageComponent>
                </a>
                <a href="https://youtube.com/@raulgarcia.design?si=vtGtOh9aZKiw1Kkk"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ir a canal de Youtube de Raúl García"
                    class="social-icon">
                    <ImageComponent file="icons/youtube.svg" altTitle="Logo Youtube"></ImageComponent>
                </a>
            </span>
        </div>
    </footer>
</template>

<script>
import ImageComponent from '@/components/ImageComponent';

export default {
        components: {
          ImageComponent
    }, methods: {
        getYear() {
            return new Date().getFullYear()
        }
    }
}
</script>

<style lang="scss">
@import './../assets/styles/media-variables';

.footer {
  background-color: var(--darkest-color);
  color: var(--secondary-text-color);
  height: var(--footer-height);
  font-size: .9rem;
  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 5rem;
    margin: auto;
    &__rrss {
      display: flex;
      gap: .7rem;
      .social-icon {
        width: 24px;
        height: 24px;
        &:hover img{
          filter: brightness(1.5) sepia(100%) hue-rotate(235deg);
        }
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  @media (max-width: $media-mobile) {
    height: var(--footer-height-mobile);
    &-container {
      flex-direction: column;
      justify-content: space-evenly;
      padding: 1rem;
    }
  
  }
}
</style>