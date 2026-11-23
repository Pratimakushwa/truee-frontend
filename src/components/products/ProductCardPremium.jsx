

// import { useState } from 'react';
// import {
//   Heart,
//   Star,
//   ShoppingCart,
//   Zap,
//   Shield,
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { useAuth } from '../../context/AuthContext';
// import {
//   getProductImg,
//   getProductPricing,
//   isOutOfStock,
//   formatPrice,
//   getRating,
// } from '../../utils/productHelpers';

// const getColorName = (colorItem, index) => {
//   if (typeof colorItem === 'string') {
//     return colorItem;
//   }

//   return (
//     colorItem?.color ||
//     colorItem?.name ||
//     colorItem?.hex ||
//     colorItem?.colorCode ||
//     `Color ${index + 1}`
//   );
// };

// const getCleanColorHex = (colorItem) => {
//   if (!colorItem) return '#111111';

//   let raw =
//     typeof colorItem === 'string'
//       ? colorItem
//       : (
//           colorItem.hex ||
//           colorItem.colorCode ||
//           colorItem.color ||
//           colorItem.name ||
//           ''
//         );

//   raw = String(raw).trim().toLowerCase();

//   if (raw.startsWith('#') || raw.startsWith('rgb')) {
//     return raw;
//   }

//   const colorMap = {
//     black: '#111111',
//     'matte black': '#1a1a1a',
//     'vintage black': '#181818',
//     'black & brass': '#1A1A18',
//     white: '#FFFFFF',
//     'lunar white': '#F9F9F9',
//     pearl: '#F0EAD6',
//     cream: '#E8E4D9',
//     beige: '#F5F5DC',
//     gold: '#C8A253',
//     'rose gold': '#B76E79',
//     brass: '#B5944B',
//     silver: '#D1D5DB',
//     platinum: '#E5E4E2',
//     grey: '#6B7280',
//     gray: '#6B7280',
//     graphite: '#383838',
//     charcoal: '#36454F',
//     'sage green': '#738276',
//     olive: '#556B2F',
//     'midnight blue': '#191970',
//     navy: '#000080',
//     blue: '#1e3a8a',
//     brown: '#5C4033',
//     walnut: '#773f1a',
//     red: '#b91c1c',
//   };

//   if (colorMap[raw]) return colorMap[raw];

//   if (raw.includes('black')) return '#111111';
//   if (raw.includes('white')) return '#FFFFFF';
//   if (raw.includes('gold')) return '#C8A253';
//   if (raw.includes('silver')) return '#D1D5DB';
//   if (raw.includes('grey') || raw.includes('gray')) {
//     return '#6B7280';
//   }
//   if (raw.includes('blue')) return '#1e3a8a';
//   if (raw.includes('green')) return '#738276';
//   if (raw.includes('red')) return '#b91c1c';
//   if (raw.includes('brown') || raw.includes('wood')) {
//     return '#5C4033';
//   }
//   if (raw.includes('cream')) return '#E8E4D9';
//   if (raw.includes('brass')) return '#B5944B';

//   return '#111111';
// };

// export default function ProductCardPremium({
//   product,
//   variant = 'default',
//   className = '',
// }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [imgHover, setImgHover] = useState(false);
//   const [adding, setAdding] = useState(false);
//   const [wishlistUpdating, setWishlistUpdating] = useState(false);
//   const [activeVariantIdx, setActiveVariantIdx] = useState(0);

//   if (!product) return null;

//   const {
//     mrp,
//     sellingPrice,
//     hasDiscount,
//     discountPercent,
//   } = getProductPricing(product);

//   const outOfStock = isOutOfStock(product);
//   const rating = getRating(product);
//   const avg = Number(rating.avg) || 0;
//   const count = Number(rating.count) || 0;

//   const name = product.name || 'Product';
//   const productUrl = `/product/${product._id}`;
//   const brand = product.brand || product.category || 'TRUEE';

//   const highlight =
//     product.shortDescription ||
//     product.tags?.[0] ||
//     'Premium quality';

//   const isCompact = variant === 'compact';

