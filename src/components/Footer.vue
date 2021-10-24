<template>
    <footer class="footer">
        &copy; {{ getYear() }} Raúl García Martín
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
    background-color: var(--footer-background-color);
    color: var(--secondary-text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--footer-height);
}
</style>