export const SITE = {
  name: 'ARCHO',
  /**
   * Isotipo blanco entregado por el cliente. Sustituye al lockup horizontal
   * anterior (marca + "ARCHO CONSTRUCTORA"), así que el ratio pasa de 3.5 a
   * 0.82: donde se use con caja fija, ahora manda el alto y no el ancho.
   * El original a 4x vive en /brand; el que se sirve va recortado (el archivo
   * del cliente trae un 91% de lienzo transparente y descentrado).
   */
  logo: '/archo-isotipo.png',

  /**
   * Logotipo del nav: isotipo + "ARCHO / CONSTRUCTORA / S.A de C.V". Solo se
   * usa ahí, y sin texto al lado porque ya trae el nombre.
   * Recortado y reescalado desde el archivo del cliente (8268x11811 con un 96%
   * de lienzo vacío, 2,2 MB); el original está en /brand/6.png.
   */
  lockup: '/archo-lockup.png',

  /**
   * La dirección se guarda ya partida en líneas porque se pinta igual en el
   * pie, el menú móvil y /contact. Antes eran dos campos sueltos; con calle,
   * colonia, código postal y piso son tres renglones.
   */
  address: {
    lines: ['Av Santos Degollado 1137, Tangamanga', '78269 San Luis Potosí, S.L.P.', 'Cuarto piso'],
    /** Una sola línea, para metadatos y para el pie del mapa. */
    oneLine: 'Av Santos Degollado 1137, Tangamanga, 78269 San Luis Potosí, S.L.P. — Cuarto piso',
  },

  phone: {
    display: '+52 440 122 2002',
    href: 'tel:+524401222002',
  },

  /** El +52 es obligatorio en wa.me: sin país el enlace no resuelve. */
  whatsapp: {
    href: 'https://wa.me/524401222002',
    label: 'WhatsApp',
    /** Para el aria-label del botón, que en móvil va sin texto visible. */
    a11yLabel: 'Escríbenos por WhatsApp',
  },

  email: 'admin@archo.com.mx',
  hours: 'Lun — Vie · 09:00 — 19:00 CST',
  coverage:
    'San Luis Potosí · Querétaro · Guanajuato · Monterrey · Guadalajara · Baja California',

  footerTagline: {
    lead: 'Arquitectura, estructura, visión.',
    rest: 'construida para el siguiente siglo.',
  },
  copyright: '© 2026 ARCHO Estudio. Todos los derechos reservados.',

  // TODO: el cliente debe pasar las URLs reales. En el original apuntan a "#"
  // (bug técnico #2 del brief: se deja igual por ahora, es contenido).
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Behance', href: '#' },
  ],
} as const
