"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";

const CircularGallery = dynamic(() => import("@/src/components/CircularGallery/CircularGallery"), {
  ssr: false,
});

interface Photo {
  id: string;
  url: string;
  caption: string | null;
  location: string | null;
  region: string;
  createdAt: string;
}

interface PhotosByRegion {
  [region: string]: Photo[];
}

export default function PhotosPage() {
  const t = useTranslations("photos");
  const [photosByRegion, setPhotosByRegion] = useState<PhotosByRegion>({});
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/photos");
        const data = await res.json();
        const grouped: PhotosByRegion = {};
        for (const photo of data.photos) {
          if (!grouped[photo.region]) {
            grouped[photo.region] = [];
          }
          grouped[photo.region].push(photo);
        }
        setPhotosByRegion(grouped);
        setRegions(data.regions || []);
      } catch (err) {
        console.error("Failed to fetch photos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  const scrollToRegion = (region: string) => {
    setActiveRegion(region);
    const el = document.getElementById(`region-${region}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen relative z-10">
      <LanguageSwitcher />
      {/* Main content — desktop: left padding so tree bg shows; mobile: full width */}
      <div className="mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-250">
        {/* Header */}
        <header className="px-8 max-[767px]:px-5 pt-10 pb-6">
          <Link
            href="/"
            className="inline-block text-sm text-ash hover:text-carbon transition-colors mb-8  max-[767px]:hidden"
          >
            {t("back")}
          </Link>

          <h1 className="italic font-serif text-4xl max-[767px]:text-3xl font-normal tracking-tight text-carbon">
            {t("title")}
          </h1>
          <p className="mt-2 text-ash text-sm font-serif italic">
            {t("subtitle")}
          </p>
        </header>

        {/* Region Tags */}
        {regions.length > 0 && (
          <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-enamel">
            <div className="px-8 max-[767px]:px-5">
              <div className="flex items-center gap-3 py-3 overflow-x-auto">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => scrollToRegion(region)}
                    className={`px-3 py-1 text-xs font-serif whitespace-nowrap transition-all border ${
                      activeRegion === region
                        ? "border-amber text-amber bg-amber/5"
                        : "border-enamel text-smoke hover:border-ash hover:text-carbon"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}

        {/* Content */}
        <main className="px-8 max-[767px]:px-5 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <div className="w-5 h-5 border border-ash border-t-transparent rounded-full animate-spin" />
              <p className="text-ash text-sm font-serif">{t("loading")}</p>
            </div>
          ) : regions.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("empty")}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-24">
              {regions.map((region) => {
                const photos = photosByRegion[region] || [];
                const galleryItems = photos.map((p) => ({
                  image: p.url,
                  text: p.caption || p.location || "",
                }));

                return (
                  <section key={region} id={`region-${region}`} className="scroll-mt-20">
                    {/* Region Title */}
                    <div className="flex items-baseline gap-4 mb-6">
                      <h2 className="font-serif text-2xl max-[767px]:text-xl text-carbon tracking-tight">
                        {region}
                      </h2>
                      <span className="text-xs text-cement font-serif">{photos.length} {t("photos_count")}</span>
                      <div className="flex-1 h-px bg-enamel" />
                    </div>

                    {/* Gallery */}
                    <div className="w-full h-87.5 sm:h-105 md:h-112.5 lg:h-120 rounded-sm overflow-hidden bg-[#f7f7f5]">
                      {galleryItems.length > 0 ? (
                        <CircularGallery
                          items={galleryItems}
                          bend={3}
                          textColor="#444444"
                          borderRadius={0.03}
                          font="italic 22px Georgia"
                          scrollSpeed={2}
                          scrollEase={0.05}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-cement text-sm font-serif italic">{t("gallery_empty")}</p>
                        </div>
                      )}
                    </div>

                    {/* Hint */}
                    <p className="text-[11px] text-cement mt-2 font-serif italic text-right">
                      {t("drag_hint")}
                    </p>
                  </section>
                );
              })}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-enamel mt-16">
          <div className="px-8 max-[767px]:px-5 py-6">
            <p className="text-[11px] text-cement font-serif">
              {Object.values(photosByRegion).flat().length} {t("photos_count")} &middot; {regions.length} {t("places_count")}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