//   const realColors =
//     Array.isArray(product.colors) && product.colors.length > 0
//       ? product.colors
//       : Array.isArray(product.variants) &&
//           product.variants.length > 0
//         ? product.variants
//         : Array.isArray(product.colorVariants) &&
//             product.colorVariants.length > 0
//           ? product.colorVariants
//           : [];

//   const primaryImg = getProductImg(product, 0);
//   const secondImg = getProductImg(product, 1);
//   const hoverImg =
//     secondImg && secondImg !== primaryImg
//       ? secondImg
//       : primaryImg;

//   let displayImgSrc = imgHover ? hoverImg : primaryImg;

//   if (realColors.length > 0) {
//     const selectedVariant = realColors[activeVariantIdx];
//     let variantImg = null;

//     if (selectedVariant?.images?.length > 0) {
//       variantImg =
//         selectedVariant.images[0].url ||
//         selectedVariant.images[0];
//     } else if (selectedVariant?.image) {
//       variantImg =
//         selectedVariant.image.url ||
//         selectedVariant.image;
//     } else if (selectedVariant?.img) {
//       variantImg =
//         selectedVariant.img.url ||
//         selectedVariant.img;
//     } else if (product.images?.[activeVariantIdx]) {
//       variantImg =
//         product.images[activeVariantIdx].url ||
//         product.images[activeVariantIdx];
//     }

//     if (typeof variantImg === 'string' && variantImg) {
//       displayImgSrc =
//         imgHover && activeVariantIdx === 0
//           ? hoverImg
//           : variantImg;
//     }
//   }

//   const handleWishlist = async (event) => {
//     event.stopPropagation();

//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     if (wishlistUpdating) return;

//     const previousValue = isWishlisted;

//     setWishlistUpdating(true);
//     setIsWishlisted(!previousValue);

//     try {
//       await axiosInstance.post('/wishlist/toggle', {
//         productId: product._id,
//       });
//     } catch (error) {
//       setIsWishlisted(previousValue);
//       console.error('Wishlist update failed:', error);
//     } finally {
//       setWishlistUpdating(false);
//     }
//   };

//   const addToCart = async (event, buyNow = false) => {
//     event.stopPropagation();

//     if (outOfStock || adding) return;

//     setAdding(true);

//     try {
//       const { data } = await axiosInstance.post('/cart/add', {
//         productId: product._id,
//         quantity: 1,
//       });

//       if (data.success) {
//         window.dispatchEvent(
//           new CustomEvent('cartUpdated', {
//             detail: { increase: 1 },
//           })
//         );

//         if (buyNow) {
//           navigate('/checkout');
//         }
//       }
//     } catch (error) {
//       console.error('Add to cart failed:', error);
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <article
//       className={`group/card relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden
//         hover:border-[#C8A253]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out
//         ${isCompact ? 'text-left' : ''} ${className}`}
//       onMouseEnter={() => setImgHover(true)}
//       onMouseLeave={() => setImgHover(false)}
//     >
//       {/* Product image link */}
//       <div className="relative bg-gradient-to-b from-[#FAFAFA] to-white overflow-hidden aspect-square">
//         <Link
//           to={productUrl}
//           aria-label={`View ${name}`}
//           className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-black"
//         >
//           <img
//             src={displayImgSrc}
//             alt={name}
//             width={400}
//             height={400}
//             loading="lazy"
//             decoding="async"
//             className={`absolute inset-0 w-full h-full object-contain p-4 mix-blend-multiply transition-all duration-500 ${
//               outOfStock
//                 ? 'opacity-50 grayscale'
//                 : 'group-hover/card:scale-105'
//             }`}
//           />
//         </Link>

//         {/* Badges */}
//         <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex items-center gap-2 flex-wrap pointer-events-none">
//           {outOfStock ? (
//             <span className="px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide bg-gray-900 text-white rounded-full">
//               Sold Out
//             </span>
//           ) : hasDiscount ? (
//             <span className="px-1.5 py-1 text-[9px] sm:text-[10px] font-bold bg-[#C8A253] text-black rounded-full shadow-sm w-fit">
//               -{discountPercent}%
//             </span>
//           ) : null}

