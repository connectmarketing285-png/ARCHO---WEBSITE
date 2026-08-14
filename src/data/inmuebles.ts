/**
 * ⚠️ CONTENIDO DE DEMOSTRACIÓN — NO PUBLICAR
 *
 * Ni un solo inmueble de este archivo es real: nombres, precios, superficies y
 * ubicaciones están inventados para poder enseñar la maqueta, y las fotos son
 * de stock de Unsplash, las mismas que ya usa el resto del sitio.
 *
 * Antes de publicar hay que sustituir TODO el array `INMUEBLES` por la cartera
 * real y quitar el aviso `DEMO` de abajo. Publicar precios inventados en la web
 * de una constructora es un problema serio, no una errata.
 */

/** Interruptor del aviso visible en la página. Ponerlo en `false` al cargar
 *  la cartera real; ver `CatalogoInmuebles`. */
export const DEMO = true

export type Operacion = 'Venta' | 'Renta' | 'Preventa'
export type TipoInmueble = 'Casa' | 'Departamento' | 'Terreno' | 'Local comercial'

export type Inmueble = {
  slug: string
  nombre: string
  tipo: TipoInmueble
  operacion: Operacion
  ubicacion: string
  /** Texto ya formateado: los precios inmobiliarios se escriben, no se calculan. */
  precio: string
  superficie: string
  recamaras?: number
  banos?: number
  estacionamientos?: number
  /** ID de Unsplash; el ancho lo decide el componente vía srcset. */
  imagen: string
  alt: string
}

export const INMUEBLES_PAGE = {
  eyebrow: 'Servicios inmobiliarios',
  title: { lead: 'Del plano a', accent: 'las llaves.' },
  lede: 'Desarrollamos, comercializamos y acompañamos la compra de vivienda y espacio comercial. La misma constructora que levanta la obra responde por ella después de entregarla.',

  servicios: {
    eyebrow: 'Qué hacemos',
    heading: { lead: 'Cuatro formas de', accent: 'trabajar contigo.' },
    items: [
      {
        number: '01',
        title: 'Venta de vivienda',
        description:
          'Casas y departamentos de obra propia, con la ficha técnica completa y el respaldo de quien los construyó.',
      },
      {
        number: '02',
        title: 'Preventa de desarrollos',
        description:
          'Acceso a unidades antes del arranque de obra, con plan de pagos y avance documentado mes a mes.',
      },
      {
        number: '03',
        title: 'Renta comercial',
        description:
          'Locales y oficinas en operación, con mantenimiento y administración a cargo del estudio.',
      },
      {
        number: '04',
        title: 'Asesoría patrimonial',
        description:
          'Estudio de terreno, viabilidad y proyección de plusvalía antes de comprometer una inversión.',
      },
    ],
  },

  catalogo: {
    eyebrow: 'Cartera',
    heading: { lead: 'Inmuebles', accent: 'disponibles.' },
    /** Aviso visible mientras `DEMO` sea true. */
    demoNotice:
      'Contenido de demostración: los inmuebles, precios y fotografías de esta página son ficticios y sirven únicamente para revisar el diseño.',
    vacio: 'Estamos preparando la cartera. Escríbenos y te avisamos en cuanto abramos unidades.',
  },

  cta: {
    heading: '¿Buscas algo que no está en la lista?',
    lede: 'Cuéntanos qué necesitas y lo buscamos, o lo desarrollamos.',
    linkLabel: 'Hablar con el estudio →',
    linkTo: '/contact',
  },
} as const

/** ⚠️ DATOS FICTICIOS. Sustituir por la cartera real antes de publicar. */
export const INMUEBLES: readonly Inmueble[] = [
  {
    slug: 'casa-lomas-del-tangamanga',
    nombre: 'Casa Lomas',
    tipo: 'Casa',
    operacion: 'Venta',
    ubicacion: 'Lomas del Tangamanga, S.L.P.',
    precio: '$4,850,000 MXN',
    superficie: '245 m²',
    recamaras: 3,
    banos: 3,
    estacionamientos: 2,
    imagen: 'photo-1600585154340-be6161a56a0c',
    alt: 'Fotografía de referencia de una vivienda',
  },
  {
    slug: 'departamento-mirador-centro',
    nombre: 'Mirador Centro',
    tipo: 'Departamento',
    operacion: 'Preventa',
    ubicacion: 'Centro Histórico, S.L.P.',
    precio: 'Desde $2,390,000 MXN',
    superficie: '96 m²',
    recamaras: 2,
    banos: 2,
    estacionamientos: 1,
    imagen: 'photo-1545324418-cc1a3fa10c00',
    alt: 'Fotografía de referencia de un edificio de departamentos',
  },
  {
    slug: 'local-corredor-carranza',
    nombre: 'Local Carranza',
    tipo: 'Local comercial',
    operacion: 'Renta',
    ubicacion: 'Av. Venustiano Carranza, S.L.P.',
    precio: '$48,000 MXN / mes',
    superficie: '180 m²',
    banos: 2,
    estacionamientos: 4,
    imagen: 'photo-1497366216548-37526070297c',
    alt: 'Fotografía de referencia de un espacio comercial',
  },
  {
    slug: 'casa-club-quinta',
    nombre: 'Casa Quinta',
    tipo: 'Casa',
    operacion: 'Venta',
    ubicacion: 'Villa Magna, S.L.P.',
    precio: '$7,200,000 MXN',
    superficie: '410 m²',
    recamaras: 4,
    banos: 5,
    estacionamientos: 3,
    imagen: 'photo-1551882547-ff40c63fe5fa',
    alt: 'Fotografía de referencia de una residencia',
  },
  {
    slug: 'terreno-eje-140',
    nombre: 'Terreno Eje 140',
    tipo: 'Terreno',
    operacion: 'Venta',
    ubicacion: 'Zona Industrial, S.L.P.',
    precio: '$3,100,000 MXN',
    superficie: '1,240 m²',
    imagen: 'photo-1581094794329-c8112a89af12',
    alt: 'Fotografía de referencia de un terreno en desarrollo',
  },
  {
    slug: 'oficinas-torre-himno',
    nombre: 'Oficinas Himno',
    tipo: 'Local comercial',
    operacion: 'Renta',
    ubicacion: 'Av. Himno Nacional, S.L.P.',
    precio: '$62,000 MXN / mes',
    superficie: '320 m²',
    banos: 3,
    estacionamientos: 8,
    imagen: 'photo-1431576901776-e539bd916ba2',
    alt: 'Fotografía de referencia de oficinas',
  },
]
