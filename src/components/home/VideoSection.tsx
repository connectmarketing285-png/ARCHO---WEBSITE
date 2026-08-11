import Reveal from '@/components/Reveal'
import UnsplashImage from '@/components/UnsplashImage'
import { HOME } from '@/data/home'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { unsplashUrl } from '@/lib/unsplash'

/**
 * Prioridad móvil: el vídeo 1080p con autoplay es caro en datos y en iOS a
 * veces ni arranca. En móvil se sirve solo el poster; el <video> se monta a
 * partir de md: y nunca con prefers-reduced-motion, porque el brief pide
 * desactivar el autoplay en ese caso.
 */
export default function VideoSection() {
  const isDesktop = useMediaQuery('(min-width: 48rem)')
  const prefersReducedMotion = usePrefersReducedMotion()
  const showVideo = isDesktop && !prefersReducedMotion

  return (
    <section className="relative h-[90svh] min-h-[560px] w-full overflow-hidden bg-archo-black">
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={unsplashUrl(HOME.video.poster, 1200)}
        >
          <source src={HOME.video.src} type="video/mp4" />
        </video>
      ) : (
        <UnsplashImage
          id={HOME.video.poster}
          alt={HOME.video.posterAlt}
          sizes="100vw"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-archo-black/40 via-archo-black/30 to-archo-black" />
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
        <Reveal>
          <h2 className="font-display max-w-[20ch] text-balance text-4xl leading-[1.05] text-archo-cream md:text-6xl lg:text-7xl">
            {HOME.video.heading.lead}{' '}
            <span className="font-light italic text-archo-mist">{HOME.video.heading.accent}</span>
          </h2>
        </Reveal>
      </div>
    </section>
  )
}
