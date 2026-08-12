/** Año de fundación, tomado del eyebrow del original ("Estudio · Desde 2011"). */
export const FOUNDED_YEAR = 2011

export type Stat = {
  /** Valor final del contador. Anima de 0 a este número al entrar en viewport. */
  value: number
  /** Se pinta fijo junto a la cifra; no entra en la animación (p. ej. el "+" de 120+). */
  suffix?: string
  label: string
}

export const ABOUT = {
  intro: {
    eyebrow: `Estudio · Desde ${FOUNDED_YEAR}`,
    title: { lead: 'Más allá', accent: 'de lo evidente.' },
    lede: 'Una constructora que piensa como estudio de arquitectura y un estudio que entiende la obra. Esa doble naturaleza define cada decisión que tomamos.',
  },

  manifesto: {
    eyebrow: 'Manifiesto',
    statement:
      'Una obra es un argumento silencioso sobre cómo debería habitarse un lugar — para el siguiente siglo, no para el siguiente titular.',
    paragraphs: [
      'ARCHO nace del deseo de cerrar la brecha entre proyecto y construcción. Operamos como una práctica integral —dibujo, ingeniería y obra bajo un mismo techo— para que nada se pierda en la entrega entre la idea y su materialización.',
      'Hoy, un equipo de arquitectos, ingenieros y artesanos desarrolla un portafolio acotado de obra residencial, cultural y corporativa en San Luis Potosí, Querétaro, Guanajuato, Monterrey, Guadalajara, Baja California y otros estados del país.',
    ],
    image: 'photo-1487958449943-2429e8be8625',
    imageAlt: 'Estudio ARCHO',
  },

  method: {
    eyebrow: '01 · Método',
    heading: { lead: 'Diseñar para construir;', accent: 'construir lo diseñado.' },
    lede: 'Trabajamos en ciclos cortos de decisión donde proyecto, presupuesto y obra avanzan en paralelo. Cada lámina se prueba contra su lógica constructiva antes de ser firmada; cada partida se cotiza contra su intención arquitectónica antes de ser ejecutada.',
    image: 'photo-1503387762-592deb58ef4e',
    imageAlt: 'Método de trabajo',
    steps: [
      {
        number: '01',
        title: 'Lectura del sitio',
        description:
          'Topografía, contexto, normatividad y vocación del lugar como punto de partida.',
      },
      {
        number: '02',
        title: 'Diseño viable',
        description:
          'Cada decisión proyectual se valida contra costo, tiempo y proceso constructivo.',
      },
      {
        number: '03',
        title: 'Obra dirigida',
        description:
          'El mismo equipo que dibujó conduce la obra. Una sola voz, de la idea a la entrega.',
      },
      {
        number: '04',
        title: 'Cierre y entrega',
        description:
          'Pruebas, ajustes finos y manuales de operación. La obra se entrega lista para habitarse.',
      },
    ],
  },

  vision: {
    eyebrow: '02 · Visión',
    heading: { lead: 'Construir piezas que envejezcan', accent: 'con dignidad.' },
    paragraphs: [
      'Nos interesa una arquitectura que no necesite explicarse. Que resuelva con honestidad lo funcional, que se construya con materiales nobles y que, con los años, gane lo que la moda no puede dar: carácter.',
      'Aspiramos a ser el estudio de cabecera de quienes construyen pensando en la siguiente generación, no en la siguiente entrega.',
    ],
    image: 'photo-1486325212027-8081e485255e',
    imageAlt: 'Visión del estudio',
  },

  values: {
    eyebrow: '03 · Valores',
    heading: { lead: 'Cuatro principios que', accent: 'no negociamos.' },
    items: [
      {
        number: '01',
        title: 'Precisión',
        description: 'Cada junta, cada relieve, cada cota dibujada a escala real.',
      },
      {
        number: '02',
        title: 'Innovación',
        description: 'Materiales, métodos y soluciones estructurales probados en taller propio.',
      },
      {
        number: '03',
        title: 'Elegancia',
        description: 'La contención como disciplina. Menos elementos, mejor pensados.',
      },
      {
        number: '04',
        title: 'Confianza',
        description: 'Relaciones largas con clientes y un solo responsable de principio a fin.',
      },
    ],
  },

  stats: {
    eyebrow: 'El estudio en cifras',
    // Valores tomados del sitio en vivo: no aparecen en el HTML capturado
    // porque los contadores renderizan desde 0 en cliente.
    items: [
      { value: 42, label: 'Arquitectos e ingenieros' },
      { value: 3, label: 'Estados de operación' },
      { value: 120, suffix: '+', label: 'Proyectos entregados' },
      // 14 va fijo a propósito: en el original es un número escrito a mano, no
      // un cálculo sobre FOUNDED_YEAR (que daría 15 en 2026). Se replica 1:1.
      { value: 14, label: 'Años de práctica' },
    ] satisfies readonly Stat[],
  },

  cta: {
    heading: 'Conversemos sobre tu próximo proyecto.',
    linkLabel: 'Iniciar una conversación →',
    linkTo: '/contact',
  },
} as const
