

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";

// const normalize = (value) =>
//   String(value || "")
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, " ")
//     .trim();

// const slides = [
//   {
//     id: 1,
//     image: "/img4.jpg",
//     title: "MONITOR III A.N.C.",
//     alt: "Marshall Monitor III A.N.C. headphones",
//     subtitle:
//       "Iconic sound. Active Noise Cancellation. Up to 70 hours of wireless playtime.",
//     search: "Monitor III",
//     matches: (name) => /\bmonitor\s+(iii|3)\b/.test(name),
//   },
//   {
//     id: 2,
//     image: "/B_Content_Mode_USE-C_3.webp",
//     title: "MARSHALL MODE C",
//     alt: "Marshall Mode USB-C earphones",
//     subtitle: "USB-C connectivity. Pure analog soul.",
//     search: "Mode C",
//     matches: (name) =>
//       /\bmode\s+(c|usb\s+c|type\s+c)\b/.test(name),
//   },
//   {
//     id: 3,
//     image:
//       "/marshall_acton-III_midnight-blue_lifestyle-product_1.jpg",
//     title: "ACTON III",
//     alt: "Marshall Acton III speaker in midnight blue",
//     subtitle: "Compact footprint. Massive soundscape.",
//     search: "Acton III",
//     matches: (name) => /\bacton\s+(iii|3)\b/.test(name),
//   },
//   {
//     id: 4,
//     image: "/eRAfpPgkCXYDy5vrBRPXEE.png",
//     title: "SONOS MOVE II",
//     alt: "Sonos Move portable speaker",
//     subtitle: "Portable brilliance. Smart connectivity.",
//     search: "Sonos Move",
//     matches: (name) =>
//       name.includes("sonos") &&
//       /\bmove\s+(ii|2)\b/.test(name),
//   },
//   {
//     id: 5,
//     image:
//       "https://www.robbreport.com.sg/wp-content/uploads/2025/07/Visual_Mania_150-Years_1_16-9.jpg",
//     title: "DEVIALET MANIA",
//     alt: "Devialet Mania portable speaker",
//     subtitle: "Metamorphic sound. Adapts to your space.",
//     search: "Devialet Mania",
//     matches: (name) =>
//       name.includes("devialet") && /\bmania\b/.test(name),
//   },
// ];

// export default function Hero() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [matchedProducts, setMatchedProducts] = useState({});

//   useEffect(() => {
//     let cancelled = false;

//     const fetchProducts = async () => {
//       try {
//         const { data } = await axiosInstance.get("/products");

//         const products = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.products)
//             ? data.products
//             : [];

//         const matches = {};

//         slides.forEach((slide) => {
//           const product = products.find(
//             (item) =>
//               item?._id &&
//               slide.matches(normalize(item.name))
//           );

//           if (product) {
//             matches[slide.id] = product;
//           }
//         });

//         if (!cancelled) {
//           setMatchedProducts(matches);
//         }
//       } catch (error) {
//         console.error("Error fetching hero products:", error);
//       }
//     };

//     fetchProducts();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide(
//         (previous) => (previous + 1) % slides.length
//       );
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section
//       aria-label="Featured products"
//       aria-roledescription="carousel"
//       className="relative w-full h-[60vh] md:h-[80vh] bg-black overflow-hidden"
//       style={{
//         fontFamily:
//           '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
//       }}
//     >
//       {slides.map((slide, index) => {
//         const isActive = index === currentSlide;
//         const product = matchedProducts[slide.id];

//         const destination = product
//           ? `/product/${product._id}`
//           : `/shop?search=${encodeURIComponent(slide.search)}`;

//         return (
//           <div
//             key={slide.id}
//             role="group"
//             aria-roledescription="slide"
//             aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
//             aria-hidden={!isActive}
//             inert={!isActive}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
//               isActive
//                 ? "opacity-100 z-10"
//                 : "opacity-0 z-0 pointer-events-none"
//             }`}
//           >
//             <div className="flex flex-col md:flex-row w-full h-full">
//               {/* Product image */}
//               <Link
//                 to={destination}
//                 aria-label={
//                   product
//                     ? `View ${product.name}`
//                     : `Browse ${slide.title}`
//                 }
//                 className="block w-full md:w-[60%] h-1/2 md:h-full relative shrink-0"
//               >
//                 <div
//                   aria-hidden="true"
//                   className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent z-10 md:bg-gradient-to-r md:from-transparent md:to-black pointer-events-none"
//                 />

//                 <img
//                   src={slide.image}
//                   alt={slide.alt}
//                   loading={index === 0 ? "eager" : "lazy"}
//                   fetchPriority={index === 0 ? "high" : "auto"}
//                   decoding="async"
//                   className="w-full h-full object-cover"
//                 />
//               </Link>

//               {/* Product text */}
//               <div className="w-full md:w-[40%] h-1/2 md:h-full flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 py-6 md:px-12 z-20 bg-black text-white">
//                 <h2 className="text-xl md:text-4xl font-sans font-bold uppercase mb-3 md:mb-4 tracking-tight leading-tight">
//                   {slide.title}
//                 </h2>

//                 <p className="text-gray-400 text-xs md:text-lg font-light mb-6 md:mb-8 leading-relaxed max-w-sm md:max-w-none">
//                   {slide.subtitle}
//                 </p>

