

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ShoppingBag,
//   Heart,
// } from "lucide-react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useAuth } from "../../context/AuthContext";
// import Toast from "../../components/Toast";
// import QuickModel from "../Product/ProductDetailModel";

// // ⚡ ULTRA SMART COLOR PARSER: Ab ye har tarah ke database fields ko pehchan lega
// const getCleanColorHex = (colorItem) => {
//   if (!colorItem) return '#111111';
  
//   let raw = '';
  
//   // 1. Agar direct string (naam) hai
//   if (typeof colorItem === 'string') {
//     raw = colorItem;
//   } else {
//     // 2. Agar database mein pehle se Hex code (#FFF) majood hai, toh direct wahi use karega!
//     if (colorItem.colorCode && colorItem.colorCode.startsWith('#')) return colorItem.colorCode;
//     if (colorItem.hex && colorItem.hex.startsWith('#')) return colorItem.hex;
    
//     // 3. Agar hex nahi hai, toh color ka naam inmein se kisi bhi field me dhoondhega
//     raw = colorItem.color || colorItem.name || colorItem.title || colorItem.variantName || colorItem.option || colorItem.value || '';
//   }
  
//   raw = raw.trim().toLowerCase();
  
//   // Agar direct hex aa gaya toh wahi return karo
//   if (raw.startsWith('#') || raw.startsWith('rgb')) return raw;
  
//   // Exact Matches
//   const colorMap = {
//     'black': '#111111', 'matte black': '#1a1a1a', 'vintage black': '#181818', 'black & brass': '#1A1A18',
//     'white': '#FFFFFF', 'lunar white': '#F9F9F9', 'pearl': '#F0EAD6',
//     'cream': '#E8E4D9', 'beige': '#F5F5DC', 'ivory': '#FFFFF0',
//     'gold': '#C8A253', 'rose gold': '#B76E79', 'brass': '#B5944B',
//     'silver': '#D1D5DB', 'platinum': '#E5E4E2', 'titanium': '#878681',
//     'grey': '#6B7280', 'gray': '#6B7280', 'graphite': '#383838', 'charcoal': '#36454F',
//     'sage green': '#738276', 'olive': '#556B2F', 'green': '#166534',
//     'midnight blue': '#191970', 'navy': '#000080', 'blue': '#1e3a8a',
//     'brown': '#5C4033', 'walnut': '#773f1a', 'copper': '#B87333',
//     'red': '#b91c1c', 'pink': '#db2777', 'purple': '#7e22ce', 'yellow': '#eab308'
//   };
  
//   if (colorMap[raw]) return colorMap[raw];
  
//   // Smart Substring Matches (Agar lamba naam ho jaise "Premium Sage Green Edition")
//   if (raw.includes('black')) return '#111111';
//   if (raw.includes('white')) return '#FFFFFF';
//   if (raw.includes('gold')) return '#C8A253';
//   if (raw.includes('silver')) return '#D1D5DB';
//   if (raw.includes('grey') || raw.includes('gray')) return '#6B7280';
//   if (raw.includes('blue')) return '#1e3a8a';
//   if (raw.includes('green')) return '#738276';
//   if (raw.includes('red')) return '#b91c1c';
//   if (raw.includes('brown') || raw.includes('wood') || raw.includes('walnut')) return '#5C4033';
//   if (raw.includes('cream') || raw.includes('beige')) return '#E8E4D9';
//   if (raw.includes('brass')) return '#B5944B';
//   if (raw.includes('pink')) return '#db2777';
//   if (raw.includes('purple')) return '#7e22ce';
  
//   // Agar kuch samajh na aaye toh Default Black
//   return '#111111'; 
// };

// const RecentlyViewed = () => {
//   const [recentProducts, setRecentProducts] = useState([]);
//   const [wishlistedItems, setWishlistedItems] = useState([]);
//   const [toastMessage, setToastMessage] = useState(null);
//   const [quickViewProduct, setQuickViewProduct] = useState(null); 
//   const sliderRef = useRef(null);