//           {!outOfStock && (
//             <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold bg-white/90 text-gray-600 rounded-full border border-gray-100 flex items-center gap-1 w-fit">
//               <Shield
//                 size={9}
//                 aria-hidden="true"
//                 className="text-[#C8A253]"
//               />
//               1 Year Warranty
//             </span>
//           )}
//         </div>

//         {/* Wishlist button */}
//         <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex flex-col gap-1.5 opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 lg:group-focus-within/card:opacity-100 transition-opacity duration-300">
//           <button
//             type="button"
//             onClick={handleWishlist}
//             disabled={wishlistUpdating}
//             aria-label={
//               isWishlisted
//                 ? `Remove ${name} from wishlist`
//                 : `Add ${name} to wishlist`
//             }
//             aria-pressed={isWishlisted}
//             className="p-1.5 sm:p-2 rounded-full bg-white/95 shadow-md hover:bg-white hover:scale-105 transition-all disabled:opacity-60"
//           >
//             <Heart
//               size={14}
//               aria-hidden="true"
//               className={
//                 isWishlisted
//                   ? 'text-red-500 fill-red-500'
//                   : 'text-gray-700'
//               }
//               strokeWidth={2}
//             />
//           </button>
//         </div>

//         {/* Cart actions, separate from the product link */}
//         {!outOfStock && (
//           <div className="absolute inset-x-0 bottom-0 z-20 p-2 translate-y-full group-hover/card:translate-y-0 group-focus-within/card:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-white via-white/95 to-transparent pt-6">
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 disabled={adding}
//                 onClick={(event) => addToCart(event, false)}
//                 aria-label={`Add ${name} to cart`}
//                 className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 bg-[#0A0A0A] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
//               >
//                 <ShoppingCart size={12} aria-hidden="true" />
//                 {adding ? 'Adding…' : 'Add'}
//               </button>

//               <button
//                 type="button"
//                 disabled={adding}
//                 onClick={(event) => addToCart(event, true)}
//                 aria-label={`Buy ${name} now`}
//                 className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 bg-[#C8A253] text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b06a] transition-colors disabled:opacity-60"
//               >
//                 <Zap size={12} aria-hidden="true" />
//                 Buy
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Product content */}
//       <div className="p-3 flex flex-col flex-1">
//         {/* Color previews */}
//         {realColors.length > 0 && (
//           <div
//             role="group"
//             aria-label={`${name} color previews`}
//             className="flex items-center gap-1.5 mb-2 min-h-4 flex-wrap"
//           >
//             {realColors.map((colorItem, index) => {
//               const cleanHex = getCleanColorHex(colorItem);
//               const colorName = getColorName(colorItem, index);
//               const isActive = activeVariantIdx === index;

//               return (
//                 <button
//                   key={colorItem?._id || index}
//                   type="button"
//                   onMouseEnter={() => setActiveVariantIdx(index)}
//                   onFocus={() => setActiveVariantIdx(index)}
//                   onClick={() => setActiveVariantIdx(index)}
//                   onTouchStart={() => setActiveVariantIdx(index)}
//                   aria-label={`Preview ${name} in ${colorName}`}
//                   aria-pressed={isActive}
//                   title={colorName}
//                   className={`w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-full border transition-all duration-300 cursor-pointer shadow-sm ${
//                     isActive
//                       ? 'border-gray-900 ring-2 ring-gray-400 ring-offset-1 scale-125 z-10'
//                       : 'border-gray-300 hover:border-gray-500 hover:scale-110'
//                   }`}
//                   style={{ backgroundColor: cleanHex }}
//                 />
//               );
//             })}
//           </div>
//         )}

//         <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#C8A253] mb-0.5 truncate">
//           {brand}
//         </p>

//         <h3 className="text-[12px] sm:text-[13px] font-medium text-gray-900 line-clamp-2 leading-snug mb-1.5 group-hover/card:text-[#8B6914] transition-colors min-h-auto">
//           <Link
//             to={productUrl}
//             className="hover:underline focus-visible:underline"
//           >
//             {name}
//           </Link>
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-1.5 mb-1.5">
//           <div
//             aria-hidden="true"
//             className="flex items-center gap-0.5"
//           >
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 size={10}
//                 className={
//                   star <= Math.round(avg)
//                     ? 'text-amber-400 fill-amber-400'
//                     : 'text-gray-200 fill-gray-200'
//                 }
//               />
//             ))}
//           </div>

