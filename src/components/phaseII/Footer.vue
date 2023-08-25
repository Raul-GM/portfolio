<template>
    <footer class="footer">
        <div class="footer-container">
            <span>
                &copy; {{ getYear() }} Raúl García Martín
            </span>
            <span>
                Redes sociales
            </span>
        </div>
    </footer>
</template>

<script>
export default {
    methods: {
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
        max-width: 1024px;
        padding: 0 5rem;
        margin: auto;
    }
}
</style>