import { RESPONSIVE_WIDTHS, unsplashSrcSet, unsplashUrl } from '@/lib/unsplash'

type UnsplashImageProps = {
  /** ID de la foto, p. ej. photo-1487958449943-2429e8be8625 */
  id: string
  alt: string
  /** Atributo `sizes`. Sin él el navegador asume 100vw y baja de más en móvil. */
  sizes: string
  widths?: readonly number[]
  className?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export default function UnsplashImage({
  id,
  alt,
  sizes,
  widths = RESPONSIVE_WIDTHS,
  className,
  loading = 'lazy',
  fetchPriority,
}: UnsplashImageProps) {
  return (
    <img
      // src es el fallback para navegadores sin srcset; se apunta al ancho medio.
      src={unsplashUrl(id, widths[1] ?? widths[0])}
      srcSet={unsplashSrcSet(id, widths)}
      sizes={sizes}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={className}
    />
  )
}
