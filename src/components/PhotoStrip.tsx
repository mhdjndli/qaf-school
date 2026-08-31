"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PHOTOS = [
  { src: "/gallery/IMG_3075.jpg", alt: "Bright classroom with a green and white balloon arch, child-sized tables, and Montessori shelves" },
  { src: "/gallery/IMG_3078.jpg", alt: "Open play area with activity tables, a climbing triangle with slide, and a play kitchen" },
  { src: "/gallery/IMG_3076.jpg", alt: "Arabic alphabet wall display beside the class schedule and school calendar board" },
  { src: "/gallery/IMG_3077.jpg", alt: "Classroom with child-sized tables, whiteboard, and a dinosaur growth chart on the wall" },
  { src: "/gallery/IMG_3080.jpg", alt: "Learning room with whiteboard, felt wall organizers, and shelves of books and materials" },
  { src: "/gallery/IMG_3081.jpg", alt: "Reading corner with a book display, tambourine, and alphabet rug" },
  { src: "/gallery/IMG_3083.jpg", alt: "Cozy circle-time room with a colourful alphabet rug and wall-mounted whiteboard" },
  { src: "/gallery/IMG_3082.jpg", alt: "Circle-time room with alphabet rug, book shelf, and bright windows" },
  { src: "/gallery/IMG_3079.jpg", alt: "Globe and balloons on a sunny classroom windowsill" },
  { src: "/gallery/IMG_3084.jpg", alt: "Meeting room with a round glass table where parents meet our team" },
  { src: "/gallery/IMG_3086.jpg", alt: "View of the private green lawn outside the school windows" },
  { src: "/gallery/IMG_3087.jpg", alt: "Bright hallway windows overlooking the outdoor green space" },
  { src: "/gallery/IMG_3085.jpg", alt: "Door leading directly to the fenced outdoor play lawn" },
];

export default function PhotoStrip() {
  const [idx, setIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = thumbsRef.current;
    const active = strip?.children[idx] as HTMLElement | undefined;
    if (!strip || !active) return;
    const target =
      active.offsetLeft - strip.clientWidth / 2 + active.offsetWidth / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, [idx]);

  const prev = () => setIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
  const next = () => setIdx((i) => (i + 1) % PHOTOS.length);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-lg text-orange-dark text-xl md:text-2xl flex items-center justify-center transition-all hover:bg-orange hover:text-white hover:scale-105";

  return (
    <section className="py-10 md:py-14 bg-warm-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text">
            Step Inside QAF
          </h2>
          <p className="text-text-light mt-2">
            A peek at the bright, purposeful spaces your child will learn in every day.
          </p>
        </div>

        {/* Main stage */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-xl bg-border"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (dx > 40) prev();
            else if (dx < -40) next();
            setTouchStartX(null);
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {PHOTOS.map((img, i) => (
              <div key={i} className="relative w-full shrink-0 aspect-[4/3] md:aspect-[16/10]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 976px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          <button type="button" aria-label="Previous photo" onClick={prev} className={`${arrowClass} left-3 md:left-4`}>
            &larr;
          </button>
          <button type="button" aria-label="Next photo" onClick={next} className={`${arrowClass} right-3 md:right-4`}>
            &rarr;
          </button>

          <span className="absolute bottom-3 right-4 z-10 bg-black/50 text-white text-xs md:text-sm px-3 py-1 rounded-full tabular-nums">
            {idx + 1} / {PHOTOS.length}
          </span>
        </div>

        {/* Thumbnails */}
        <div ref={thumbsRef} className="flex gap-2.5 overflow-x-auto mt-4 pb-2 [scrollbar-width:thin]">
          {PHOTOS.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show photo ${i + 1}: ${img.alt}`}
              onClick={() => setIdx(i)}
              className={`relative w-20 md:w-24 aspect-[4/3] shrink-0 rounded-lg overflow-hidden transition-all ${
                i === idx
                  ? "ring-2 ring-orange ring-offset-2 ring-offset-warm-white"
                  : "opacity-55 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
