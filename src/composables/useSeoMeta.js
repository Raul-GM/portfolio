import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const SITE_URL = 'https://raulgarcia.me'

export const useSeoMeta = (options) => {
  const {
    title = 'Raúl García | Ilustración de cultura pop y retratos por encargo',
    description = 'Portfolio de Raúl García: ilustraciones de series, películas y videojuegos, y retratos ilustrados por encargo.',
    ogImage = 'og-image.jpg',
    ogUrl = `${SITE_URL}${useRoute().path}`,
    schema = null,
    noindex = false
  } = options || {}

  const head = {
    title,
    meta: [
      {
        name: 'description',
        content: description
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: ogImage.startsWith('http') ? ogImage : `https://raulgarcia.me/${ogImage}`
      },
      {
        property: 'og:url',
        content: ogUrl
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: description
      },
      {
        name: 'twitter:image',
        content: ogImage.startsWith('http') ? ogImage : `https://raulgarcia.me/${ogImage}`
      }
    ]
  }

  // Una página no encontrada no se indexa ni declara canonical
  if (noindex) {
    head.meta.push({ name: 'robots', content: 'noindex' })
  } else {
    head.link = [{ rel: 'canonical', href: ogUrl }]
  }

  if (schema) {
    head.script = [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema)
      }
    ]
  }

  useHead(head)
}

export const getSchemaPersonProfile = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Raúl García',
    url: 'https://raulgarcia.me',
    email: 'raulgm83.art@gmail.com',
    jobTitle: 'Ilustrador',
    image: 'https://raulgarcia.me/og-image.jpg',
    sameAs: [
      'https://www.instagram.com/raulgarcia.design/',
      'https://www.behance.net/raulgm2/projects',
      'https://youtube.com/@raulgarcia.design'
    ],
    description: 'Ilustrador especializado en cultura pop (series, películas y videojuegos) y retratos por encargo.'
  }
}

export const getSchemaCreativeWork = (project) => {
  const { title, description, image, dateCreated, url } = project

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image,
    dateCreated,
    url,
    creator: {
      '@type': 'Person',
      name: 'Raúl García'
    }
  }
}
