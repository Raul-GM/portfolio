<template>
    <router-link class="project-card" :to="projectSrc" :aria-label="`Ir al proyecto ${title}`">
        <div div class="project-card--background" :style="inlineStyle" :alt="`Imagen de proyecto: ${title}`"></div>
        <div class="project-card--info">
            <h3 class="section-title">{{ title }}</h3>
            <p>{{ category }}</p>
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
        },
        category: {
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
  height: 400px;
  overflow: hidden;
  transition: box-shadow .3s ease-in-out;
  border: 2px solid var(--primary-color);
  &:hover {
    .project-card--background {
      background: center top no-repeat;
      background-size: 600px;
    }
    .project-card--info {
      margin-top: -2rem;
    }
  }
  &--background {
    width: 100%;
    height: 80%;
    background: center center no-repeat;
    background-size: 500px;
    transition: background .5s ease-in-out;
  }
  &--info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(20% + 1rem);
    padding: 0 .5rem;
    margin-top: -1rem;
    position: relative;
    transition: margin-top .5s ease-in-out;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 90%, rgba(0,0,0,0) 100%);
  }
  .section-title {
      padding: 1rem 0 .4rem 0;
      font-size: 1.2rem;
  }
}
</style>