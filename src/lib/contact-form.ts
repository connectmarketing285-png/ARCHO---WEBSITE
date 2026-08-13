export type ContactFormValues = {
  name: string
  email: string
  type: string
  message: string
}

/**
 * Endpoint del servicio que recibe el formulario. Se configura como variable de
 * entorno en Vercel (VITE_CONTACT_ENDPOINT) en vez de incrustarse aquí, para
 * poder cambiar de proveedor sin tocar código.
 *
 * Está pensado para Formspree (https://formspree.io/f/xxxxxxxx), que acepta un
 * POST con JSON y reenvía el mensaje por correo. Cualquier servicio con el
 * mismo contrato —Web3Forms, Basin— sirve igual.
 *
 * Al llevar el prefijo VITE_ el valor se incrusta en el bundle y es público:
 * es lo correcto aquí, porque un endpoint de formulario está hecho para
 * recibir envíos desde el navegador. Nunca poner aquí una clave secreta.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

export class ContactFormError extends Error {}

export async function sendContactForm(values: ContactFormValues): Promise<void> {
  if (!ENDPOINT) {
    // Falla en vez de fingir que se envió: perder un mensaje en silencio es
    // exactamente lo que teníamos antes.
    throw new ContactFormError('VITE_CONTACT_ENDPOINT no está configurada')
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      nombre: values.name,
      correo: values.email,
      tipoDeProyecto: values.type,
      mensaje: values.message,
      // Formspree usa este campo para el asunto del correo que llega al buzón.
      _subject: `Contacto desde archo.com.mx — ${values.type || 'sin tipo'}`,
    }),
  })

  if (!response.ok) {
    throw new ContactFormError(`El servicio respondió ${response.status}`)
  }
}
