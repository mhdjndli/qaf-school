import type { Metadata } from "next";
import { getPostBySlug } from "@/data/blog-posts";

const SITE_URL = "https://qafschool.com";

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
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      locale: post.lang === "fr" ? "fr_CA" : "en_CA",
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.title,
      description: post.metaDescription,
      images: [{ url: post.image, width: 1200, height: 900, alt: post.title }],
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
          inLanguage: post.lang === "fr" ? "fr-CA" : "en-CA",
          description: post.metaDescription,
          image: `${SITE_URL}${post.image}`,
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
      {children}
    </>
  );
}
