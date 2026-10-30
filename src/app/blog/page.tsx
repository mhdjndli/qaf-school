import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog · Islamic Parenting, Quran & Arabic Guides",
  alternates: { canonical: "/blog" },
  description:
    "Guides for Muslim parents from QAF School in Ottawa: choosing a school, Quran and Arabic for kids, duas, Ramadan ideas, apps compared, and Islamic parenting tips.",
};

const categoryId = (cat: string) =>
  cat.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Blog() {
  // Group every post after the featured one by category, largest topics first.
  const groups = new Map<string, typeof posts>();
  for (const post of posts.slice(1)) {
    groups.set(post.category, [...(groups.get(post.category) ?? []), post]);
  }
  const categories = [...groups.entries()].sort((x, y) => y[1].length - x[1].length);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            The QAF Blog
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Practical guides for Muslim parents from Ottawa&rsquo;s Islamic
            kindergarten: choosing a school, Quran and Arabic at home, Islamic
            parenting, and the apps and tools that actually help.
          </p>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href={`/blog/${posts[0].slug}`}
            className="grid md:grid-cols-2 gap-8 items-center mb-16 group"
          >
            <div className={`relative ${posts[0].imageHasText ? "aspect-video" : "aspect-[4/3]"} rounded-lg overflow-hidden shadow-lg`}>
              <Image
                src={posts[0].image}
                alt={posts[0].imageAlt ?? posts[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-orange-dark text-sm font-semibold uppercase tracking-wide">
                {posts[0].category}
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2 mb-4 text-text">
                {posts[0].title}
              </h2>
              <p className="text-text-light leading-relaxed mb-4 text-[0.95rem]">
                {posts[0].excerpt}
              </p>
              <p className="text-text-light/60 text-sm mb-5">{posts[0].date}</p>
              <span className="text-orange-dark font-semibold group-hover:underline">
                Read more &rarr;
              </span>
            </div>
          </Link>

          {/* BROWSE BY TOPIC */}
          <nav aria-label="Blog topics" className="flex flex-wrap justify-center gap-2 mb-14">
            {categories.map(([cat, list]) => (
              <a
                key={cat}
                href={`#${categoryId(cat)}`}
                className="px-4 py-2 rounded-full border border-card-line bg-warm-white text-sm font-medium text-text hover:border-orange hover:text-orange-dark transition-colors"
              >
                {cat} <span className="text-text-light/70">({list.length})</span>
              </a>
            ))}
          </nav>

          {categories.map(([cat, list]) => (
            <section key={cat} id={categoryId(cat)} className="mb-16 scroll-mt-24">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-text">{cat}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {list.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bg-warm-white rounded-lg border border-card-line overflow-hidden transition-colors hover:border-orange group"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={post.image}
                        alt={post.imageAlt ?? post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-xl font-bold mb-3 text-text">{post.title}</h3>
                      <p className="text-text-light text-[0.93rem] leading-relaxed mb-3 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-text-light/60 text-sm">{post.updated ?? post.date}</span>
                        <span className="text-orange-dark font-semibold text-sm group-hover:underline">
                          Read more &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">
            Ready to learn more about QAF?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            The best way to experience QAF is in person. Submit an inquiry and
            we&rsquo;ll invite you in to see our classroom.
          </p>
          <Link
            href="/inquiry"
            className="inline-block bg-white text-orange-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Submit Inquiry &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
