import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { CAREERS, CV_MAX_BYTES } from '@/data/careers'
import { sendCareersForm } from '@/lib/careers-form'

const LABEL_CLASS =
  'col-span-4 text-[11px] uppercase tracking-[0.3em] text-archo-mist md:col-span-3'
const CONTROL_CLASS =
  'col-span-8 bg-transparent text-base text-archo-cream placeholder:text-archo-mist/40 disabled:opacity-50 md:col-span-9'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function CareersForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [fileError, setFileError] = useState('')
  const [fileName, setFileName] = useState('')

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    // Se comprueba aquí y no solo al enviar: es preferible avisar en cuanto se
    // elige el archivo que después de rellenar todo lo demás.
    if (file && file.size > CV_MAX_BYTES) {
      setFileError(CAREERS.file.tooBig)
      setFileName('')
      event.target.value = ''
      return
    }
    setFileError('')
    setFileName(file?.name ?? '')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const file = new FormData(form).get('cv')
    if (file instanceof File && file.size > CV_MAX_BYTES) {
      setFileError(CAREERS.file.tooBig)
      return
    }

    setStatus('sending')
    try {
      await sendCareersForm(form)
      setStatus('sent')
      form.reset()
      setFileName('')
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <form className="border-t border-white/10" onSubmit={handleSubmit}>
      {CAREERS.fields.map((field) => (
        <div
          key={field.id}
          className="grid grid-cols-12 items-center gap-4 border-b border-white/10 py-6"
        >
          <label htmlFor={field.id} className={LABEL_CLASS}>
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            required
            disabled={sending}
            placeholder={field.placeholder}
            className={`${CONTROL_CLASS} min-h-11 md:min-h-0`}
          />
        </div>
      ))}

      <div className="grid grid-cols-12 items-center gap-4 border-b border-white/10 py-6">
        <label htmlFor="cv" className={LABEL_CLASS}>
          {CAREERS.file.label}
        </label>
        <div className="col-span-8 md:col-span-9">
          {/* El botón del input nativo lo rotula el navegador en su propio
              idioma ("Choose file") y no hay forma de traducirlo desde CSS.
              Se esconde el input —sin sacarlo del orden de tabulación— y el
              <label> hace de botón, con el anillo de foco vía `peer`. */}
          {/* El input y su <label> tienen que ser hermanos y en este orden:
              `peer-*` de Tailwind se apoya en el combinador `~`, que solo
              alcanza a hermanos posteriores. Anidando el label en un <div>
              el anillo de foco no llegaba. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <input
              id="cv"
              name="cv"
              type="file"
              required
              disabled={sending}
              accept={CAREERS.file.accept}
              onChange={handleFileChange}
              aria-describedby="cv-ayuda"
              className="peer sr-only"
            />
            <label
              htmlFor="cv"
              className="inline-flex min-h-11 cursor-pointer items-center border border-white/15 px-4 text-[11px] uppercase tracking-[0.24em] text-archo-cream transition-colors hover:border-archo-orange peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-archo-orange peer-disabled:opacity-50"
            >
              {CAREERS.file.buttonLabel}
            </label>
            <span className="min-w-0 break-all text-sm text-archo-mist">
              {fileName || CAREERS.file.emptyLabel}
            </span>
          </div>
          <p id="cv-ayuda" className="mt-3 text-xs text-archo-mist/70">
            {fileError || CAREERS.file.hint}
          </p>
        </div>
      </div>

      {/* Trampa para bots, fuera de pantalla y del orden de tabulación. */}
      <input
        type="text"
        name="empresa"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={sending}
        className="group mt-12 inline-flex min-h-11 items-center gap-4 border-b border-archo-cream pb-2 text-sm uppercase tracking-[0.24em] text-archo-cream transition-colors hover:border-archo-orange hover:text-archo-orange disabled:cursor-progress disabled:opacity-60"
      >
        {sending ? CAREERS.sendingLabel : CAREERS.submitLabel}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-6 text-sm ${status === 'error' ? 'text-archo-orange' : 'text-archo-mist'}`}
      >
        {status === 'sent'
          ? CAREERS.successMessage
          : status === 'error'
            ? CAREERS.errorMessage
            : ''}
      </p>
    </form>
  )
}