//   const [activeVariants, setActiveVariants] = useState({});

//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadHistory = async () => {
//       try {
//         const items = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
//         setRecentProducts(items);

//         if (items.length > 0) {
//           const updatedItems = await Promise.all(
//             items.map(async (item) => {
//               try {
//                 const { data } = await axiosInstance.get(`/products/${item._id}`);
//                 return data.success ? data.product : item;
//               } catch (e) {
//                 return item;
//               }
//             })
//           );
//           setRecentProducts(updatedItems);
//         }
//       } catch (error) {
//         console.error("Error loading history:", error);
//       }
//     };
    
//     loadHistory();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const fetchWishlist = async () => {
//         try {
//           const { data } = await axiosInstance.get("/wishlist");
//           if (data.success && data.wishlist) {
//             const ids = data.wishlist.map((item) => item._id || item);
//             setWishlistedItems(ids);
//           }
//         } catch (error) {
//           console.error("Error fetching wishlist", error);
//         }
//       };
//       fetchWishlist();
//     } else {
//       setWishlistedItems([]);
//     }
//   }, [user]);

//   if (recentProducts.length === 0) return null;

//   const scroll = (direction) => {
//     if (sliderRef.current) {
//       const scrollAmount = direction === "left" ? -320 : 320;
//       sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   const handleAddToCart = async (e, productId) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       const { data } = await axiosInstance.post("/cart/add", { productId, quantity: 1 });
//       if (data.success) {
//         window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { increase: 1 } }));
//         setToastMessage({ type: "success", message: "Added to cart successfully!" });
//       }
//     } catch (err) {
//       setToastMessage({ type: "error", message: err.response?.data?.message || "Failed to add to cart" });
//     }
//   };

//   const handleWishlist = async (e, productId) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!user) { navigate("/login"); return; }
//     const isCurrentlyWishlisted = wishlistedItems.includes(productId);
//     if (isCurrentlyWishlisted) {
//       setWishlistedItems((prev) => prev.filter((id) => id !== productId));
//     } else {
//       setWishlistedItems((prev) => [...prev, productId]);
//     }
//     try {
//       await axiosInstance.post("/wishlist/toggle", { productId });
//       setToastMessage({ type: "success", message: isCurrentlyWishlisted ? "Removed from wishlist" : "Added to wishlist!" });
//     } catch (err) {
//       if (isCurrentlyWishlisted) {
//         setWishlistedItems((prev) => [...prev, productId]);
//       } else {
//         setWishlistedItems((prev) => prev.filter((id) => id !== productId));
//       }
//       setToastMessage({ type: "error", message: "Failed to update wishlist" });
//     }
//   };

//   return (
//     <section 
//       className="bg-white py-8 font-sans"
//       // ⚡ Only Font Family added for Apple SF Pro
//       style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
//     >
//       {toastMessage && <Toast type={toastMessage.type} message={toastMessage.message} onClose={() => setToastMessage(null)} />}

//       <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12">
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
//           <div>
//             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 flex items-center gap-2">You May Also Like</span>
//             {/* ⚡ Removed font-serif here */}
//             <h2 className="text-xl sm:text-2xl md:text-[32px] font-bold text-[#111] mb-2">Related to items you've viewed</h2>
//             <div className="w-20 h-[2px] bg-[#C8A253] mb-2"></div>
//           </div>
//         </div>

//         <div className="relative group mb-2">
//           <button onClick={() => scroll("left")} className="absolute -left-1.5 sm:-left-5 top-[38%] -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:text-[#C8A253] cursor-pointer">
//             <ChevronLeft size={18} />
//           </button>

//           <div ref={sliderRef} className="flex gap-3.5 sm:gap-4 md:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth hide-scrollbar px-1">
//             {recentProducts.map((product) => {
//               const isWishlisted = wishlistedItems.includes(product._id);
              
