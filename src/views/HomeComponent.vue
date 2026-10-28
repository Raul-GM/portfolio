<template>
    <NavbarComponent/>
    <CategoryFilter
      v-if="works.length"
      @update-filter="filterProjects"
      aria-label="Filtrar proyectos"
    />
    <main class="main-container portfolio-container">
        <h1 class="visually-hidden">Raúl García · Ilustración de cultura pop y retratos</h1>
        <p v-if="!works.length" class="portfolio-container_empty">Nuevas obras muy pronto.</p>
        <div v-for="(project, index) in filteredPortfolioItems" :key="index"
        class="portfolio-container_card">
          <ProjectCard 
                :title="project.title"
                :imgSrc="project.imgSrc"
                :resume="project.resume"
                :projectSrc="project.projectSrc"
                :category="project.category"
                :aria-label="project.title + ' - ' + project.category" />
        </div>
    </main>
    <FooterComponent />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { works } from '@/views/data/works';
import { useSeoMeta, getSchemaPersonProfile } from '@/composables/useSeoMeta';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ProjectCard,
    CategoryFilter
  },
  setup() {
    useSeoMeta({
      title: 'Raúl García | Ilustración de cultura pop y retratos por encargo',
      description: 'Portfolio de Raúl García: ilustraciones de series, películas y videojuegos, y retratos ilustrados por encargo.',
      schema: getSchemaPersonProfile()
    });
  },
  data() {
    return {
      works: works,
      filteredPortfolioItems: works
    };
  },
  methods: {
    filterProjects(selectedCategories) {
      if (selectedCategories.includes('Todos')) {
        this.filteredPortfolioItems = this.works;
      } else {
        this.filteredPortfolioItems = this.works.filter(project =>
          selectedCategories.includes(project.category)
        );
      }
    },
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
  &_empty {
    grid-column: 1 / -1;
    text-align: center;
  }
  @media (min-width: $media-small-mobile) {
    &_card {
      &:first-of-type,
      &:nth-of-type(6n) {
        grid-column: span 2;
        width: 100%;
      }
    }  
  }
}
</style>