//           <span
//             aria-label={`${avg.toFixed(1)} out of 5, ${count} reviews`}
//             className="text-[9px] sm:text-[10px] text-gray-400"
//           >
//             {avg.toFixed(1)}
//             {count > 0 ? ` (${count})` : ''}
//           </span>
//         </div>

//         <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-1 mb-2">
//           {highlight}
//         </p>

//         {/* Price */}
//         <div className="flex items-baseline gap-2 mt-auto flex-wrap">
//           <span className="text-[13px] sm:text-[15px] font-bold text-gray-900">
//             {sellingPrice > 0
//               ? formatPrice(sellingPrice)
//               : 'Price on Request'}
//           </span>

//           {sellingPrice > 0 && hasDiscount && (
//             <span className="text-[9px] sm:text-[11px] text-gray-400 line-through">
//               {formatPrice(mrp)}
//             </span>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }

import { useState } from "react";
import {
  Heart,
  Star,
  ShoppingCart,
  Zap,
  Shield,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import {
  getProductImg,
  getProductPricing,
  isOutOfStock,
  formatPrice,
  getRating,
} from "../../utils/productHelpers";

const getColorName = (colorItem, index) => {
  if (typeof colorItem === "string") {
    return colorItem;
  }

  return (
    colorItem?.color ||
    colorItem?.name ||
    colorItem?.hex ||
    colorItem?.colorCode ||
    `Color ${index + 1}`
  );
};

const getCleanColorHex = (colorItem) => {
  if (!colorItem) return "#111111";

  let raw =
    typeof colorItem === "string"
      ? colorItem
      : colorItem.hex ||
        colorItem.colorCode ||
        colorItem.color ||
        colorItem.name ||
        "";

  raw = String(raw).trim().toLowerCase();

  if (raw.startsWith("#") || raw.startsWith("rgb")) {
    return raw;
  }

  const colorMap = {
    black: "#111111",
    "matte black": "#1a1a1a",
    "vintage black": "#181818",
    "black & brass": "#1A1A18",
    white: "#FFFFFF",
    "lunar white": "#F9F9F9",
    pearl: "#F0EAD6",
    cream: "#E8E4D9",
    beige: "#F5F5DC",
    gold: "#C8A253",
    "rose gold": "#B76E79",
    brass: "#B5944B",
    silver: "#D1D5DB",
    platinum: "#E5E4E2",
    grey: "#6B7280",
    gray: "#6B7280",
    graphite: "#383838",
    charcoal: "#36454F",
    "sage green": "#738276",
    olive: "#556B2F",
    "midnight blue": "#191970",
    navy: "#000080",
    blue: "#1e3a8a",
    brown: "#5C4033",
    walnut: "#773f1a",
    red: "#b91c1c",
  };

  if (colorMap[raw]) return colorMap[raw];

  if (raw.includes("black")) return "#111111";
  if (raw.includes("white")) return "#FFFFFF";
  if (raw.includes("gold")) return "#C8A253";
  if (raw.includes("silver")) return "#D1D5DB";

  if (raw.includes("grey") || raw.includes("gray")) {
    return "#6B7280";
  }

  if (raw.includes("blue")) return "#1e3a8a";
  if (raw.includes("green")) return "#738276";
  if (raw.includes("red")) return "#b91c1c";

  if (raw.includes("brown") || raw.includes("wood")) {
    return "#5C4033";
  }

  if (raw.includes("cream")) return "#E8E4D9";
  if (raw.includes("brass")) return "#B5944B";

  return "#111111";
};

export default function ProductCardPremium({
  product,
  variant = "default",
  className = "",
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgHover, setImgHover] = useState(false);
  const [adding, setAdding] = useState(false);
  const [wishlistUpdating, setWishlistUpdating] = useState(false);
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);

  if (!product) return null;

  const {
    mrp,
    sellingPrice,
    hasDiscount,
    discountPercent,
  } = getProductPricing(product);

  const outOfStock = isOutOfStock(product);

  const rating = getRating(product);
  const avg = Number(rating.avg) || 0;
  const count = Number(rating.count) || 0;

  const name = product.name || "Product";
  const productUrl = `/product/${product._id}`;
  const brand = product.brand || product.category || "TRUEE";

  const highlight =
    product.shortDescription ||
    product.tags?.[0] ||
    "Premium quality";

  const isCompact = variant === "compact";

  const realColors =
    Array.isArray(product.colors) && product.colors.length > 0
      ? product.colors
      : Array.isArray(product.variants) &&
          product.variants.length > 0
        ? product.variants
        : Array.isArray(product.colorVariants) &&
            product.colorVariants.length > 0
          ? product.colorVariants
          : [];

  const primaryImg = getProductImg(product, 0);
  const secondImg = getProductImg(product, 1);

  const hoverImg =
    secondImg && secondImg !== primaryImg
      ? secondImg
      : primaryImg;

  let displayImgSrc = imgHover ? hoverImg : primaryImg;

  if (realColors.length > 0) {
    const selectedVariant = realColors[activeVariantIdx];
    let variantImg = null;

    if (selectedVariant?.images?.length > 0) {
      variantImg =
        selectedVariant.images[0].url ||
        selectedVariant.images[0];
    } else if (selectedVariant?.image) {
      variantImg =
        selectedVariant.image.url ||
        selectedVariant.image;
    } else if (selectedVariant?.img) {
      variantImg =
        selectedVariant.img.url ||
        selectedVariant.img;
    } else if (product.images?.[activeVariantIdx]) {
      variantImg =
        product.images[activeVariantIdx].url ||
        product.images[activeVariantIdx];
    }

    if (typeof variantImg === "string" && variantImg) {
      displayImgSrc =
        imgHover && activeVariantIdx === 0
          ? hoverImg
          : variantImg;
    }
  }

  const handleWishlist = async (event) => {
    event.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    if (wishlistUpdating) return;

    const previousValue = isWishlisted;

    setWishlistUpdating(true);
    setIsWishlisted(!previousValue);

    try {
      await axiosInstance.post("/wishlist/toggle", {
        productId: product._id,
      });
    } catch (error) {
      setIsWishlisted(previousValue);
      console.error("Wishlist update failed:", error);
    } finally {
      setWishlistUpdating(false);
    }
  };

  const addToCart = async (event, buyNow = false) => {
    event.stopPropagation();

    if (outOfStock || adding) return;

    setAdding(true);

    try {
      const { data } = await axiosInstance.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      if (data.success) {
        window.dispatchEvent(
          new CustomEvent("cartUpdated", {
            detail: { increase: 1 },
          })
        );

        if (buyNow) {
          navigate("/checkout");
        }
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article
      className={`group/card relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden
        hover:border-[#C8A253]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out
        ${isCompact ? "text-left" : ""} ${className}`}
      onMouseEnter={() => setImgHover(true)}
      onMouseLeave={() => setImgHover(false)}
    >
      {/* Product image */}
      <div className="relative bg-gradient-to-b from-[#FAFAFA] to-white overflow-hidden aspect-square">
        <Link
          to={productUrl}
          aria-label={`View ${name}`}
          className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-black"
        >
          <img
            src={displayImgSrc}
            alt={name}
            width={400}
            height={400}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-contain p-4 mix-blend-multiply transition-all duration-500 ${
              outOfStock
                ? "opacity-50 grayscale"
                : "group-hover/card:scale-105"
            }`}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex items-center gap-2 flex-wrap pointer-events-none">
          {outOfStock ? (
            <span className="px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide bg-gray-900 text-white rounded-full">
              Sold Out
            </span>
          ) : hasDiscount ? (
            <span className="px-1.5 py-1 text-[9px] sm:text-[10px] font-bold bg-[#C8A253] text-black rounded-full shadow-sm w-fit">
              -{discountPercent}%
            </span>
          ) : null}

          {!outOfStock && (
            <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold bg-white/90 text-gray-600 rounded-full border border-gray-100 flex items-center gap-1 w-fit">
              <Shield
                size={9}
                aria-hidden="true"
                className="text-[#C8A253]"
              />
              1 Year Warranty
            </span>
          )}
        </div>

        {/* Wishlist */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex flex-col gap-1.5 opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 lg:group-focus-within/card:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={handleWishlist}
            disabled={wishlistUpdating}
            aria-label={
              isWishlisted
                ? `Remove ${name} from wishlist`
                : `Add ${name} to wishlist`
            }
            aria-pressed={isWishlisted}
            className="p-1.5 sm:p-2 rounded-full bg-white/95 shadow-md hover:bg-white hover:scale-105 transition-all disabled:opacity-60"
          >
            <Heart
              size={14}
              aria-hidden="true"
              className={
                isWishlisted
                  ? "text-red-500 fill-red-500"
                  : "text-gray-700"
              }
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Cart actions */}
        {!outOfStock && (
          <div className="absolute inset-x-0 bottom-0 z-20 p-2 translate-y-full group-hover/card:translate-y-0 group-focus-within/card:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-white via-white/95 to-transparent pt-6">
            <div className="flex gap-2">
              <button
                type="button"
                disabled={adding}
                onClick={(event) => addToCart(event, false)}
                aria-label={`Add ${name} to cart`}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 bg-[#0A0A0A] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
              >
                <ShoppingCart size={12} aria-hidden="true" />
                {adding ? "Adding…" : "Add"}
              </button>

              <button
                type="button"
                disabled={adding}
                onClick={(event) => addToCart(event, true)}
                aria-label={`Buy ${name} now`}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 bg-[#C8A253] text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b06a] transition-colors disabled:opacity-60"
              >
                <Zap size={12} aria-hidden="true" />
                Buy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Color previews */}
        {realColors.length > 0 && (
          <div
            role="group"
            aria-label={`${name} color previews`}
            className="flex items-center gap-1.5 mb-2 min-h-4 flex-wrap"
          >
            {realColors.map((colorItem, index) => {
              const cleanHex = getCleanColorHex(colorItem);
              const colorName = getColorName(colorItem, index);
              const isActive = activeVariantIdx === index;

              return (
                <button
                  key={colorItem?._id || index}
                  type="button"
                  onMouseEnter={() => setActiveVariantIdx(index)}
                  onFocus={() => setActiveVariantIdx(index)}
                  onClick={() => setActiveVariantIdx(index)}
                  onTouchStart={() => setActiveVariantIdx(index)}
                  aria-label={`Preview ${name} in ${colorName}`}
                  aria-pressed={isActive}
                  title={colorName}
                  className={`w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-full border transition-all duration-300 cursor-pointer shadow-sm ${
                    isActive
                      ? "border-gray-900 ring-2 ring-gray-400 ring-offset-1 scale-125 z-10"
                      : "border-gray-300 hover:border-gray-500 hover:scale-110"
                  }`}
                  style={{ backgroundColor: cleanHex }}
                />
              );
            })}
          </div>
        )}

        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#C8A253] mb-0.5 truncate">
          {brand}
        </p>

        <h3 className="text-[12px] sm:text-[13px] font-medium text-gray-900 line-clamp-2 leading-snug mb-1.5 group-hover/card:text-[#8B6914] transition-colors min-h-auto">
          <Link
            to={productUrl}
            className="hover:underline focus-visible:underline"
          >
            {name}
          </Link>
        </h3>

        {/* Reviews hone par hi rating dikhegi */}
        {count > 0 && avg > 0 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <div
              aria-hidden="true"
              className="flex items-center gap-0.5"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={10}
                  className={
                    star <= Math.round(avg)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
            </div>

            <span
              aria-label={`${avg.toFixed(1)} out of 5, ${count} reviews`}
              className="text-[9px] sm:text-[10px] text-gray-500"
            >
              {avg.toFixed(1)} ({count})
            </span>
          </div>
        )}

        <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-1 mb-2">
          {highlight}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto flex-wrap">
          <span className="text-[13px] sm:text-[15px] font-bold text-gray-900">
            {sellingPrice > 0
              ? formatPrice(sellingPrice)
              : "Price on Request"}
          </span>

          {sellingPrice > 0 && hasDiscount && (
            <span className="text-[9px] sm:text-[11px] text-gray-400 line-through">
              {formatPrice(mrp)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}