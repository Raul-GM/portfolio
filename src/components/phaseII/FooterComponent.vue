<template>
    <footer class="footer">
        <div class="footer-container">
            <span>
                &copy; {{ getYear() }} Raúl García Martín
            </span>
            <span class="footer-container__rrss">
                <a href="https://www.instagram.com/raulgarcia.design/"
                    target="_blank"
                    class="social-icon">
                    <ImageComponent file="icons/instagram.svg" altTitle="Logo Instagram"></ImageComponent>
                </a>
                <a href="https://www.behance.net/raulgm2/projects"
                    target="_blank"
                    class="social-icon">
                    <ImageComponent file="icons/behance.svg" altTitle="Logo Behance"></ImageComponent>
                </a>
                <a href="https://www.linkedin.com/in/raúl-garcia-martin-2106897b"
                    target="_blank"
                    class="social-icon">
                    <ImageComponent file="icons/linkedin2.svg" altTitle="Logo Linkedin"></ImageComponent>
                </a>
            </span>
        </div>
    </footer>
</template>

<script>
import ImageComponent from '@/components/phaseII/ImageComponent';

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
                img {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
}
</style>