//               const realColors = product.colors?.length > 0 ? product.colors
//                 : product.variants?.length > 0 ? product.variants
//                 : product.colorVariants?.length > 0 ? product.colorVariants
//                 : [];

//               const activeData = activeVariants[product._id];
//               const activeIndex = activeData ? activeData.index : 0;
//               const activeVariantObj = activeData ? activeData.item : null;

//               const defaultImg = product.image || product.images?.[0]?.url || "https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image";
//               let displayImgSrc = defaultImg;

//               if (activeVariantObj) {
//                 if (activeVariantObj.images && activeVariantObj.images.length > 0) {
//                   displayImgSrc = activeVariantObj.images[0].url || activeVariantObj.images[0];
//                 } else if (activeVariantObj.image) {
//                   displayImgSrc = activeVariantObj.image;
//                 } else if (activeVariantObj.img) {
//                   displayImgSrc = activeVariantObj.img;
//                 } else if (product.images && product.images[activeIndex]) {
//                   displayImgSrc = product.images[activeIndex].url || product.images[activeIndex];
//                 }
//               }

//               return (
//                 <div
//                   key={product._id}
//                   onClick={() => setQuickViewProduct(product)} 
//                   className="group/card min-w-[168px] max-w-[168px] xs:min-w-[190px] xs:max-w-[190px] sm:min-w-[220px] sm:max-w-[220px] flex-shrink-0 snap-start bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:border-[#C8A253]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out flex flex-col relative overflow-hidden cursor-pointer"
//                 >
//                   <div className="relative bg-gradient-to-b from-[#FAFAFA] to-white aspect-square p-4 sm:p-5 flex items-center justify-center overflow-hidden">
//                     <img
//                       src={displayImgSrc}
//                       alt={product.name}
//                       className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover/card:scale-105"
//                     />
//                   </div>

//                   <div className="flex flex-col flex-1 p-3 sm:p-4">
                    
//                     {/* ⚡ Color Dots Logic */}
//                     {realColors.length > 0 && (
//                       <div className="flex items-center gap-1.5 mb-2 h-4">
//                         {realColors.map((colorItem, idx) => {
//                           const cleanHex = getCleanColorHex(colorItem);
//                           const isActive = activeIndex === idx;
//                           return (
//                             <button
//                               key={idx}
//                               type="button"
//                               onMouseEnter={(e) => { 
//                                 e.stopPropagation(); 
//                                 setActiveVariants((prev) => ({ ...prev, [product._id]: { item: colorItem, index: idx } }));
//                               }}
//                               onClick={(e) => { 
//                                 e.stopPropagation(); 
//                                 setActiveVariants((prev) => ({ ...prev, [product._id]: { item: colorItem, index: idx } }));
//                               }}
//                               onTouchStart={(e) => { 
//                                 e.stopPropagation(); 
//                                 setActiveVariants((prev) => ({ ...prev, [product._id]: { item: colorItem, index: idx } }));
//                               }}
//                               className={`w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-full border transition-all duration-300 cursor-pointer shadow-sm ${
//                                 isActive
//                                   ? 'border-gray-900 ring-[1.5px] ring-gray-400 ring-offset-1 scale-110'
//                                   : 'border-gray-300 opacity-70 hover:opacity-100 hover:scale-110'
//                               }`}
//                               style={{ backgroundColor: cleanHex }}
//                               title={typeof colorItem === 'string' ? colorItem : (colorItem.color || colorItem.title || colorItem.name)}
//                             />
//                           );
//                         })}
//                       </div>
//                     )}

//                     <h3 className="text-[12px] sm:text-[13px] font-medium text-gray-900 line-clamp-2 leading-snug mb-2 min-h-[2.2rem] group-hover/card:text-[#8B6914] transition-colors">
//                       {product.name}
//                     </h3>

