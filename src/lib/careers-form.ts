/**
 * Endpoint que recibe las candidaturas con el CV adjunto. Se configura como
 * VITE_CAREERS_ENDPOINT en Vercel, aparte del formulario de contacto, porque
 * los adjuntos suelen requerir un plan o incluso un servicio distinto.
 *
 * A diferencia del de contacto, este envía multipart/form-data: un archivo no
 * viaja en JSON sin convertirlo a base64, que multiplica su tamaño y lo
 * rechazan casi todos los servicios.
 *
 * Mientras esté vacía, la interfaz no muestra el formulario: enseña la vía por
 * correo, que sí entrega. Ver `careersUploadEnabled`.
 */
const ENDPOINT = import.meta.env.VITE_CAREERS_ENDPOINT as string | undefined

/** Decide qué interfaz se pinta. Se resuelve al construir, no en tiempo real. */
export const careersUploadEnabled = Boolean(ENDPOINT)

export class CareersFormError extends Error {}

export async function sendCareersForm(form: HTMLFormElement): Promise<void> {
  if (!ENDPOINT) {
    throw new CareersFormError('VITE_CAREERS_ENDPOINT no está configurada')
  }

  // Se manda el FormData tal cual, sin fijar Content-Type: el navegador debe
  // ponerlo él para incluir el `boundary` que separa las partes.
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new FormData(form),
  })

  if (!response.ok) {
    throw new CareersFormError(`El servicio respondió ${response.status}`)
  }
}
