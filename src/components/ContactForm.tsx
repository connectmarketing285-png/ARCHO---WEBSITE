import { useState } from 'react'
import type { FormEvent } from 'react'

import { CONTACT } from '@/data/contact'
import { sendContactForm } from '@/lib/contact-form'

// Sin `outline-none`: el original lo usaba y dejaba los campos sin ningún
// indicador de foco. El anillo naranja de :focus-visible (index.css) se encarga.
const LABEL_CLASS =
  'col-span-4 text-[11px] uppercase tracking-[0.3em] text-archo-mist md:col-span-3'
const CONTROL_CLASS =
  'col-span-8 bg-transparent text-base text-archo-cream placeholder:text-archo-mist/40 focus-visible:text-archo-cream disabled:opacity-50 md:col-span-9'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const { fields, submitLabel, sendingLabel, successMessage, errorMessage } = CONTACT.form
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)

    // Trampa para bots: es invisible y ningún humano puede rellenarla, así que
    // si trae valor se descarta el envío fingiendo éxito, para no darle pistas.
    if (String(data.get('empresa') ?? '')) {
      setStatus('sent')
      form.reset()
      return
    }

    setStatus('sending')
    try {
      await sendContactForm({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        type: String(data.get('type') ?? ''),
        message: String(data.get('message') ?? ''),
      })
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <form className="border-t border-white/10" onSubmit={handleSubmit} noValidate={false}>
      {fields.map((field) => (
        <div
          key={field.id}
          className={`grid grid-cols-12 gap-4 border-b border-white/10 py-6 ${
            field.control === 'textarea' ? 'items-start' : 'items-center'
          }`}
        >
          <label
            htmlFor={field.id}
            className={field.control === 'textarea' ? `${LABEL_CLASS} mt-2` : LABEL_CLASS}
          >
            {field.label}
          </label>

          {field.control === 'textarea' ? (
            <textarea
              id={field.id}
              name={field.id}
              rows={field.rows}
              required
              disabled={sending}
              placeholder={field.placeholder}
              className={`${CONTROL_CLASS} resize-none`}
            />
          ) : (
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required
              disabled={sending}
              placeholder={field.placeholder}
              // El <input> desnudo mide 24px de alto: la fila es alta por su
              // padding, pero el área que responde al tap es solo el campo.
              className={`${CONTROL_CLASS} min-h-11 md:min-h-0`}
            />
          )}
        </div>
      ))}

      {/* Honeypot: fuera de pantalla y fuera del orden de tabulación, nunca lo
          ve ni lo enfoca una persona. aria-hidden lo oculta al lector. */}
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
        {sending ? sendingLabel : submitLabel}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-6 text-sm ${status === 'error' ? 'text-archo-orange' : 'text-archo-mist'}`}
      >
        {status === 'sent' ? successMessage : status === 'error' ? errorMessage : ''}
      </p>
    </form>
  )
}
