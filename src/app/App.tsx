import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Sun, Camera } from "lucide-react";

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1780849360619-3083196ffed2?w=900&h=680&fit=crop&auto=format",
    caption: "Our favorite checkered blanket",
    moment: "2:14 PM",
    category: "Picnic",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1772442187691-73fdcb4ad039?w=700&h=1050&fit=crop&auto=format",
    caption: "Shade and sea breeze",
    moment: "11:32 AM",
    category: "Picnic",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1771767435868-e3141980fcb1?w=900&h=680&fit=crop&auto=format",
    caption: "Green grass, golden sun",
    moment: "3:05 PM",
    category: "Park",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1768495964239-9e1af76f38fc?w=700&h=1050&fit=crop&auto=format",
    caption: "Palm shade and salt air",
    moment: "10:47 AM",
    category: "Beach",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1775441522525-55c3b19ed502?w=900&h=620&fit=crop&auto=format",
    caption: "High fives make everything better",
    moment: "1:20 PM",
    category: "Picnic",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1759672208180-c91d48d6ca5e?w=760&h=760&fit=crop&auto=format",
    caption: "Hidden in the forest",
    moment: "4:11 PM",
    category: "Picnic",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1780929667803-ba7b411e71cd?w=700&h=930&fit=crop&auto=format",
    caption: "Little explorer",
    moment: "12:08 PM",
    category: "Park",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1781166452592-31729fecfd67?w=900&h=520&fit=crop&auto=format",
    caption: "Laid out and ready for the feast",
    moment: "12:45 PM",
    category: "Picnic",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1615489548573-8165c2c35e1b?w=900&h=600&fit=crop&auto=format",
    caption: "Who can swing the highest?",
    moment: "10:15 AM",
    category: "Play",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1753958509932-9242283bcb45?w=900&h=600&fit=crop&auto=format",
    caption: "The slide champion",
    moment: "2:38 PM",
    category: "Play",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1777489689168-497290f235d5?w=900&h=634&fit=crop&auto=format",
    caption: "Tiny soccer stars",
    moment: "3:52 PM",
    category: "Play",
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1764853707499-8c22e35b2cd2?w=760&h=760&fit=crop&auto=format",
    caption: "Their secret summer hideout",
    moment: "5:00 PM",
    category: "Park",
  },
  {
    id: 13,
    url: "https://images.unsplash.com/photo-1777725234509-719115b3b26a?w=900&h=600&fit=crop&auto=format",
    caption: "Running wild through the park",
    moment: "4:29 PM",
    category: "Park",
  },
  {
    id: 14,
    url: "https://images.unsplash.com/photo-1749169491742-6e2b3381ec38?w=700&h=1050&fit=crop&auto=format",
    caption: "A beach day we won't forget",
    moment: "9:55 AM",
    category: "Beach",
  },
  {
    id: 15,
    url: "https://images.unsplash.com/photo-1636408244294-f0b1309f5422?w=700&h=1050&fit=crop&auto=format",
    caption: "Barefoot on the shore",
    moment: "11:10 AM",
    category: "Beach",
  },
];

const CATEGORIES = ["All", "Picnic", "Park", "Beach", "Play"] as const;
type Category = (typeof CATEGORIES)[number];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (globalIndex: number) => setLightboxIndex(globalIndex);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  const currentPhoto =
    lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border">
        {/* Decorative grain texture */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #D4893B22 0%, transparent 60%), radial-gradient(circle at 80% 20%, #C26A4222 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-12">
          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <Sun size={14} className="text-accent" />
            <span
              className="text-xs tracking-widest uppercase text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Summer 2024 · The Hargrove Family
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-6xl md:text-8xl font-semibold leading-none mb-3 text-foreground"
            style={{ fontFamily: "'Fraunces', serif", fontOpticalSizing: "auto" as never }}
          >
            Summer
            <br />
            <em className="font-light" style={{ color: "var(--primary)" }}>
              Outing
            </em>
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <p className="text-base text-muted-foreground max-w-xs leading-relaxed">
              June 14–15 · Riverside Park & Clearwater Beach. Fifteen memories
              from two perfect days under the sun.
            </p>
            <div
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <Camera size={12} />
              <span>{photos.length} photographs</span>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="max-w-6xl mx-auto px-6 pb-0">
          <div className="flex gap-1 border-t border-border pt-4 overflow-x-auto pb-px scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={[
                  "px-4 py-2 text-sm rounded-none transition-colors whitespace-nowrap relative",
                  activeCategory === cat
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem" }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Masonry Gallery */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
            style={{ columnGap: "1rem" }}
          >
            {filtered.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
                className="break-inside-avoid mb-4 group relative cursor-pointer overflow-hidden bg-muted"
                onClick={() => openLightbox(idx)}
                style={{ borderRadius: "2px" }}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full block object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p
                    className="text-white text-sm leading-snug font-medium"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {photo.caption}
                  </p>
                  <span
                    className="text-white/60 text-xs mt-1"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {photo.category} · {photo.moment}
                  </span>
                </div>

                {/* Category tag */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span
                    className="bg-primary/90 text-primary-foreground text-xs px-2 py-0.5"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em", borderRadius: "1px" }}
                  >
                    {photo.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Count */}
        <div
          className="mt-4 text-xs text-muted-foreground text-right"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {filtered.length} of {photos.length} photos
        </div>
      </main>

      {/* Closing quote */}
      <footer className="border-t border-border mt-6">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <blockquote className="max-w-sm">
            <p
              className="text-2xl md:text-3xl leading-snug text-foreground"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
            >
              "The days we almost didn&apos;t go are always the ones we talk
              about the most."
            </p>
          </blockquote>
          <div
            className="text-xs text-muted-foreground space-y-1"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <div>Hargrove Family Archive</div>
            <div>Summer 2024</div>
            <div className="flex items-center gap-1 mt-2">
              <Sun size={11} className="text-accent" />
              <span>15 memories · 2 days</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentPhoto && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={22} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="relative max-w-4xl w-full mx-16 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentPhoto.url.replace(/w=\d+&h=\d+/, "w=1400&h=900")}
                alt={currentPhoto.caption}
                className="max-h-[75vh] w-auto object-contain"
                style={{ borderRadius: "2px" }}
              />
              <div className="mt-4 text-center">
                <p
                  className="text-white text-lg"
                  style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
                >
                  {currentPhoto.caption}
                </p>
                <p
                  className="text-white/50 text-xs mt-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {currentPhoto.category} · {currentPhoto.moment} ·{" "}
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
