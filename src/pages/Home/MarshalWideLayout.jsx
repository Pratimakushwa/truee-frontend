

import React, { useState, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";

import "swiper/css";

const bannerImages = {
  middleton:
    "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
  minorIV:
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png",
};

const youtubeVideos = [
  {
    id: "C6Mx6BWcSMo",
    title: "Marshall Minor III Video",
    badge: "MINOR III",
  },
  {
    id: "baITH2OP6tk",
    title: "Marshall Emberton II Video",
    badge: "EMBERTON II",
  },
  {
    id: "SNaTiQE_1To",
    title: "Marshall Middleton Video",
    badge: "MIDDLETON",
  },
  {
    id: "g7fvhCyrqBo",
    title: "Marshall Stanmore III Video",
    badge: "STANMORE III",
  },
  {
    id: "seYkKOGqAUM",
    title: "Marshall Willen II Video",
    badge: "WILLEN II",
  },
];

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function MarshallWideLayout() {
  const [minorProduct, setMinorProduct] = useState(null);
  const [middletonProduct, setMiddletonProduct] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const bannersHeadingId = useId();
  const videosHeadingId = useId();

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("/products");

        const products = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];

        const minorIV = products.find((product) => {
          const name = normalize(product.name);
          return /\bminor\s+(iv|4)\b/.test(name);
        });

        const middleton = products.find((product) => {
          const name = normalize(product.name);

          return (
            /\bmiddleton\b/.test(name) &&
            !/\bmiddleton\s+(ii|2)\b/.test(name)
          );
        });

        if (!cancelled) {
          // Never substitute an unrelated product.
          setMinorProduct(minorIV?._id ? minorIV : null);
          setMiddletonProduct(
            middleton?._id ? middleton : null
          );
        }
      } catch (error) {
        console.error(
          "Error fetching Marshall banner products:",
          error
        );
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const banners = [
    {
      id: "middleton",
      title: "Marshall Middleton",
      subtitle: "Explore the Marshall Middleton speaker.",
      image: bannerImages.middleton,
      alt: "Marshall Middleton speaker in a lifestyle setting",
      product: middletonProduct,
      fallbackUrl: "/shop?search=Middleton",
    },
    {
      id: "minor-iv",
      title: "Marshall Minor IV",
      subtitle: "Explore Marshall Minor IV wireless earbuds.",
      image: bannerImages.minorIV,
      alt: "Marshall Minor IV wireless earbuds",
      product: minorProduct,
      fallbackUrl: "/shop?search=Minor%20IV",
    },
  ];

  const playVideo = (id) => {
    setPlayingId(id);
  };

  return (
    <div
      className="w-full bg-white flex flex-col items-center justify-center py-6 px-3 sm:px-4 md:px-6"
      style={{
        fontFamily:
          '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Product banners */}
      <section
        aria-labelledby={bannersHeadingId}
        className="w-full max-w-[1400px] mx-auto"
      >
        <h2 id={bannersHeadingId} className="sr-only">
          Explore Marshall Speakers and Earbuds
        </h2>

        <div className="relative w-full flex flex-col md:flex-row items-stretch justify-center gap-5 sm:gap-6 md:gap-[50px] lg:gap-[70px]">
          {banners.map((banner) => (
            <article
              key={banner.id}
              className="relative w-full flex-1 h-[280px] xs:h-[320px] sm:h-[380px] md:h-[380px] rounded-2xl overflow-hidden shadow-sm group"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
              />

              <span className="absolute top-4 left-4 sm:top-5 sm:left-5 text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-black text-white">
                Explore Marshall
              </span>

              <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-5 sm:px-7 md:px-8 z-10 max-w-[80%]">
                <h3
                  className="text-white text-[14px] xs:text-[18px] sm:text-[22px] md:text-[24px] leading-[1.1] mb-3"
                  style={{ fontWeight: 600 }}
                >
                  {banner.title}
                </h3>

                <div
                  aria-hidden="true"
                  className="w-8 h-[2px] bg-[#c9a15a] mb-3"
                />

                <p className="text-white/85 text-[12px] sm:text-[13px] leading-[1.6] mb-5">
                  {banner.subtitle}
                </p>

                <Link
                  to={
                    banner.product
                      ? `/product/${banner.product._id}`
                      : banner.fallbackUrl
                  }
                  aria-label={
                    banner.product
                      ? `View ${banner.product.name}`
                      : `Browse ${banner.title} products`
                  }
                  className="group/btn bg-black text-white px-5 sm:px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap inline-flex items-center gap-2 w-fit rounded-[4px]"
                >
                  {banner.product
                    ? "View Product"
                    : "Browse Products"}

                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Videos */}
      <section
        aria-labelledby={videosHeadingId}
        className="w-full max-w-[1400px] mx-auto mt-14 mb-2 relative group"
      >
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#a97c2f] uppercase mb-2">
            Discover Before You Buy
          </p>

          <h2
            id={videosHeadingId}
            className="text-2xl sm:text-3xl md:text-[32px] text-black mb-3"
            style={{ fontWeight: 600 }}
          >
            Marshall Product Videos
          </h2>

          <div
            aria-hidden="true"
            className="flex items-center justify-center gap-2"
          >
            <span className="w-8 sm:w-10 h-[1px] bg-[#c9a15a]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a15a]" />
            <span className="w-8 sm:w-10 h-[1px] bg-[#c9a15a]" />
          </div>
        </div>

        <Swiper
          modules={[A11y]}
          onSwiper={setSwiperInstance}
          onSlideChange={() => setPlayingId(null)}
          spaceBetween={20}
          slidesPerView={1}
          grabCursor
          allowTouchMove
          loop
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 50 },
            1024: { slidesPerView: 2, spaceBetween: 70 },
          }}
          className="w-full pb-0"
        >
          {youtubeVideos.map((video) => {
            const isPlaying = playingId === video.id;

            return (
              <SwiperSlide
                key={video.id}
                style={{ height: "auto" }}
              >
                <article className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                  <div className="relative w-full aspect-video bg-black overflow-hidden">
                    {isPlaying ? (
                      <iframe
                        className="absolute inset-0 w-full h-full border-0"
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => playVideo(video.id)}
                        aria-label={`Play ${video.title}`}
                        className="absolute inset-0 w-full h-full cursor-pointer group/thumb"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt=""
                          width={480}
                          height={360}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                        />

                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-black/25"
                        />

                        <span
                          aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="w-14 h-14 rounded-full bg-black/70 text-white flex items-center justify-center text-xl">
                            ▶
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 text-white font-black text-[20px] sm:text-[26px] tracking-tight opacity-90 leading-none text-right z-10"
                        >
                          {video.badge}
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#111] leading-snug mb-4">
                      {video.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setPlayingId(
                            isPlaying ? null : video.id
                          )
                        }
                        aria-label={
                          isPlaying
                            ? `Close ${video.title}`
                            : `Play ${video.title}`
                        }
                        className="inline-flex items-center gap-1.5 border border-[#e2c88a] text-[#a97c2f] text-[10px] sm:text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full hover:bg-[#f6ede0] transition-colors"
                      >
                        {isPlaying ? "Close Video" : "Watch Video"}
                      </button>

                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch ${video.title} on YouTube, opens in a new tab`}
                        className="text-xs text-gray-600 underline hover:text-black"
                      >
                        Open on YouTube
                      </a>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
          <button
            type="button"
            aria-label="Previous product videos"
            onClick={() => swiperInstance?.slidePrev()}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all z-20 cursor-pointer text-black"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <button
            type="button"
            aria-label="Next product videos"
            onClick={() => swiperInstance?.slideNext()}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#c9a15a] rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all z-20 cursor-pointer text-white"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>
    </div>
  );
}