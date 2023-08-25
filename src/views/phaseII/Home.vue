<template>
    <Navbar sideType="designer" />
    <div class="main-container portfolio-container">
        <div v-for="(project, index) in portfolioItems" :key="index"
        class="portfolio-container_card">
          <ProjectCard 
                :title="project.title"
                :imgSrc="project.imgSrc"
                :resume="project.resume"
                :projectSrc="project.projectSrc" />
        </div>
    </div>
    <Footer />
</template>

<script>
import Navbar from '@/components/phaseII/Navbar.vue';
import Footer from '@/components/phaseII/Footer.vue';
import ProjectCard from '@/components/phaseII/ProjectCard.vue';

import { portfolioItems } from './data/portfolio';
export default {
  components: {
    Navbar,
    Footer,
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
  grid-gap: 20px;
  &_card {
    &:nth-child(odd) {
      grid-row: span 2;
    }
    &:nth-child(3n) {
      grid-column: span 2;
    }
    &:nth-child(5n) {
      grid-row: span 3;
    }
  }
}
</style>