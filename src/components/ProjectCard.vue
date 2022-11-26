<template>
    <router-link class="project-card" :to="projectSrc">
        <div class="project-card--background" :style="inlineStyle"></div>
        <div class="project-card--info">
            <h3 class="section-title">{{ title }}</h3>
            <p>{{ resume }}</p>
        </div>
    </router-link>
</template>
<script>
export default {
    components: {
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        imgSrc: {
            type: String,
            default: ''
        },
        resume: {
            type: String,
            default: ''
        },
        projectSrc: {
            type: String,
            default: ''
        }
    }, computed: {
        backgroundImage() {
            return require(`../assets/images/${this.imgSrc}`)
        },
        inlineStyle () {
            return {
                backgroundImage: `url(${this.backgroundImage})` 
            }
        }
    }
}
</script>
<style lang="scss">
.project-card {
    position: relative;
    display: block;
    max-width: 500px;
    height: 460px;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0 .4rem var(--dark-color);
    transition: box-shadow .3s ease-in-out;
    background-color: white;
    &:hover {
        box-shadow: 0 0 1rem var(--dark-color);
        .project-card--background {
            background: center top no-repeat;
            background-size: 600px;
        }
        .project-card--info {
            margin-top: -4rem;
        }
    }
    &--background {
        width: 100%;
        height: 270px;
        background: center center no-repeat;
        background-size: 500px;
        transition: background .5s ease-in-out;
    }
    &--info {
        padding: 3rem 1rem 1rem 1rem;
        margin-top: -2rem;
        position: relative;
        transition: margin-top .5s ease-in-out;
        background: rgb(255,255,255);
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 90%, rgba(0,0,0,0) 100%);
    }
}
</style>