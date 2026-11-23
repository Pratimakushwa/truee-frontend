

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// // Price formatting
// const formatPrice = (price) => {
//   if (!price || price === 0) return "Price on Request";

//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// // Product image
// const getProductImg = (product) => {
//   if (product?.images?.[0]?.url) {
//     return product.images[0].url;
//   }

//   if (product?.variants?.[0]?.images?.[0]?.url) {
//     return product.variants[0].images[0].url;
//   }

//   return "https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image";
// };

// // Category link
// const getShopUrl = (category) =>
//   typeof category === "string" && category.trim()
//     ? `/shop?category=${encodeURIComponent(category)}`
//     : "/shop";

// // Icons
// const Icon = ({ children }) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     aria-hidden="true"
//     className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     {children}
//   </svg>
// );

// const BagIcon = () => (
//   <Icon>
//     <path d="M6 8h12l-1 12H7L6 8Z" />
//     <path d="M9 8V6a3 3 0 0 1 6 0v2" />
//   </Icon>
// );

// const PickupIcon = () => (
//   <Icon>
//     <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
//     <path d="M2 7h20l-2 5H4L2 7Z" />
//     <path d="M12 7V4" />
//     <path d="M9 4h6" />
//   </Icon>
// );

// const StarIcon = () => (
//   <Icon>
//     <path d="M12 2.5 15 9l7 1-5 5 1.2 7L12 18.5 5.8 22 7 15 2 10l7-1 3-6.5Z" />
//   </Icon>
// );

// const CartIcon = () => (
//   <Icon>
//     <circle cx="9" cy="21" r="1" />
//     <circle cx="19" cy="21" r="1" />
//     <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
//   </Icon>
// );

// const ArrowIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     aria-hidden="true"
//     className="w-3.5 h-3.5"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M5 12h14" />
//     <path d="m12 5 7 7-7 7" />
//   </svg>
// );

// const cardClassName =
//   "group bg-white flex flex-col h-full rounded-2xl shadow-sm border border-gray-200 transition-all duration-300 overflow-hidden hover:border-[#c9a15a] hover:shadow-lg";

// // Card heading
// const CardHeader = ({ icon, title }) => (
//   <div className="flex items-center gap-2 px-4 py-3 sm:px-5 rounded-t-2xl">
//     <span className="text-[#a97c2f]">{icon}</span>

//     <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] flex-1 truncate">
//       {title}
//     </h3>

//     <span className="text-gray-400">
//       <ArrowIcon />
//     </span>
//   </div>
// );

// // Card footer link
// const CardFooter = ({ category }) => (
//   <div className="bg-white px-4 pb-2 mt-auto">
//     <Link
//       to={getShopUrl(category)}
//       aria-label={
//         category ? `Explore more ${category} products` : "Explore more products"
//       }
//       className="group flex w-full items-center justify-between bg-[#F8F5F2] hover:bg-[#F2ECE6] transition-all duration-300 px-5 py-3.5 rounded-lg text-[12px] sm:text-[13px] font-medium text-[#1a1a1a]"
//     >
//       See more
//       <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#a97c2f]">
//         <ArrowIcon />
//       </span>
//     </Link>
//   </div>
// );

// // Four-product card
// const GridCard = ({ title, icon, products, category }) => {
//   const displayProducts = products.slice(0, 4);

//   return (
//     <div className={cardClassName}>
//       <CardHeader icon={icon} title={title} />

//       {displayProducts.length > 0 ? (
//         <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-4 p-4 flex-1">
//           {displayProducts.map((product) => {
//             const name = product.name || "Product";
//             const basePrice = Number(product.price) || 0;
//             const finalPrice = basePrice
//               ? basePrice - (Number(product.discountPrice) || 0)
//               : 0;

//             return (
//               <Link
//                 key={product._id}
//                 to={`/product/${product._id}`}
//                 className="flex flex-col cursor-pointer group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
//               >
//                 <div className="bg-[#f8f8f8] rounded-lg p-2 flex items-center justify-center h-[90px] xs:h-[100px] sm:h-[110px] md:h-[120px] mb-2 overflow-hidden">
//                   <img
//                     src={getProductImg(product)}
//                     alt={name}
//                     width={400}
//                     height={400}
//                     loading="lazy"
//                     decoding="async"
//                     className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>

