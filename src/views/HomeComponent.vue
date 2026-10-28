<template>
    <NavbarComponent/>
    <main class="main-container">
      <section class="home-intro" aria-label="Presentación">
        <h1 class="section-title home-intro__title">Ilustración de cultura pop y retratos por encargo</h1>
        <p class="home-intro__text">Dibujo a tus personajes favoritos de series, películas y videojuegos, y retratos de las personas que te importan.</p>
        <router-link class="button-primary" to="/encargos">Pide tu encargo</router-link>
      </section>
      <CategoryFilter
        v-if="works.length"
        @update-filter="filterProjects"
        aria-label="Filtrar obras por categoría"
      />
      <div class="portfolio-container">
        <p v-if="!works.length" class="portfolio-container_empty">Nuevas obras muy pronto.</p>
        <p v-else-if="!filteredPortfolioItems.length" class="portfolio-container_empty">Aún no hay obras en esta categoría.</p>
        <div v-for="work in filteredPortfolioItems" :key="work.slug"
        class="portfolio-container_card">
          <ProjectCard
                :title="work.title"
                :image="work.cover"
                :resume="work.summary"
                :projectSrc="getWorkUrl(work)"
                :category="getCategoryLabel(work)" />
        </div>
      </div>
    </main>
    <FooterComponent />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { publishedWorks, getCategoryLabel, getWorkUrl } from '@/views/data/works';
import { pages } from '@/views/data/pages';
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
      title: pages.home.title,
      description: pages.home.description,
      schema: getSchemaPersonProfile()
    });
  },
  data() {
    return {
      works: publishedWorks,
      filteredPortfolioItems: publishedWorks
    };
  },
  methods: {
    getCategoryLabel,
    getWorkUrl,
    filterProjects(selectedCategories) {
      if (selectedCategories.includes('Todos')) {
        this.filteredPortfolioItems = this.works;
      } else {
        this.filteredPortfolioItems = this.works.filter(project =>
          selectedCategories.includes(getCategoryLabel(project))
        );
      }
    },
  },
}
</script>

<style lang="scss">
@import './../assets/styles/_media-variables.scss';

.home-intro {
  max-width: 640px;
  padding-bottom: 1.5rem;
  &__title {
    padding-bottom: .5rem;
  }
  &__text {
    font-size: 1.1rem;
    line-height: 1.5;
  }
}

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