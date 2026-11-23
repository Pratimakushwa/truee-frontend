

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, A11y } from "swiper/modules";
import axiosInstance from "../../utils/axiosInstance";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    name: "Marshall Acton III",
    match: "acton iii",
    alt: "Marshall Acton III speaker in midnight blue",
    img: "https://images.ctfassets.net/javen7msabdh/5HyLwrtL1HN219DLTFaPdB/deb50333f7a2ce2d18e8d7c7a60cc797/acton_iii_midnight-blue_front_desktop-5_x2.jpg?w=1920&fm=avif&q=100",
  },
  {
    id: 2,
    name: "Marshall Bromley",
    match: "bromley",
    alt: "Marshall Bromley speaker",
    img: "https://shop.ash-asia.com/cdn/shop/files/TH_B_Content_Bromley_450_without_tab_4.jpg?v=1773305770&width=1000",
  },
  {
    id: 3,
    name: "Marshall Emberton",
    match: "emberton",
    alt: "Marshall Emberton speaker",
    img: "https://m.media-amazon.com/images/I/71chYP0sBrL._SL1500_.jpg",
  },
  {
    id: 4,
    name: "Marshall Willen",
    match: "willen",
    alt: "Marshall Willen portable speaker",
    img: "https://images.ctfassets.net/javen7msabdh/2jExiZ90H4brA24S1BdgrJ/b6a944ecbfba10f0d64ec796253c3e76/willen-10-hybrid.png?w=960&fm=avif&q=100",
  },
];

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [matchedProducts, setMatchedProducts] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchAndMatchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("/products");

        const products = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : Array.isArray(data?.data)
              ? data.data
              : [];

        const matches = {};

        slides.forEach((slide) => {
          const product = products.find((item) =>
            normalize(item.name).includes(slide.match)
          );

          if (product?._id) {
            matches[slide.id] = product;
          }
        });

        if (!cancelled) {
          setMatchedProducts(matches);
        }
      } catch (error) {
        console.error("Slider product matching failed:", error);
      }
    };

    fetchAndMatchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const goToSlide = (index) => {
    if (!swiperInstance || swiperInstance.destroyed) return;
    swiperInstance.slideToLoop(index);
  };

  const toggleAutoplay = () => {
    if (!swiperInstance || swiperInstance.destroyed) return;

    const autoplay = swiperInstance.autoplay;

    if (isPaused) {
      autoplay.start();

      if (autoplay.paused) {
        autoplay.resume();
      }

      setIsPaused(false);
    } else {
      autoplay.stop();
      setIsPaused(true);
    }
  };

  return (
    <div
      className="w-full"
      role="region"
      aria-label="Featured Marshall speakers"
    >
      <div className="relative w-full h-[230px] xs:h-[280px] sm:h-[360px] md:h-[350px] lg:h-[380px] xl:h-[380px] rounded-[12px] overflow-hidden bg-[#eee]">
        <Swiper
          modules={[EffectFade, Autoplay, A11y]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: false,
            pauseOnMouseEnter: false,
          }}
          allowTouchMove
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) =>
            setActiveIndex(swiper.realIndex)
          }
          onAutoplayStart={() => setIsPaused(false)}
          onAutoplayStop={() => setIsPaused(true)}
          className="w-full h-full"
        >
          {slides.map((slide, index) => {
            const product = matchedProducts[slide.id];

            const image = (
              <img
                src={slide.img}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover object-center transition-transform duration-[4500ms] ease-linear motion-reduce:transition-none ${
                  activeIndex === index
                    ? "scale-105"
                    : "scale-100"
                }`}
              />
            );

            return (
              <SwiperSlide key={slide.id}>
                {product ? (
                  <Link
                    to={`/product/${product._id}`}
                    aria-label={`View ${product.name}`}
                    tabIndex={activeIndex === index ? 0 : -1}
                    className="relative block w-full h-full cursor-pointer"
                  >
                    {image}
                  </Link>
                ) : (
                  <div className="relative w-full h-full">
                    {image}
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          type="button"
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Previous speaker"
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 text-black hover:bg-black hover:text-white transition-all bg-white rounded-full w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-[18px] sm:text-[20px] shadow-md cursor-pointer z-[20]"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <button
          type="button"
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Next speaker"
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 text-black hover:bg-black hover:text-white transition-all bg-white rounded-full w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-[18px] sm:text-[20px] shadow-md cursor-pointer z-[20]"
        >
          <span aria-hidden="true">›</span>
        </button>

        <button
          type="button"
          onClick={toggleAutoplay}
          disabled={!swiperInstance}
          aria-label={
            isPaused
              ? "Play automatic slideshow"
              : "Pause automatic slideshow"
          }
          className="absolute top-3 right-3 z-[20] rounded-full bg-black/60 text-white px-3 py-1.5 text-xs disabled:opacity-50"
        >
          {isPaused ? "Play" : "Pause"}
        </button>

        <div
          aria-hidden="true"
          className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/55 backdrop-blur-sm text-white text-[10px] sm:text-[11px] tracking-[0.15em] px-3 py-1 rounded-full z-[20]"
        >
          {String(activeIndex + 1).padStart(2, "0")}
          {" / "}
          {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      <div className="flex gap-2.5 sm:gap-3 md:gap-4 mt-3 sm:mt-4 overflow-x-auto no-scrollbar py-1 px-1">
        {slides.map((slide, index) => (
          <button
            key={`thumb-${slide.id}`}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Show ${slide.name}`}
            aria-pressed={activeIndex === index}
            className={`relative shrink-0 w-[68px] h-[50px] xs:w-[85px] xs:h-[62px] sm:w-[105px] sm:h-[76px] md:w-[120px] md:h-[86px] lg:w-[130px] lg:h-[90px] rounded-[8px] overflow-hidden transition-all duration-300 ${
              activeIndex === index
                ? "ring-2 ring-offset-2 ring-[#c9a15a]"
                : "ring-1 ring-offset-1 ring-gray-200 opacity-75 hover:opacity-100"
            }`}
          >
            <img
              src={slide.img}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center justify-center mt-3 sm:mt-4">
        {slides.map((slide, index) => (
          <button
            key={`dot-${slide.id}`}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Show ${slide.name}`}
            aria-pressed={activeIndex === index}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === index
                ? "w-2.5 h-2.5 bg-[#c9a15a]"
                : "w-1.5 h-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}