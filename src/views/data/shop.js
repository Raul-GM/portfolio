// Única fuente de la tienda: listado, ficha, SEO, sitemap y HTML para redes salen de aquí.
// No hay carrito ni cobro en la web: quien quiere una lámina escribe desde Contacto. Se valida con `npm run check`.
//
// id           URL /shop/<id>; estable, en minúsculas con guiones
// name         nombre de la lámina
// image        imagen del mockup, ruta sin sufijo ni extensión (npm run images -- <origen> --slug shop-<id> --dir shop)
// width/height dimensiones de la variante mayor
// alt          descripción de la imagen
// price        euros, número
// available    true si hay láminas; false muestra "Agotada"
// description  papel, tamaño y acabado
// workSlug     slug de la obra en works.js si la lámina es de una obra publicada; null si no
// La imagen OG de cada lámina es public/og/shop-<id>.jpg.
export const shopData = [
    {
        id: 'cuero',
        name: 'Cuero',
        image: 'shop/Cuero',
        width: 1280,
        height: 1280,
        alt: 'Lámina «Cuero» enmarcada sobre un escritorio: ilustración en blanco y negro de una persona de espaldas con una chaqueta de cuero con una calavera.',
        price: 14,
        available: true,
        description: 'Impresión digital en A3 (29,7 x 42 cm) sobre papel couché de 250 g. Se entrega sin marco.',
        workSlug: null
    },
    {
        id: 'diosa',
        name: 'Diosa',
        image: 'shop/Diosas',
        width: 1280,
        height: 1336,
        alt: 'Lámina «Diosa» con marco negro: ilustración en blanco y negro de una mujer de pelo largo y oscuro.',
        price: 10,
        available: true,
        description: 'Impresión digital en A3 (29,7 x 42 cm) sobre papel offset de 100 g. Se entrega sin marco.',
        workSlug: null
    }
];

export const findProduct = (id) => shopData.find(product => product.id === id);

export const formatPrice = (price) => `${price} €`;

export const getProductUrl = (product) => `/shop/${product.id}`;

export const getProductOgImage = (product) => `og/shop-${product.id}.jpg`;

export const findProductByWork = (slug) => shopData.find(product => product.workSlug === slug);