//                 <h4 className="text-[11px] sm:text-[12px] text-[#0F1111] line-clamp-1 group-hover:text-black">
//                   {name}
//                 </h4>

//                 <span className="text-[13px] sm:text-[14px] font-semibold text-[#c9a15a]">
//                   {formatPrice(finalPrice)}
//                 </span>
//               </Link>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-sm text-gray-400 p-6">
//           No products found
//         </div>
//       )}

//       <CardFooter category={category} />
//     </div>
//   );
// };

// // Single-product card with variant previews
// const VariantCard = ({ title, icon, product }) => {
//   const [activeVariantIdx, setActiveVariantIdx] = useState(0);

//   if (!product) return null;

//   const name = product.name || "Product";
//   const variants = Array.isArray(product.variants)
//     ? product.variants
//     : [];

//   const activeVariant = variants[activeVariantIdx];

//   const mainImage =
//     activeVariant?.images?.[0]?.url || getProductImg(product);

//   const basePrice = Number(product.price) || 0;
//   const discount = Number(product.discountPrice) || 0;
//   const finalPrice = basePrice - discount;

//   return (
//     <div className={cardClassName}>
//       <CardHeader icon={icon} title={title} />

//       <div className="flex-1 flex flex-col p-4 sm:p-5">
//         <Link
//           to={`/product/${product._id}`}
//           className="flex flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
//         >
//           <div className="bg-[#f8f8f8] rounded-lg p-3 sm:p-4 flex items-center justify-center h-[150px] xs:h-[170px] sm:h-[190px] md:h-[200px] mb-3 overflow-hidden">
//             <img
//               src={mainImage}
//               alt={
//                 activeVariant?.color
//                   ? `${name} - ${activeVariant.color}`
//                   : name
//               }
//               width={400}
//               height={400}
//               loading="lazy"
//               decoding="async"
//               className="max-h-full max-w-full object-contain mix-blend-multiply"
//             />
//           </div>

//           <h4 className="text-[13px] sm:text-[14px] text-[#0F1111] line-clamp-2 mb-1 hover:text-[#c45500]">
//             {name}
//           </h4>

//           <div className="flex items-center gap-2 mb-3 flex-wrap">
//             <span className="text-[16px] sm:text-[18px] font-semibold text-[#c9a15a]">
//               {formatPrice(finalPrice)}
//             </span>

//             {discount > 0 && basePrice > 0 && (
//               <span className="text-[11px] sm:text-[12px] text-[#565959] line-through">
//                 M.R.P: {formatPrice(basePrice)}
//               </span>
//             )}
//           </div>
//         </Link>

//         {variants.length > 0 && (
//           <div
//             role="group"
//             aria-label={`${name} variant previews`}
//             className="flex gap-2 flex-wrap"
//           >
//             {variants.slice(0, 4).map((variant, index) => (
//               <button
//                 key={variant._id || index}
//                 type="button"
//                 onMouseEnter={() => setActiveVariantIdx(index)}
//                 onFocus={() => setActiveVariantIdx(index)}
//                 onClick={() => setActiveVariantIdx(index)}
//                 aria-label={`Preview ${name}, ${
//                   variant.color || `variant ${index + 1}`
//                 }`}
//                 aria-pressed={activeVariantIdx === index}
//                 className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-lg cursor-pointer p-1 flex items-center justify-center bg-white transition-all ${
//                   activeVariantIdx === index
//                     ? "border-[#c9a15a] ring-1 ring-[#c9a15a] shadow-sm"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <img
//                   src={
//                     variant.images?.[0]?.url ||
//                     getProductImg(product)
//                   }
//                   alt=""
//                   width={48}
//                   height={48}
//                   loading="lazy"
//                   decoding="async"
//                   className="w-full h-full object-contain"
//                 />
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <CardFooter category={product.category} />
//     </div>
//   );
// };

// // Main homepage section
// export default function HomeAmazonBlocks({ products = [] }) {
//   const validProducts = Array.isArray(products)
//     ? products.filter((product) => product?._id)
//     : [];

//   if (validProducts.length === 0) return null;

//   const usedIds = new Set();

