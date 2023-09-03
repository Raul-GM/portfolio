<template>
    <NavbarComponent sideType="designer" />
    <div class="main-container portfolio-container">
        <div v-for="(project, index) in portfolioItems" :key="index"
        class="portfolio-container_card">
          <ProjectCard 
                :title="project.title"
                :imgSrc="project.imgSrc"
                :resume="project.resume"
                :projectSrc="project.projectSrc"
                :category="project.category" />
        </div>
    </div>
    <FooterComponent />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ProjectCard from '@/components/ProjectCard.vue';

import { portfolioItems } from './data/portfolio';
export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ProjectCard,
  }, data() {
    return {
      portfolioItems: portfolioItems,
    };
  },
}
</script>

<style lang="scss">
@import './../assets/styles/_media-variables.scss';

.portfolio-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 400px;
  grid-gap: 1rem;
  @media (min-width: $media-small-mobile) {
    &_card {
      &:first-child,
      &:nth-child(6n) {
        grid-column: span 2;
        width: 100%;
      }
    }  
  }
}
</style>