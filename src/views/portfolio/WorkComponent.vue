<template>
  <NavbarComponent />
  <main class="main-container">
    <article class="work" :aria-labelledby="`work-title-${work.slug}`">
      <header class="work__header">
        <h1 :id="`work-title-${work.slug}`" class="section-title">{{ work.title }}</h1>
        <p class="work__meta">{{ meta }}</p>
      </header>
      <!-- La primera imagen va antes del texto: la obra es lo primero que se ve -->
      <div class="work__blocks">
        <template v-for="(block, index) in work.blocks" :key="index">
          <OptimizedImageComponent
            v-if="block.type === 'image'"
            :image="block.image"
            :altTitle="block.alt"
            :width="block.width"
            :height="block.height"
            sizes="(min-width: 840px) 800px, 100vw"
            :eager="index === 0" />
          <div v-if="index === 0" class="work__body">
            <p v-for="(paragraph, paragraphIndex) in work.body" :key="paragraphIndex">{{ paragraph }}</p>
          </div>
          <div v-else-if="block.type === 'video'" class="work__video">
            <iframe
              :src="`https://www.youtube-nocookie.com/embed/${block.youtubeId}`"
              :title="block.title"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen></iframe>
          </div>
        </template>
      </div>
      <footer class="work__footer">
        <p class="work__cta">¿Quieres algo así? <router-link class="button-primary" to="/encargos">Pide tu encargo</router-link></p>
        <router-link class="simple_link" to="/"><span aria-hidden="true">←</span> Volver al portfolio</router-link>
      </footer>
    </article>
  </main>
  <FooterComponent />
</template>

<script>
import { useRoute } from 'vue-router';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import OptimizedImageComponent from '@/components/OptimizedImageComponent.vue';
import { useSeoMeta, getSchemaCreativeWork } from '@/composables/useSeoMeta';
import { findWork, getCategoryLabel, getOgImage, getWorkUrl } from '@/views/data/works';

const SITE_URL = 'https://raulgarcia.me';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    OptimizedImageComponent
  },
  setup() {
    // El router solo entra aquí con un slug publicado (ver beforeEnter)
    const work = findWork(useRoute().params.slug);
    const url = `${SITE_URL}${getWorkUrl(work)}`;
    useSeoMeta({
      title: work.seo.title,
      description: work.seo.description,
      ogImage: getOgImage(work),
      ogUrl: url,
      schema: getSchemaCreativeWork({
        title: work.title,
        description: work.seo.description,
        image: `${SITE_URL}/${getOgImage(work)}`,
        dateCreated: work.date,
        url
      })
    });
  },
  computed: {
    work() {
      return findWork(this.$route.params.slug);
    },
    meta() {
      return [
        getCategoryLabel(this.work),
        this.work.franchise,
        this.work.kind === 'commission' ? 'Encargo' : null,
        this.work.date.slice(0, 4)
      ].filter(Boolean).join(' · ');
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/_media-variables.scss';

.work {
  max-width: 800px;
  margin: 0 auto;
  &__meta {
    color: var(--primary-color);
    padding-bottom: 1.5rem;
  }
  &__body p {
    padding-bottom: 1rem;
    line-height: 1.5;
    &:last-child {
      padding-bottom: 0;
    }
  }
  &__blocks {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 0 2rem;
    .image {
      width: 100%;
      height: auto;
    }
  }
  &__video {
    position: relative;
    aspect-ratio: 16 / 9;
    iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
  &__cta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 0;
    font-size: 1.1rem;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 2rem;
    @media (max-width: $media-mobile) {
      flex-direction: column;
    }
  }
}
</style>
