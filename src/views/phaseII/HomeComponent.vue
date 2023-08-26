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
import NavbarComponent from '@/components/phaseII/NavbarComponent.vue';
import FooterComponent from '@/components/phaseII/FooterComponent.vue';
import ProjectCard from '@/components/phaseII/ProjectCard.vue';

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
.portfolio-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 400px;
  grid-gap: 2rem;
  &_card {
    /*
    width: 200px;
    &:first-child,
    &:nth-child(6n) {
      grid-column: span 2;
      grid-row: span 0;
      width: 400px;
      height: 400px;
    }
    
    &:nth-child(3n) {
      grid-column: span 2;
    }
    &:nth-child(5n) {
      grid-row: span 3;
    }
    */
  }
}
</style>