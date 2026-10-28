<template>
  <NavbarComponent />
  <main class="main-container">
    <article class="work" :aria-labelledby="`work-title-${work.slug}`">
      <header class="work__header">
        <h1 :id="`work-title-${work.slug}`" class="section-title">{{ work.title }}</h1>
        <p class="work__meta">{{ meta }}</p>
      </header>
      <div class="work__body">
        <p v-for="(paragraph, index) in work.body" :key="index">{{ paragraph }}</p>
      </div>
      <section class="work__blocks" :aria-label="`Imágenes de ${work.title}`">
        <template v-for="(block, index) in work.blocks" :key="index">
          <OptimizedImageComponent
            v-if="block.type === 'image'"
            :image="block.image"
            :altTitle="block.alt"
            :width="block.width"
            :height="block.height"
            sizes="(min-width: 840px) 800px, 100vw"
            :eager="index === 0" />
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
      </section>
      <footer class="work__footer">
        <router-link class="simple_link" to="/portfolio">← Volver al portfolio</router-link>
        <router-link class="simple_link" to="/contact">¿Quieres un encargo así? Escríbeme</router-link>
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
  &__footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 2rem;
    @media (max-width: $media-mobile) {
      flex-direction: column;
    }
  }
}
</style>
