import PostCard from '@/components/blog/PostCard'
import PageIntro from '@/components/PageIntro'
import Reveal from '@/components/Reveal'
import { BLOG_PAGE, POSTS } from '@/data/blog'

/** El listado del blog, del artículo más reciente al más antiguo. */
export default function Blog() {
  return (
    <div className="bg-archo-black pt-32 md:pt-44">
      <PageIntro eyebrow={BLOG_PAGE.eyebrow} title={BLOG_PAGE.title} lede={BLOG_PAGE.lede} />

      <section className="mt-24 px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-[1600px] space-y-16 md:space-y-20">
          {POSTS.length === 0 ? (
            <p className="border-t border-white/10 pt-10 text-base text-archo-mist">{BLOG_PAGE.vacio}</p>
          ) : (
            POSTS.map((post, index) => (
              <Reveal key={post.slug}>
                <PostCard post={post} priority={index === 0} />
              </Reveal>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
