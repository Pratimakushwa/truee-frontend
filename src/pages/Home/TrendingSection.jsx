

import React, { useId } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y } from "swiper/modules";
import ProductCardPremium from "../../components/products/ProductCardPremium";

import "swiper/css";
import "swiper/css/navigation";

export default function TrendingSection({ products = [] }) {
  const sectionId = useId().replace(/:/g, "");
  const headingId = `featured-heading-${sectionId}`;
  const previousClass = `featured-prev-${sectionId}`;
  const nextClass = `featured-next-${sectionId}`;

  const seen = new Set();
  const displayProducts = Array.isArray(products)
    ? products.filter((product) => {
        if (!product?._id || seen.has(product._id)) return false;
        seen.add(product._id);
        return true;
      })
    : [];

  if (displayProducts.length === 0) return null;

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-white py-8 px-4 md:px-12 border-t border-gray-100 group relative font-sans"
      style={{
        fontFamily:
          '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line"
      />

      <div className="max-w-[1500px] mx-auto relative">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-4 h-[1px] bg-[#C8A253] inline-block"
              />
              Explore Truee
            </span>

            <h2
              id={headingId}
              className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#111] mb-2"
            >
              Discover Our Collection
            </h2>

            <p className="text-gray-500 text-[12px] sm:text-[13px] leading-relaxed max-w-md">
              Browse products from the Truee collection and explore
              their features, prices and availability.
            </p>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay, A11y]}
          spaceBetween={16}
          loop={displayProducts.length >= 6}
          watchOverflow
          allowTouchMove
          autoplay={
            displayProducts.length > 5
              ? {
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          navigation={{
            nextEl: `.${nextClass}`,
            prevEl: `.${previousClass}`,
          }}
          a11y={{
            prevSlideMessage: "Previous products",
            nextSlideMessage: "Next products",
          }}
          breakpoints={{
            320: { slidesPerView: 1.4, spaceBetween: 12 },
            480: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
          }}
          className="w-full !pb-2"
        >
          {displayProducts.map((product) => (
            <SwiperSlide key={product._id} className="h-auto">
              <ProductCardPremium
                product={product}
                variant="compact"
                className="h-full"
              />
            </SwiperSlide>
          ))}

          <button
            type="button"
            aria-label="Previous products"
            className={`${previousClass} hidden sm:flex absolute top-[45%] left-0 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity text-gray-700 hover:text-[#C8A253] cursor-pointer disabled:opacity-30`}
          >
            <span aria-hidden="true">&#8249;</span>
          </button>

          <button
            type="button"
            aria-label="Next products"
            className={`${nextClass} hidden sm:flex absolute top-[45%] right-0 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity text-gray-700 hover:text-[#C8A253] cursor-pointer disabled:opacity-30`}
          >
            <span aria-hidden="true">&#8250;</span>
          </button>
        </Swiper>
      </div>
    </section>
  );
}