//                 <Link
//                   to={destination}
//                   className="inline-flex items-center justify-center w-max px-6 py-2.5 md:px-8 md:py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#C8A253] hover:text-white transition-all duration-300"
//                 >
//                   {product ? "Shop Now" : "Browse Products"}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       {/* Navigation dots */}
//       <div className="absolute bottom-3 left-6 md:bottom-6 md:left-12 z-30 flex items-center gap-3">
//         {slides.map((slide, index) => (
//           <button
//             key={slide.id}
//             type="button"
//             aria-label={`Show ${slide.title}`}
//             aria-pressed={currentSlide === index}
//             onClick={() => setCurrentSlide(index)}
//             className="flex items-center justify-center min-w-6 min-h-6"
//           >
//             <span
//               aria-hidden="true"
//               className={`h-1.5 rounded-full transition-all duration-300 ${
//                 index === currentSlide
//                   ? "w-8 bg-white"
//                   : "w-2 bg-white/40"
//               }`}
//             />
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {
  HOME_CONTENT_DEFAULTS,
} from "../../utils/homeContentDefaults";

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// These rules stay in code so editing banner text does not
// change which product the banner opens.
const PRODUCT_RULES = [
  {
    id: 1,
    search: "Monitor III",
    matches: (name) => /\bmonitor\s+(iii|3)\b/.test(name),
  },
  {
    id: 2,
    search: "Mode C",
    matches: (name) =>
      /\bmode\s+(c|usb\s+c|type\s+c)\b/.test(name),
  },
  {
    id: 3,
    search: "Acton III",
    matches: (name) => /\bacton\s+(iii|3)\b/.test(name),
  },
  {
    id: 4,
    search: "Sonos Move",
    matches: (name) =>
      name.includes("sonos") &&
      /\bmove\s+(ii|2)\b/.test(name),
  },
  {
    id: 5,
    search: "Devialet Mania",
    matches: (name) =>
      name.includes("devialet") && /\bmania\b/.test(name),
  },
];

function getImageUrl(value, fallback) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  const url = value.trim();

  if (
    url.startsWith("/") &&
    !url.startsWith("//") &&
    !/[\\\s]/.test(url)
  ) {
    return url;
  }

  try {
    const parsed = new URL(url);

    if (
      parsed.protocol === "https:" &&
      !parsed.username &&
      !parsed.password
    ) {
      return url;
    }
  } catch {
    // Use the existing banner image.
  }

  return fallback;
}

function HeroImage({ slide, index }) {
  const [failed, setFailed] = useState(false);

  const src = failed
    ? slide.defaultImage
    : getImageUrl(slide.image, slide.defaultImage);

  return (
    <img
      src={src}
      alt={slide.alt}
      loading={index === 0 ? "eager" : "lazy"}
      fetchPriority={index === 0 ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover"
    />
  );
}

export default function Hero({ heroSlides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [matchedProducts, setMatchedProducts] = useState({});

  const slides = PRODUCT_RULES.map((rule) => {
    const defaultSlide =
      HOME_CONTENT_DEFAULTS.content.heroSlides.find(
        (slide) => slide.id === rule.id
      );

    const savedSlide = Array.isArray(heroSlides)
      ? heroSlides.find((slide) => slide.id === rule.id)
      : null;

    return {
      ...defaultSlide,
      ...savedSlide,
      ...rule,
      defaultImage: defaultSlide.image,
    };
  });

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

        const matches = {};

        PRODUCT_RULES.forEach((slide) => {
          const product = products.find(
            (item) =>
              item?._id &&
              slide.matches(normalize(item.name))
          );

          if (product) matches[slide.id] = product;
        });

        if (!cancelled) setMatchedProducts(matches);
      } catch (error) {
        console.error("Error fetching hero products:", error);
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (previous) => (previous + 1) % PRODUCT_RULES.length
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="Featured products"
      aria-roledescription="carousel"
      className="relative w-full h-[60vh] md:h-[80vh] bg-black overflow-hidden"
      style={{
        fontFamily:
          '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const product = matchedProducts[slide.id];

        const destination = product
          ? `/product/${product._id}`
          : `/shop?search=${encodeURIComponent(slide.search)}`;

        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            aria-hidden={!isActive}
            inert={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
              isActive
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="flex flex-col md:flex-row w-full h-full">
              <Link
                to={destination}
                aria-label={
                  product
                    ? `View ${product.name}`
                    : `Browse ${slide.title}`
                }
                className="block w-full md:w-[60%] h-1/2 md:h-full relative shrink-0"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent z-10 md:bg-gradient-to-r md:from-transparent md:to-black pointer-events-none"
                />

                <HeroImage
                  key={`${slide.id}:${slide.image}`}
                  slide={slide}
                  index={index}
                />
              </Link>

              <div className="w-full md:w-[40%] h-1/2 md:h-full flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 py-6 md:px-12 z-20 bg-black text-white">
                <h2 className="text-xl md:text-4xl font-sans font-bold uppercase mb-3 md:mb-4 tracking-tight leading-tight">
                  {slide.title}
                </h2>

                <p className="text-gray-400 text-xs md:text-lg font-light mb-6 md:mb-8 leading-relaxed max-w-sm md:max-w-none">
                  {slide.subtitle}
                </p>

                <Link
                  to={destination}
                  className="inline-flex items-center justify-center w-max px-6 py-2.5 md:px-8 md:py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#C8A253] hover:text-white transition-all duration-300"
                >
                  {product
                    ? slide.shopButtonText
                    : slide.browseButtonText}
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-3 left-6 md:bottom-6 md:left-12 z-30 flex items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.title}`}
            aria-pressed={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
            className="flex items-center justify-center min-w-6 min-h-6"
          >
            <span
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}