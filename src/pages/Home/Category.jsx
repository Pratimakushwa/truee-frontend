

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// export default function CategoryShowcase() {
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("ALL");
//   const [loading, setLoading] = useState(true);

//   const getProductImg = (product) => {
//     if (product.variants?.[0]?.images?.[0]?.url) {
//       return product.variants[0].images[0].url;
//     }

//     if (product.images?.[0]?.url) {
//       return product.images[0].url;
//     }

//     return "https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image";
//   };

//   useEffect(() => {
//     let cancelled = false;

//     const fetchProducts = async () => {
//       try {
//         const { data } = await axiosInstance.get("/products");

//         if (!cancelled && data.success) {
//           setProducts(
//             Array.isArray(data.products) ? data.products : []
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching showcase products:", error);
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchProducts();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const formatPrice = (price) => {
//     if (price === undefined || price === null) return "";

//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   const availableBrands = [
//     "ALL",
//     ...new Set(
//       products
//         .map((product) => product.brand?.trim().toUpperCase())
//         .filter(Boolean)
//     ),
//   ];

//   const displayProducts = products
//     .filter(
//       (product) =>
//         activeCategory === "ALL" ||
//         product.brand?.trim().toUpperCase() === activeCategory
//     )
//     .slice(0, 5);

//   const renderProductCard = (product) => {
//     const name = product.name || product.category || "Product";
//     const originalPrice = Number(product.price) || 0;

//     // Existing pricing logic: discountPrice is the discount amount.
//     const discount = Number(product.discountPrice) || 0;
//     const finalPrice = originalPrice - discount;

//     const savePercent =
//       originalPrice > 0 && discount > 0
//         ? Math.round((discount / originalPrice) * 100)
//         : 0;

//     return (
//       <article className="relative bg-white shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full h-full rounded-2xl p-4 lg:p-5 flex flex-col group border border-transparent hover:border-[#c9a15a]/40 transition-all duration-300">
//         {savePercent > 0 && (
//           <span className="absolute top-3 left-3 z-10 bg-[#c9a15a] text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide pointer-events-none">
//             {savePercent}% Off
//           </span>
//         )}

//         <Link
//           to={`/product/${product._id}`}
//           className="w-full flex flex-1 flex-col items-start text-left cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
//         >
//           <span className="w-full h-[110px] lg:h-[130px] flex items-center justify-center mb-4 lg:mb-5">
//             <img
//               src={getProductImg(product)}
//               alt={name}
//               width={400}
//               height={400}
//               loading="lazy"
//               decoding="async"
//               className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
//             />
//           </span>

//           <h3 className="text-[11px] lg:text-[12px] font-extrabold text-[#111] tracking-wide uppercase leading-snug mb-1 line-clamp-2 min-h-[28px]">
//             {name}
//           </h3>

//           {finalPrice > 0 && (
//             <span className="text-[12px] lg:text-[13px] font-semibold text-[#a97c2f] mb-2">
//               {formatPrice(finalPrice)}
//             </span>
//           )}

//           <span
//             aria-hidden="true"
//             className="mt-auto self-end w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300"
//           >
//             <svg
//               width="13"
//               height="13"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M5 12h14" />
//               <path d="m12 5 7 7-7 7" />
//             </svg>
//           </span>
//         </Link>
//       </article>
//     );
//   };

//   return (
//     <section
//       aria-labelledby="home-brand-products-heading"
//       className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans"
//       style={{
//         fontFamily:
//           '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
//       }}
//     >
//       <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
//         <div className="flex flex-col items-center mb-8 md:mb-14">
//           <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] text-[#c9a15a] uppercase mb-2">
//             Explore Our Range
//           </span>

//           <h2
//             id="home-brand-products-heading"
//             className="text-2xl sm:text-3xl md:text-[32px] font-sans font-bold text-[#111] mb-2"
//           >
//             Explore Products by Brand
//           </h2>

//           <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-2xl leading-relaxed px-4">
//             Browse products from our available brands and select a
//             brand to explore its range.
//           </p>
//         </div>

//         <div
//           role="group"
//           aria-label="Filter products by brand"
//           className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-2 md:gap-4 mb-8 md:mb-14 relative pb-2 md:pb-4 px-2 md:px-0"
//         >
//           <div className="flex gap-2 md:gap-4 min-w-max">
//             {availableBrands.map((brandLabel) => (
//               <button
//                 key={brandLabel}
//                 type="button"
//                 aria-pressed={activeCategory === brandLabel}
//                 onClick={() => setActiveCategory(brandLabel)}
//                 className={`px-4 md:px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.12em] transition-all duration-300 uppercase shadow-sm cursor-pointer whitespace-nowrap ${
//                   activeCategory === brandLabel
//                     ? "bg-black text-white shadow-md"
//                     : "bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-100"
//                 }`}
//               >
//                 {brandLabel}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <div
//             role="status"
//             className="flex justify-center items-center h-48"
//           >
//             <div
//               aria-hidden="true"
//               className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"
//             />
//             <span className="sr-only">Loading products...</span>
//           </div>
//         ) : displayProducts.length > 0 ? (
//           <div className="w-full">
//             {/* Desktop grid */}
//             <div className="hidden md:grid grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5 w-full mb-10">
//               {displayProducts.map((product) => (
//                 <div key={product._id}>
//                   {renderProductCard(product)}
//                 </div>
//               ))}
//             </div>

//             {/* Mobile slider */}
//             <div className="block md:hidden w-full mb-6">
//               <Swiper
//                 key={activeCategory}
//                 modules={[Autoplay]}
//                 spaceBetween={16}
//                 slidesPerView={2.1}
//                 loop={displayProducts.length >= 4}
//                 autoplay={
//                   displayProducts.length > 2
//                     ? { delay: 3000, disableOnInteraction: false }
//                     : false
//                 }
//                 className="w-full pb-8 pt-2"
//               >
//                 {displayProducts.map((product) => (
//                   <SwiperSlide
//                     key={product._id}
//                     className="h-auto"
//                   >
//                     {renderProductCard(product)}
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           </div>
//         ) : (
//           <p className="py-10 text-center text-sm text-gray-500">
//             No products available to display right now.
//           </p>
//         )}

//         {!loading && (
//           <div className="flex justify-center w-full mt-2 md:mt-[-10px]">
//             <Link
//               to="/shop"
//               className="inline-flex items-center justify-center bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors shadow-lg"
//             >
//               Explore All Products
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function CategoryShowcase() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const getProductImg = (product) => {
    if (product.variants?.[0]?.images?.[0]?.url) {
      return product.variants[0].images[0].url;
    }

    if (product.images?.[0]?.url) {
      return product.images[0].url;
    }

    return "https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image";
  };

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("/products");

        if (!cancelled && data.success) {
          setProducts(
            Array.isArray(data.products) ? data.products : []
          );
        }
      } catch (error) {
        console.error("Error fetching showcase products:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const availableBrands = [
    "ALL",
    ...new Set(
      products
        .map((product) => product.brand?.trim().toUpperCase())
        .filter(Boolean)
    ),
  ];

  const displayProducts = products
    .filter(
      (product) =>
        activeCategory === "ALL" ||
        product.brand?.trim().toUpperCase() === activeCategory
    )
    .slice(0, 5);

  // Use the brand's original spelling in the collection URL.
  const selectedBrand =
    activeCategory === "ALL"
      ? ""
      : products
          .find(
            (product) =>
              product.brand?.trim().toUpperCase() === activeCategory
          )
          ?.brand?.trim() || "";

  const collectionUrl = selectedBrand
    ? `/shop?brand=${encodeURIComponent(selectedBrand)}`
    : "/shop";

  const renderProductCard = (product) => {
    const name = product.name || product.category || "Product";
    const originalPrice = Number(product.price) || 0;

    // Existing pricing logic: discountPrice is the discount amount.
    const discount = Number(product.discountPrice) || 0;
    const finalPrice = originalPrice - discount;

    const savePercent =
      originalPrice > 0 && discount > 0
        ? Math.round((discount / originalPrice) * 100)
        : 0;

    return (
      <article className="relative bg-white shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full h-full rounded-2xl p-4 lg:p-5 flex flex-col group border border-transparent hover:border-[#c9a15a]/40 transition-all duration-300">
        {savePercent > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-[#c9a15a] text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide pointer-events-none">
            {savePercent}% Off
          </span>
        )}

        <Link
          to={`/product/${product._id}`}
          className="w-full flex flex-1 flex-col items-start text-left cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <span className="w-full h-[110px] lg:h-[130px] flex items-center justify-center mb-4 lg:mb-5">
            <img
              src={getProductImg(product)}
              alt={name}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </span>

          <h3 className="text-[11px] lg:text-[12px] font-extrabold text-[#111] tracking-wide uppercase leading-snug mb-1 line-clamp-2 min-h-[28px]">
            {name}
          </h3>

          {finalPrice > 0 && (
            <span className="text-[12px] lg:text-[13px] font-semibold text-[#a97c2f] mb-2">
              {formatPrice(finalPrice)}
            </span>
          )}

          <span
            aria-hidden="true"
            className="mt-auto self-end w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </Link>
      </article>
    );
  };

  return (
    <section
      aria-labelledby="home-brand-products-heading"
      className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans"
      style={{
        fontFamily:
          '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 md:mb-14">
          <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] text-[#c9a15a] uppercase mb-2">
            Explore Our Range
          </span>

          <h2
            id="home-brand-products-heading"
            className="text-2xl sm:text-3xl md:text-[32px] font-sans font-bold text-[#111] mb-2"
          >
            Explore Products by Brand
          </h2>

          <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-2xl leading-relaxed px-4">
            Select a brand to preview its products, then explore
            the collection for more models and product details.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter products by brand"
          className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-2 md:gap-4 mb-8 md:mb-14 relative pb-2 md:pb-4 px-2 md:px-0"
        >
          <div className="flex gap-2 md:gap-4 min-w-max">
            {availableBrands.map((brandLabel) => (
              <button
                key={brandLabel}
                type="button"
                aria-pressed={activeCategory === brandLabel}
                onClick={() => setActiveCategory(brandLabel)}
                className={`px-4 md:px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.12em] transition-all duration-300 uppercase shadow-sm cursor-pointer whitespace-nowrap ${
                  activeCategory === brandLabel
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {brandLabel}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div
            role="status"
            className="flex justify-center items-center h-48"
          >
            <div
              aria-hidden="true"
              className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"
            />
            <span className="sr-only">Loading products...</span>
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="w-full">
            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5 w-full mb-10">
              {displayProducts.map((product) => (
                <div key={product._id}>
                  {renderProductCard(product)}
                </div>
              ))}
            </div>

            {/* Mobile slider */}
            <div className="block md:hidden w-full mb-6">
              <Swiper
                key={activeCategory}
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={2.1}
                loop={displayProducts.length >= 4}
                autoplay={
                  displayProducts.length > 2
                    ? { delay: 3000, disableOnInteraction: false }
                    : false
                }
                className="w-full pb-8 pt-2"
              >
                {displayProducts.map((product) => (
                  <SwiperSlide
                    key={product._id}
                    className="h-auto"
                  >
                    {renderProductCard(product)}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-gray-500">
            No products available to display right now.
          </p>
        )}

        {!loading && (
          <div className="flex justify-center w-full mt-2 md:mt-[-10px]">
            <Link
              to={collectionUrl}
              className="inline-flex items-center justify-center bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors shadow-lg"
            >
              {selectedBrand
                ? `Explore ${selectedBrand} Products`
                : "Explore All Products"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}