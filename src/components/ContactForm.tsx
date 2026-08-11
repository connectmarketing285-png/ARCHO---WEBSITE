import type { FormEvent } from 'react'

import { CONTACT } from '@/data/contact'

const LABEL_CLASS =
  'col-span-4 text-[11px] uppercase tracking-[0.3em] text-archo-mist md:col-span-3'
const CONTROL_CLASS =
  'col-span-8 bg-transparent text-base text-archo-cream outline-none placeholder:text-archo-mist/40 focus-visible:text-archo-cream md:col-span-9'

export default function ContactForm() {
  const { fields, submitLabel } = CONTACT.form

  /**
   * El original no tiene backend: el formulario valida y no envía a ningún
   * lado. Se replica ese comportamiento tal cual.
   *
   * `preventDefault` es necesario aunque no haya envío: sin él el navegador
   * haría un GET a la propia ruta con los campos en la query y recargaría la
   * SPA entera.
   *
   * TODO: cuando el cliente decida el destino (función de Vercel + Resend,
   * Formspree o similar), el POST entra aquí y es el único punto a tocar.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form className="border-t border-white/10" onSubmit={handleSubmit}>
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
              placeholder={field.placeholder}
              className={`${CONTROL_CLASS} resize-none`}
            />
          ) : (
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required
              placeholder={field.placeholder}
              className={CONTROL_CLASS}
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="group mt-12 inline-flex min-h-11 items-center gap-4 border-b border-archo-cream pb-2 text-sm uppercase tracking-[0.24em] text-archo-cream transition-colors hover:border-archo-orange hover:text-archo-orange"
      >
        {submitLabel}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  )
}