//                     <div className="mt-auto flex items-center justify-between gap-2">
//                       {product.price && <p className="text-[14px] sm:text-[16px] font-bold text-gray-900 tracking-tight">₹{product.price.toLocaleString("en-IN")}</p>}
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <button onClick={(e) => handleAddToCart(e, product._id)} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"><ShoppingBag size={14} /></button>
//                         <button onClick={(e) => handleWishlist(e, product._id)} className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all ${isWishlisted ? "border-red-500 bg-red-50 text-red-500" : "border-gray-200 text-gray-500"}`}><Heart size={14} className={isWishlisted ? "fill-red-500" : ""} /></button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <button onClick={() => scroll("right")} className="absolute -right-1.5 sm:-right-5 top-[38%] -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:text-[#C8A253] cursor-pointer">
//             <ChevronRight size={18} />
//           </button>
//         </div>
//       </div>

//       {quickViewProduct && (
//         <QuickModel
//           isOpen={!!quickViewProduct}
//           onClose={() => setQuickViewProduct(null)}
//           product={quickViewProduct}
//         />
//       )}
//     </section>
//   );
// };

// export default RecentlyViewed;

import React, { useState, useEffect, useRef, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Heart,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";

const getColorName = (item, index) =>
  typeof item === "string"
    ? item
    : item?.color ||
      item?.name ||
      item?.title ||
      item?.variantName ||
      item?.option ||
      item?.value ||
      `Color ${index + 1}`;

const getCleanColorHex = (item) => {
  if (!item) return "#111111";

  const raw = String(
    typeof item === "string"
      ? item
      : item.colorCode ||
        item.hex ||
        getColorName(item, 0)
  ).trim().toLowerCase();

  if (raw.startsWith("#") || raw.startsWith("rgb")) return raw;

  const colors = {
    black: "#111111",
    "matte black": "#1a1a1a",
    "vintage black": "#181818",
    "black & brass": "#1A1A18",
    white: "#FFFFFF",
    "lunar white": "#F9F9F9",
    pearl: "#F0EAD6",
    cream: "#E8E4D9",
    beige: "#F5F5DC",
    ivory: "#FFFFF0",
    gold: "#C8A253",
    "rose gold": "#B76E79",
    brass: "#B5944B",
    silver: "#D1D5DB",
    platinum: "#E5E4E2",
    titanium: "#878681",
    grey: "#6B7280",
    gray: "#6B7280",
    graphite: "#383838",
    charcoal: "#36454F",
    "sage green": "#738276",
    olive: "#556B2F",
    green: "#166534",
    "midnight blue": "#191970",
    navy: "#000080",
    blue: "#1e3a8a",
    brown: "#5C4033",
    walnut: "#773f1a",
    copper: "#B87333",
    red: "#b91c1c",
    pink: "#db2777",
    purple: "#7e22ce",
    yellow: "#eab308",
  };

  if (colors[raw]) return colors[raw];

  for (const color of [
    "black", "white", "gold", "silver", "grey", "gray",
    "blue", "green", "red", "brown", "cream", "beige",
    "brass", "pink", "purple",
  ]) {
    if (raw.includes(color)) return colors[color];
  }

  if (raw.includes("wood") || raw.includes("walnut")) {
    return "#5C4033";
  }

  return "#111111";
};

const imageUrl = (image) =>
  typeof image === "string" ? image : image?.url;

const getDefaultImage = (product) =>
  imageUrl(product.image) ||
  imageUrl(product.images?.[0]) ||
  imageUrl(product.variants?.[0]?.images?.[0]) ||
  "https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image";

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeVariants, setActiveVariants] = useState({});

  const sliderRef = useRef(null);
  const headingId = useId();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const loadHistory = async () => {
      try {
        const stored = JSON.parse(
          localStorage.getItem("recentlyViewed") || "[]"
        );

        const seen = new Set();
        const items = Array.isArray(stored)
          ? stored.filter((item) => {
              if (!item?._id || seen.has(item._id)) return false;
              seen.add(item._id);
              return true;
            })
          : [];

        if (cancelled) return;
        setRecentProducts(items);

        const updatedItems = await Promise.all(
          items.map(async (item) => {
            try {
              const { data } = await axiosInstance.get(
                `/products/${encodeURIComponent(item._id)}`
              );

              return data.success && data.product?._id
                ? data.product
                : item;
            } catch {
              return item;
            }
          })
        );

        if (!cancelled) setRecentProducts(updatedItems);
      } catch (error) {
        console.error("Error loading history:", error);
      }
    };

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setWishlistedItems([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const { data } = await axiosInstance.get("/wishlist");

        if (
          !cancelled &&
          data.success &&
          Array.isArray(data.wishlist)
        ) {
          setWishlistedItems(
            data.wishlist
              .map((item) => item?._id || item)
              .filter(Boolean)
          );
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const scroll = (direction) => {
    sliderRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const selectVariant = (productId, item, index) => {
    setActiveVariants((previous) => ({
      ...previous,
      [productId]: { item, index },
    }));
  };

  const handleAddToCart = async (productId) => {
    try {
      const { data } = await axiosInstance.post("/cart/add", {
        productId,
        quantity: 1,
      });

      if (data.success) {
        window.dispatchEvent(
          new CustomEvent("cartUpdated", {
            detail: { increase: 1 },
          })
        );

        setToastMessage({
          type: "success",
          message: "Added to cart successfully!",
        });
      }
    } catch (error) {
      setToastMessage({
        type: "error",
        message:
          error.response?.data?.message || "Failed to add to cart",
      });
    }
  };

  const handleWishlist = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const wasWishlisted = wishlistedItems.includes(productId);

    setWishlistedItems((previous) =>
      wasWishlisted
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );

    try {
      await axiosInstance.post("/wishlist/toggle", { productId });

      setToastMessage({
        type: "success",
        message: wasWishlisted
          ? "Removed from wishlist"
          : "Added to wishlist!",
      });
    } catch {
      setWishlistedItems((previous) =>
        wasWishlisted
          ? [...new Set([...previous, productId])]
          : previous.filter((id) => id !== productId)
      );

      setToastMessage({
        type: "error",
        message: "Failed to update wishlist",
      });
    }
  };

  if (recentProducts.length === 0) return null;

  return (
    <section
      aria-labelledby={headingId}
      className="bg-white py-8 font-sans"
      style={{
        fontFamily:
          '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {toastMessage && (
        <Toast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 flex items-center gap-2">
              Your Browsing History
            </span>

            <h2
              id={headingId}
              className="text-xl sm:text-2xl md:text-[32px] font-bold text-[#111] mb-2"
            >
              Recently Viewed Products
            </h2>

            <div
              aria-hidden="true"
              className="w-20 h-[2px] bg-[#C8A253] mb-2"
            />
          </div>
        </div>

        <div className="relative group mb-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll recently viewed products left"
            className="absolute -left-1.5 sm:-left-5 top-[38%] -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-all duration-300 hover:text-[#C8A253] cursor-pointer"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div
            ref={sliderRef}
            tabIndex={0}
            role="group"
            aria-label="Recently viewed products"
            className="flex gap-3.5 sm:gap-4 md:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth hide-scrollbar px-1"
          >
            {recentProducts.map((product) => {
              const name = product.name || "Product";
              const productUrl = `/product/${product._id}`;
              const isWishlisted = wishlistedItems.includes(
                product._id
              );

              const realColors =
                product.colors?.length > 0
                  ? product.colors
                  : product.variants?.length > 0
                    ? product.variants
                    : product.colorVariants?.length > 0
                      ? product.colorVariants
                      : [];

              const activeData = activeVariants[product._id];
              const activeIndex = activeData?.index || 0;
              const selectedVariant =
                activeData?.item || realColors[0];

              const displayImage =
                imageUrl(selectedVariant?.images?.[0]) ||
                imageUrl(selectedVariant?.image) ||
                imageUrl(selectedVariant?.img) ||
                imageUrl(product.images?.[activeIndex]) ||
                getDefaultImage(product);

              return (
                <article
                  key={product._id}
                  className="group/card min-w-[168px] max-w-[168px] xs:min-w-[190px] xs:max-w-[190px] sm:min-w-[220px] sm:max-w-[220px] flex-shrink-0 snap-start bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:border-[#C8A253]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out flex flex-col relative overflow-hidden"
                >
                  <Link
                    to={productUrl}
                    aria-label={`View ${name}`}
                    className="relative bg-gradient-to-b from-[#FAFAFA] to-white aspect-square p-4 sm:p-5 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={displayImage}
                      alt={name}
                      width={400}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover/card:scale-105"
                    />
                  </Link>

                  <div className="flex flex-col flex-1 p-3 sm:p-4">
                    {realColors.length > 0 && (
                      <div
                        role="group"
                        aria-label={`${name} color previews`}
                        className="flex items-center gap-1.5 mb-2 min-h-4 flex-wrap"
                      >
                        {realColors.map((colorItem, index) => {
                          const colorName = getColorName(
                            colorItem,
                            index
                          );

                          return (
                            <button
                              key={colorItem?._id || index}
                              type="button"
                              aria-label={`Preview ${name} in ${colorName}`}
                              aria-pressed={activeIndex === index}
                              title={colorName}
                              onMouseEnter={() =>
                                selectVariant(
                                  product._id,
                                  colorItem,
                                  index
                                )
                              }
                              onFocus={() =>
                                selectVariant(
                                  product._id,
                                  colorItem,
                                  index
                                )
                              }
                              onClick={() =>
                                selectVariant(
                                  product._id,
                                  colorItem,
                                  index
                                )
                              }
                              className={`w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-full border transition-all duration-300 cursor-pointer shadow-sm ${
                                activeIndex === index
                                  ? "border-gray-900 ring-[1.5px] ring-gray-400 ring-offset-1 scale-110"
                                  : "border-gray-300 opacity-70 hover:opacity-100 hover:scale-110"
                              }`}
                              style={{
                                backgroundColor:
                                  getCleanColorHex(colorItem),
                              }}
                            />
                          );
                        })}
                      </div>
                    )}

                    <h3 className="text-[12px] sm:text-[13px] font-medium text-gray-900 line-clamp-2 leading-snug mb-2 min-h-[2.2rem] group-hover/card:text-[#8B6914] transition-colors">
                      <Link
                        to={productUrl}
                        className="hover:underline"
                      >
                        {name}
                      </Link>
                    </h3>

                    <div className="mt-auto flex items-center justify-between gap-2">
                      {Number(product.price) > 0 && (
                        <p className="text-[14px] sm:text-[16px] font-bold text-gray-900 tracking-tight">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>
                      )}

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleAddToCart(product._id)
                          }
                          aria-label={`Add ${name} to cart`}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"
                        >
                          <ShoppingBag
                            size={14}
                            aria-hidden="true"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleWishlist(product._id)
                          }
                          aria-label={
                            isWishlisted
                              ? `Remove ${name} from wishlist`
                              : `Add ${name} to wishlist`
                          }
                          aria-pressed={isWishlisted}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all ${
                            isWishlisted
                              ? "border-red-500 bg-red-50 text-red-500"
                              : "border-gray-200 text-gray-500"
                          }`}
                        >
                          <Heart
                            size={14}
                            aria-hidden="true"
                            className={
                              isWishlisted ? "fill-red-500" : ""
                            }
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll recently viewed products right"
            className="absolute -right-1.5 sm:-right-5 top-[38%] -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-all duration-300 hover:text-[#C8A253] cursor-pointer"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;