//   const getUniqueProducts = (condition, count) => {
//     const selected = [];

//     for (const product of validProducts) {
//       if (selected.length === count) break;

//       if (!usedIds.has(product._id) && condition(product)) {
//         selected.push(product);
//         usedIds.add(product._id);
//       }
//     }

//     return selected;
//   };

//   let card2Product = validProducts.find(
//     (product) =>
//       product.variants?.length > 0 &&
//       !usedIds.has(product._id)
//   );

//   if (!card2Product) {
//     card2Product = validProducts.find(
//       (product) => !usedIds.has(product._id)
//     );
//   }

//   if (card2Product) {
//     usedIds.add(card2Product._id);
//   }

//   let card1Products = getUniqueProducts(
//     (product) =>
//       product.category === "Speakers" ||
//       product.category === "Audio",
//     4
//   );

//   if (card1Products.length < 4) {
//     card1Products = [
//       ...card1Products,
//       ...getUniqueProducts(() => true, 4 - card1Products.length),
//     ];
//   }

//   let card3Products = getUniqueProducts(
//     (product) => product.category === "Beauty & Wellness",
//     4
//   );

//   if (card3Products.length < 4) {
//     card3Products = [
//       ...card3Products,
//       ...getUniqueProducts(() => true, 4 - card3Products.length),
//     ];
//   }

//   let card4Products = getUniqueProducts(
//     (product) => product.category === "Smartwatches",
//     4
//   );

//   if (card4Products.length < 4) {
//     card4Products = [
//       ...card4Products,
//       ...getUniqueProducts(() => true, 4 - card4Products.length),
//     ];
//   }

//   return (
//     <section
//       aria-labelledby="home-recommended-heading"
//       className="w-full bg-white py-6 px-4 sm:px-6 md:px-8 relative"
//       style={{
//         fontFamily:
//           '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
//       }}
//     >
//       <div className="max-w-[1500px] mx-auto">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-2">
//             <span
//               aria-hidden="true"
//               className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"
//             />

//             <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#a97c2f] uppercase">
//               Shop Smarter
//             </span>

//             <span
//               aria-hidden="true"
//               className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"
//             />
//           </div>

//           <h2
//             id="home-recommended-heading"
//             className="text-2xl sm:text-3xl md:text-[32px] text-[#1a1a1a] mb-2"
//             style={{ fontWeight: 600 }}
//           >
//             Recommended For You
//           </h2>

//           <p className="text-[#888] text-[13px] sm:text-[14px]">
//             Explore a selection of products from the Truee collection.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
//           <GridCard
//             title="Keep shopping for"
//             icon={<BagIcon />}
//             products={card1Products}
//             category={card1Products[0]?.category}
//           />

//           <VariantCard
//             key={card2Product?._id}
//             title="Featured Product"
//             icon={<PickupIcon />}
//             product={card2Product}
//           />

//           <GridCard
//             title="More items to consider"
//             icon={<StarIcon />}
//             products={card3Products}
//             category={card3Products[0]?.category}
//           />

//           <GridCard
//             title="Continue shopping for"
//             icon={<CartIcon />}
//             products={card4Products}
//             category={card4Products[0]?.category}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";

// Price formatting
const formatPrice = (price) => {
  if (!price || price === 0) return "Price on Request";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

// Product image
const getProductImg = (product) => {
  if (product?.images?.[0]?.url) {
    return product.images[0].url;
  }

  if (product?.variants?.[0]?.images?.[0]?.url) {
    return product.variants[0].images[0].url;
  }

  return "https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image";
};

// Category link
const getShopUrl = (category) =>
  typeof category === "string" && category.trim()
    ? `/shop?category=${encodeURIComponent(category)}`
    : "/shop";

// Icons
const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const BagIcon = () => (
  <Icon>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </Icon>
);

const PickupIcon = () => (
  <Icon>
    <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
    <path d="M2 7h20l-2 5H4L2 7Z" />
    <path d="M12 7V4" />
    <path d="M9 4h6" />
  </Icon>
);

const StarIcon = () => (
  <Icon>
    <path d="M12 2.5 15 9l7 1-5 5 1.2 7L12 18.5 5.8 22 7 15 2 10l7-1 3-6.5Z" />
  </Icon>
);

const CartIcon = () => (
  <Icon>
    <circle cx="9" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </Icon>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="w-3.5 h-3.5"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const cardClassName =
  "group bg-white flex flex-col h-full rounded-2xl shadow-sm border border-gray-200 transition-all duration-300 overflow-hidden hover:border-[#c9a15a] hover:shadow-lg";

// Card heading
const CardHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2 px-4 py-3 sm:px-5 rounded-t-2xl">
    <span className="text-[#a97c2f]">{icon}</span>

    <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] flex-1 truncate">
      {title}
    </h3>

    <span className="text-gray-400">
      <ArrowIcon />
    </span>
  </div>
);

