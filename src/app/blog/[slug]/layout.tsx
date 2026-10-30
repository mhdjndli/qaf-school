import type { Metadata } from "next";
import { Amiri_Quran } from "next/font/google";
import { getPostBySlug } from "@/data/blog-posts";

const SITE_URL = "https://qafschool.com";

// Quranic Arabic (Uthmani marks, verse numbers) in the Markdown guides.
const amiriQuran = Amiri_Quran({
  variable: "--font-arabic",
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle ?? post.title,
    description: post.metaDescription,
    ...(post.keywords ? { keywords: post.keywords } : {}),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      locale: post.lang === "fr" ? "fr_CA" : "en_CA",
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.title,
      description: post.metaDescription,
      images: [
        post.imageHasText
          ? { url: post.image, width: 1600, height: 900, alt: post.imageAlt ?? post.title }
          : { url: post.image, width: 1200, height: 900, alt: post.title },
      ],
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.updated ?? post.date).toISOString(),
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const jsonLd = post
    ? [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          articleSection: post.category,
          ...(post.keywords ? { keywords: post.keywords.join(", ") } : {}),
          inLanguage: post.lang === "fr" ? "fr-CA" : "en-CA",
          description: post.metaDescription,
          image: post.imageHasText
            ? { "@type": "ImageObject", url: `${SITE_URL}${post.image}`, width: 1600, height: 900 }
            : `${SITE_URL}${post.image}`,
          datePublished: new Date(post.date).toISOString(),
          dateModified: new Date(post.updated ?? post.date).toISOString(),
          url: `${SITE_URL}/blog/${post.slug}`,
          author: {
            "@type": "Organization",
            name: "QAF School",
            url: SITE_URL,
          },
          publisher: { "@id": `${SITE_URL}/#school` },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
          ],
        },
        ...(post.faqs.length > 0
          ? [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: post.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ]
          : []),
      ]
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className={amiriQuran.variable}>{children}</div>
    </>
  );
}
