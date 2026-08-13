export type ContactFormValues = {
  name: string
  email: string
  type: string
  message: string
}

/** Fijo: es la API pública de Web3Forms, no cambia entre entornos. */
const ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Clave de acceso de Web3Forms. Identifica el buzón al que se entregan los
 * mensajes; el servicio la da por pública, porque el envío ocurre desde el
 * navegador del visitante.
 *
 * Aun así va en variable de entorno y no escrita aquí: este repositorio es
 * público, y hay robots que rastrean GitHub buscando claves de formulario para
 * usarlas de pasarela de spam. En el bundle acaba igual, pero al menos no
 * queda indexada en el código fuente.
 *
 * Se configura en Vercel como VITE_WEB3FORMS_KEY. Sin ella el formulario falla
 * en seguro y muestra la vía por correo y WhatsApp.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export class ContactFormError extends Error {}

export async function sendContactForm({
  name,
  email,
  type,
  message,
}: ContactFormValues): Promise<void> {
  if (!ACCESS_KEY) {
    // Falla en vez de fingir que se envió: perder un mensaje en silencio es
    // exactamente lo que teníamos antes.
    throw new ContactFormError('VITE_WEB3FORMS_KEY no está configurada')
  }

  // Se envía como FormData y no como JSON a propósito. `Content-Type:
  // application/json` obliga al navegador a lanzar antes una petición OPTIONS
  // de comprobación; con FormData la petición es "simple" y va directa. Un
  // salto menos que pueda bloquear el cortafuegos del servicio.
  // `Accept` sí se puede mandar sin provocar esa comprobación, y es lo que hace
  // que Web3Forms responda JSON en vez de redirigir a su página de gracias.
  const body = new FormData()
  body.append('access_key', ACCESS_KEY)
  // `subject`, `name`, `email` y `message` tienen tratamiento especial en
  // Web3Forms: arman el asunto y el remitente al que responder. El resto de
  // claves salen tal cual en el cuerpo del correo, de ahí el nombre legible.
  body.append('subject', `Contacto desde archo.com.mx — ${type || 'sin tipo'}`)
  body.append('name', name)
  body.append('email', email)
  body.append('Tipo de proyecto', type)
  body.append('message', message)

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body,
  })

  // Web3Forms puede responder 200 con success:false (clave inválida, cuota
  // agotada). Mirar solo el código de estado daría un falso positivo.
  const data = (await response.json().catch(() => null)) as { success?: boolean } | null
  if (!response.ok || data?.success === false) {
    throw new ContactFormError(`El servicio rechazó el envío (${response.status})`)
  }
}