// Card footer link
const CardFooter = ({ category }) => {
  const categoryName =
    typeof category === "string" ? category.trim() : "";

  return (
    <div className="bg-white px-4 pb-2 mt-auto">
      <Link
        to={getShopUrl(category)}
        className="group flex w-full items-center justify-between bg-[#F8F5F2] hover:bg-[#F2ECE6] transition-all duration-300 px-5 py-3.5 rounded-lg text-[12px] sm:text-[13px] font-medium text-[#1a1a1a]"
      >
        <span>
          {categoryName ? `Explore ${categoryName}` : "Explore all products"}
        </span>

        <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#a97c2f]">
          <ArrowIcon />
        </span>
      </Link>
    </div>
  );
};

// Four-product card
const GridCard = ({ title, icon, products, category }) => {
  const displayProducts = products.slice(0, 4);

  return (
    <div className={cardClassName}>
      <CardHeader icon={icon} title={title} />

      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-4 p-4 flex-1">
          {displayProducts.map((product) => {
            const name = product.name || "Product";
            const basePrice = Number(product.price) || 0;
            const finalPrice = basePrice
              ? basePrice - (Number(product.discountPrice) || 0)
              : 0;

            return (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="flex flex-col cursor-pointer group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <div className="bg-[#f8f8f8] rounded-lg p-2 flex items-center justify-center h-[90px] xs:h-[100px] sm:h-[110px] md:h-[120px] mb-2 overflow-hidden">
                  <img
                    src={getProductImg(product)}
                    alt={name}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h4 className="text-[11px] sm:text-[12px] text-[#0F1111] line-clamp-1 group-hover:text-black">
                  {name}
                </h4>

                <span className="text-[13px] sm:text-[14px] font-semibold text-[#c9a15a]">
                  {formatPrice(finalPrice)}
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400 p-6">
          No products found
        </div>
      )}

      <CardFooter category={category} />
    </div>
  );
};

// Single-product card with variant previews
const VariantCard = ({ title, icon, product }) => {
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);

  if (!product) return null;

  const name = product.name || "Product";
  const variants = Array.isArray(product.variants)
    ? product.variants
    : [];

  const activeVariant = variants[activeVariantIdx];

  const mainImage =
    activeVariant?.images?.[0]?.url || getProductImg(product);

  const basePrice = Number(product.price) || 0;
  const discount = Number(product.discountPrice) || 0;
  const finalPrice = basePrice - discount;

  return (
    <div className={cardClassName}>
      <CardHeader icon={icon} title={title} />

      <div className="flex-1 flex flex-col p-4 sm:p-5">
        <Link
          to={`/product/${product._id}`}
          className="flex flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <div className="bg-[#f8f8f8] rounded-lg p-3 sm:p-4 flex items-center justify-center h-[150px] xs:h-[170px] sm:h-[190px] md:h-[200px] mb-3 overflow-hidden">
            <img
              src={mainImage}
              alt={
                activeVariant?.color
                  ? `${name} - ${activeVariant.color}`
                  : name
              }
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain mix-blend-multiply"
            />
          </div>

          <h4 className="text-[13px] sm:text-[14px] text-[#0F1111] line-clamp-2 mb-1 hover:text-[#c45500]">
            {name}
          </h4>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-[16px] sm:text-[18px] font-semibold text-[#c9a15a]">
              {formatPrice(finalPrice)}
            </span>

            {discount > 0 && basePrice > 0 && (
              <span className="text-[11px] sm:text-[12px] text-[#565959] line-through">
                M.R.P: {formatPrice(basePrice)}
              </span>
            )}
          </div>
        </Link>

        {variants.length > 0 && (
          <div
            role="group"
            aria-label={`${name} variant previews`}
            className="flex gap-2 flex-wrap"
          >
            {variants.slice(0, 4).map((variant, index) => (
              <button
                key={variant._id || index}
                type="button"
                onMouseEnter={() => setActiveVariantIdx(index)}
                onFocus={() => setActiveVariantIdx(index)}
                onClick={() => setActiveVariantIdx(index)}
                aria-label={`Preview ${name}, ${
                  variant.color || `variant ${index + 1}`
                }`}
                aria-pressed={activeVariantIdx === index}
                className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-lg cursor-pointer p-1 flex items-center justify-center bg-white transition-all ${
                  activeVariantIdx === index
                    ? "border-[#c9a15a] ring-1 ring-[#c9a15a] shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={
                    variant.images?.[0]?.url ||
                    getProductImg(product)
                  }
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <CardFooter category={product.category} />
    </div>
  );
};

// Main homepage section
export default function HomeAmazonBlocks({ products = [] }) {
  const validProducts = Array.isArray(products)
    ? products.filter((product) => product?._id)
    : [];

  if (validProducts.length === 0) return null;

  const usedIds = new Set();

  const getUniqueProducts = (condition, count) => {
    const selected = [];

    for (const product of validProducts) {
      if (selected.length === count) break;

      if (!usedIds.has(product._id) && condition(product)) {
        selected.push(product);
        usedIds.add(product._id);
      }
    }

    return selected;
  };

  let card2Product = validProducts.find(
    (product) =>
      product.variants?.length > 0 &&
      !usedIds.has(product._id)
  );

  if (!card2Product) {
    card2Product = validProducts.find(
      (product) => !usedIds.has(product._id)
    );
  }

  if (card2Product) {
    usedIds.add(card2Product._id);
  }

  let card1Products = getUniqueProducts(
    (product) =>
      product.category === "Speakers" ||
      product.category === "Audio",
    4
  );

  if (card1Products.length < 4) {
    card1Products = [
      ...card1Products,
      ...getUniqueProducts(() => true, 4 - card1Products.length),
    ];
  }

  let card3Products = getUniqueProducts(
    (product) => product.category === "Beauty & Wellness",
    4
  );

  if (card3Products.length < 4) {
    card3Products = [
      ...card3Products,
      ...getUniqueProducts(() => true, 4 - card3Products.length),
    ];
  }

  let card4Products = getUniqueProducts(
    (product) => product.category === "Smartwatches",
    4
  );

  if (card4Products.length < 4) {
    card4Products = [
      ...card4Products,
      ...getUniqueProducts(() => true, 4 - card4Products.length),
    ];
  }

  return (
    <section
      aria-labelledby="home-recommended-heading"
      className="w-full bg-white py-6 px-4 sm:px-6 md:px-8 relative"
      style={{
        fontFamily:
          '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span
              aria-hidden="true"
              className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"
            />

            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#a97c2f] uppercase">
              Explore Truee
            </span>

            <span
              aria-hidden="true"
              className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"
            />
          </div>

          <h2
            id="home-recommended-heading"
            className="text-2xl sm:text-3xl md:text-[32px] text-[#1a1a1a] mb-2"
            style={{ fontWeight: 600 }}
          >
            Discover Speakers &amp; Lifestyle Products
          </h2>

          <p className="text-[#888] text-[13px] sm:text-[14px]">
            Browse speakers, audio and lifestyle products.
            Open a product to view its features, available options and price.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          <GridCard
            title="Explore the collection"
            icon={<BagIcon />}
            products={card1Products}
            category={card1Products[0]?.category}
          />

          <VariantCard
            key={card2Product?._id}
            title="Featured Product"
            icon={<PickupIcon />}
            product={card2Product}
          />

          <GridCard
            title="More products to explore"
            icon={<StarIcon />}
            products={card3Products}
            category={card3Products[0]?.category}
          />

          <GridCard
            title="Discover more products"
            icon={<CartIcon />}
            products={card4Products}
            category={card4Products[0]?.category}
          />
        </div>
      </div>
    </section>
  );
}