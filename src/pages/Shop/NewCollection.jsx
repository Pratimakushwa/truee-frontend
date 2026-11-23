

// import React, { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import ShopProductCard from "./ShopProductCard";
// import QuickViewModal from "../Product/ProductDetailModel";
// import Footer from "../Home/Footer";
// import Header1 from "../Home/Header1";
// import Toast from "../../components/Toast";
// import {
//   Link,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import {
//   Filter,
//   Search,
//   ChevronDown,
//   ChevronUp,
//   X,
// } from "lucide-react";
// import { motion } from "framer-motion";

// const getPageFromSearch = (search) => {
//   const value = new URLSearchParams(search).get("page") || "1";
//   const page = Number(value);

//   return /^\d+$/.test(value) &&
//     Number.isSafeInteger(page) &&
//     page > 0
//     ? page
//     : 1;
// };

// const normalize = (value) =>
//   String(value || "").trim().toLowerCase();

// const getProductPrice = (product) => {
//   if (product.flashDeal?.isActive) {
//     const dealPrice = Number(product.flashDeal.dealPrice);

//     if (Number.isFinite(dealPrice)) {
//       return dealPrice;
//     }
//   }

//   const price = Number(product.price) || 0;
//   const discount = Number(product.discountPrice) || 0;

//   return price - discount;
// };

// const getUrlFilters = (search) => {
//   const params = new URLSearchParams(search);

//   return {
//     categories: params.getAll("category").filter(Boolean),
//     brands: params.getAll("brand").filter(Boolean),
//     search: params.get("search") || "",
//   };
// };

// export default function NewCollection() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const initialFilters = getUrlFilters(location.search);

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [toastMessage, setToastMessage] = useState(null);

//   const [searchTerm, setSearchTerm] = useState(
//     initialFilters.search
//   );
//   const [selectedCategories, setSelectedCategories] = useState(
//     initialFilters.categories
//   );
//   const [selectedBrands, setSelectedBrands] = useState(
//     initialFilters.brands
//   );

//   const [priceRange, setPriceRange] = useState({
//     min: 0,
//     max: 1000000,
//   });
//   const [maxPriceLimit, setMaxPriceLimit] = useState(100000);

//   const [sortOrder, setSortOrder] = useState("best-selling");
//   const [inStockOnly, setInStockOnly] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const [isCatOpen, setIsCatOpen] = useState(true);
//   const [isBrandOpen, setIsBrandOpen] = useState(true);
//   const [isPriceOpen, setIsPriceOpen] = useState(true);

//   const currentPage = getPageFromSearch(location.search);
//   const itemsPerPage = 12;

//   useEffect(() => {
//     let cancelled = false;

//     const fetchAllProducts = async () => {
//       try {
//         setLoading(true);
//         setLoadError("");

//         const { data } = await axiosInstance.get("/products");

//         if (cancelled) return;

//         if (!data?.success || !Array.isArray(data.products)) {
//           throw new Error("Invalid product response");
//         }

//         const productList = data.products.filter(
//           (product) => product?._id
//         );

//         setProducts(productList);

//         const validPrices = productList
//           .flatMap((product) => [
//             Number(product.price),
//             getProductPrice(product),
//           ])
//           .filter(
//             (price) => Number.isFinite(price) && price >= 0
//           );

//         const maxPrice =
//           validPrices.length > 0
//             ? Math.max(1, ...validPrices)
//             : 100000;

//         setMaxPriceLimit(maxPrice);
//         setPriceRange({ min: 0, max: maxPrice });
//       } catch (error) {
//         if (!cancelled) {
//           console.error("Collection load error:", error);
//           setLoadError(
//             "Unable to load products. Please refresh and try again."
//           );
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchAllProducts();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const allCategories = useMemo(
//     () => [
//       ...new Set(
//         products
//           .map((product) =>
//             typeof product.category === "string"
//               ? product.category.trim()
//               : ""
//           )
//           .filter(Boolean)
//       ),
//     ],
//     [products]
//   );

//   const allBrands = useMemo(
//     () => [
//       ...new Set(
//         products
//           .map((product) =>
//             typeof product.brand === "string"
//               ? product.brand.trim()
//               : ""
//           )
//           .filter(Boolean)
//       ),
//     ],
//     [products]
//   );

//   // Convert existing header navigation state into URL filters.
//   useEffect(() => {
//     const state = location.state;

//     if (!state || state.processed) return;

//     const hasFilterState =
//       Array.isArray(state.categories) ||
//       typeof state.category === "string" ||
//       typeof state.search === "string";

//     if (!hasFilterState) return;

//     const params = new URLSearchParams(location.search);

//     params.delete("category");
//     params.delete("brand");
//     params.delete("search");
//     params.delete("page");

//     const categories = Array.isArray(state.categories)
//       ? state.categories
//       : state.category
//         ? [state.category]
//         : [];

//     categories.filter(Boolean).forEach((category) => {
//       params.append("category", category);
//     });

//     if (state.search) {
//       params.set("search", state.search);
//     }

//     const query = params.toString();

//     navigate(
//       {
//         pathname: location.pathname,
//         search: query ? `?${query}` : "",
//       },
//       {
//         replace: true,
//         state: { ...state, processed: true },
//       }
//     );
//   }, [
//     location.pathname,
//     location.search,
//     location.state,
//     navigate,
//   ]);

//   // Apply URL filters on direct visits, refresh and Back/Forward.
//   useEffect(() => {
//     const filters = getUrlFilters(location.search);

//     setSelectedCategories(filters.categories);
//     setSelectedBrands(filters.brands);
//     setSearchTerm(filters.search);
//   }, [location.search]);

//   const updateUrlFilters = (categories, brands, search) => {
//     const params = new URLSearchParams(location.search);

//     params.delete("category");
//     params.delete("brand");
//     params.delete("search");
//     params.delete("page");

//     categories.forEach((category) => {
//       params.append("category", category);
//     });

//     brands.forEach((brand) => {
//       params.append("brand", brand);
//     });

//     if (search.trim()) {
//       params.set("search", search);
//     }

//     const query = params.toString();

//     navigate(
//       {
//         pathname: location.pathname,
//         search: query ? `?${query}` : "",
//       },
//       { replace: true, state: null }
//     );
//   };

//   const toggleCategory = (category) => {
//     const exists = selectedCategories.some(
//       (item) => normalize(item) === normalize(category)
//     );

//     const nextCategories = exists
//       ? selectedCategories.filter(
//           (item) => normalize(item) !== normalize(category)
//         )
//       : [...selectedCategories, category];

//     setSelectedCategories(nextCategories);

//     updateUrlFilters(
//       nextCategories,
//       selectedBrands,
//       searchTerm
//     );
//   };

//   const toggleBrand = (brand) => {
//     const exists = selectedBrands.some(
//       (item) => normalize(item) === normalize(brand)
//     );

//     const nextBrands = exists
//       ? selectedBrands.filter(
//           (item) => normalize(item) !== normalize(brand)
//         )
//       : [...selectedBrands, brand];

//     setSelectedBrands(nextBrands);

//     updateUrlFilters(
//       selectedCategories,
//       nextBrands,
//       searchTerm
//     );
//   };

//   const handleSearchChange = (event) => {
//     const value = event.target.value;

//     setSearchTerm(value);

//     updateUrlFilters(
//       selectedCategories,
//       selectedBrands,
//       value
//     );
//   };

//   const clearFilters = () => {
//     setSelectedCategories([]);
//     setSelectedBrands([]);
//     setSearchTerm("");
//     setPriceRange({ min: 0, max: maxPriceLimit });
//     setInStockOnly(false);
//     setSortOrder("best-selling");

//     navigate(
//       { pathname: location.pathname, search: "" },
//       { replace: true, state: null }
//     );
//   };

//   const filteredProducts = useMemo(() => {
//     const query = normalize(searchTerm);

//     return products
//       .filter((product) => {
//         const category = normalize(product.category);
//         const brand = normalize(product.brand);
//         const name = normalize(product.name);

//         const matchesCategory =
//           selectedCategories.length === 0 ||
//           selectedCategories.some(
//             (item) => normalize(item) === category
//           );

//         const matchesBrand =
//           selectedBrands.length === 0 ||
//           selectedBrands.some(
//             (item) => normalize(item) === brand
//           );

//         let matchesSearch = true;

//         if (query) {
//           if (
//             query === "smartwatch" ||
//             query === "smartwatches"
//           ) {
//             matchesSearch = [
//               "smartwatch",
//               "luxury",
//               "hybrid",
//               "rugged",
//               "health",
//             ].some(
//               (word) =>
//                 category.includes(word) || name.includes(word)
//             );
//           } else if (
//             query === "soundbar" ||
//             query === "soundbars"
//           ) {
//             if (
//               name.includes("heston 60") ||
//               name.includes("heston 120")
//             ) {
//               matchesSearch = true;
//             } else if (name.includes("heston 200")) {
//               matchesSearch = false;
//             } else {
//               matchesSearch =
//                 category.includes("soundbar") ||
//                 name.includes("soundbar");
//             }
//           } else if (
//             query === "subwoofer" ||
//             query === "subwoofers"
//           ) {
//             if (name.includes("heston 200")) {
//               matchesSearch = true;
//             } else if (
//               name.includes("heston 60") ||
//               name.includes("heston 120")
//             ) {
//               matchesSearch = false;
//             } else {
//               matchesSearch =
//                 category.includes("subwoofer") ||
//                 name.includes("subwoofer");
//             }
//           } else {
//             matchesSearch =
//               name.includes(query) ||
//               brand.includes(query) ||
//               category.includes(query);
//           }
//         }

//         const currentPrice = getProductPrice(product);

//         const minPrice =
//           priceRange.min === "" ? 0 : Number(priceRange.min);

//         const maxPrice =
//           priceRange.max === ""
//             ? maxPriceLimit
//             : Number(priceRange.max);

//         const matchesStock =
//           !inStockOnly || Number(product.stock) > 0;

//         return (
//           matchesCategory &&
//           matchesBrand &&
//           matchesSearch &&
//           currentPrice >= minPrice &&
//           currentPrice <= maxPrice &&
//           matchesStock
//         );
//       })
//       .sort((a, b) => {
//         if (sortOrder === "price-asc") {
//           return getProductPrice(a) - getProductPrice(b);
//         }

//         if (sortOrder === "price-desc") {
//           return getProductPrice(b) - getProductPrice(a);
//         }

//         return 0;
//       });
//   }, [
//     products,
//     selectedCategories,
//     selectedBrands,
//     searchTerm,
//     priceRange,
//     sortOrder,
//     inStockOnly,
//     maxPriceLimit,
//   ]);

//   const totalPages = Math.ceil(
//     filteredProducts.length / itemsPerPage
//   );

//   const safeCurrentPage = Math.min(
//     currentPage,
//     Math.max(1, totalPages)
//   );

//   const displayedProducts = filteredProducts.slice(
//     (safeCurrentPage - 1) * itemsPerPage,
//     safeCurrentPage * itemsPerPage
//   );

//   const getPageNumbers = () => {
//     let start = Math.max(1, safeCurrentPage - 2);
//     const end = Math.min(totalPages, start + 3);

//     if (end - start < 3) {
//       start = Math.max(1, end - 3);
//     }

//     return Array.from(
//       { length: Math.max(0, end - start + 1) },
//       (_, index) => start + index
//     );
//   };

//   const collectionHeading = searchTerm.trim()
//     ? `Results for "${searchTerm.trim()}"`
//     : selectedCategories.length > 0
//       ? selectedCategories.join(", ")
//       : selectedBrands.length > 0
//         ? `${selectedBrands.join(", ")} Products`
//         : "Shop Audio, Smartwatches & Lifestyle Products";

//   const collectionTitle = `${collectionHeading}${
//     safeCurrentPage > 1 ? ` - Page ${safeCurrentPage}` : ""
//   } | Truee`;

//   const collectionDescription = searchTerm.trim()
//     ? `Browse Truee products matching "${searchTerm.trim()}". Explore product details, prices and availability.`
//     : selectedCategories.length > 0
//       ? `Explore ${selectedCategories.join(", ")} at Truee. Browse products, compare prices and view product details.`
//       : selectedBrands.length > 0
//         ? `Explore products from ${selectedBrands.join(", ")} at Truee. View product details, prices and availability.`
//         : "Explore speakers, headphones, earphones, home theater systems, smartwatches, and beauty and wellness products at Truee.";

//   const hasActiveFilters =
//     selectedCategories.length > 0 ||
//     selectedBrands.length > 0 ||
//     Boolean(searchTerm) ||
//     inStockOnly ||
//     Number(priceRange.max) !== maxPriceLimit ||
//     Number(priceRange.min) > 0;

//   const getPageUrl = (page) => {
//     const params = new URLSearchParams(location.search);

//     params.delete("page");

//     if (page > 1) {
//       params.set("page", String(page));
//     }

//     const query = params.toString();

//     return `${location.pathname}${query ? `?${query}` : ""}`;
//   };

//   const resetPagination = () => {
//     navigate(getPageUrl(1), {
//       replace: true,
//       state: null,
//     });
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const canonicalParams = new URLSearchParams();
//   const currentParams = new URLSearchParams(location.search);

//   ["category", "brand", "search"].forEach((key) => {
//     const values = [
//       ...new Set(
//         currentParams
//           .getAll(key)
//           .map((value) => value.trim())
//           .filter(Boolean)
//       ),
//     ].sort();

//     values.forEach((value) => {
//       canonicalParams.append(key, value);
//     });
//   });

//   if (safeCurrentPage > 1) {
//     canonicalParams.set("page", String(safeCurrentPage));
//   }

//   const canonicalQuery = canonicalParams.toString();
//   const canonicalUrl = `https://truee.in/shop${
//     canonicalQuery ? `?${canonicalQuery}` : ""
//   }`;

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#111]">
//       <title>{collectionTitle}</title>
//       <meta
//         name="description"
//         content={collectionDescription}
//       />
//       <link rel="canonical" href={canonicalUrl} />

//       <Header1 />

//       <Toast
//         toast={toastMessage}
//         onClose={() => setToastMessage(null)}
//       />

//       <div className="w-full bg-white border-b border-gray-100 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="max-w-[1600px] mx-auto flex flex-col items-center text-center relative z-10"
//         >
//           <nav
//             aria-label="Breadcrumb"
//             className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-gray-400 flex items-center justify-center gap-2"
//           >
//             <Link
//               to="/"
//               className="hover:text-black transition-colors"
//             >
//               Home
//             </Link>

//             <span aria-hidden="true" className="opacity-40">
//               /
//             </span>

//             <span aria-current="page" className="text-black">
//               Collection
//             </span>
//           </nav>

//           <h1
//             className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-black mb-4"
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontWeight: 500,
//             }}
//           >
//             {collectionHeading}
//           </h1>

//           <p className="max-w-3xl text-sm text-gray-500 leading-relaxed mb-6">
//             {collectionDescription}
//           </p>

//           <div
//             aria-hidden="true"
//             className="flex items-center gap-3 justify-center"
//           >
//             <div className="h-[1px] w-12 bg-[#C8A253]" />
//             <div className="w-1.5 h-1.5 rounded-full bg-[#C8A253]" />
//             <div className="h-[1px] w-12 bg-[#C8A253]" />
//           </div>
//         </motion.div>
//       </div>

//       <main className="relative w-full max-w-[1600px] bg-[#fcfbfb] mx-auto px-4 sm:px-6 md:px-12 py-12 flex flex-col lg:flex-row items-start gap-10 xl:gap-16">
//         <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[85%] max-w-[300px]">
//           <button
//             type="button"
//             aria-expanded={isSidebarOpen}
//             aria-controls="collection-filters"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="flex items-center justify-center gap-2 bg-[#111] text-white py-3.5 rounded-full w-full text-[11px] font-bold uppercase tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-gray-800 transition-all active:scale-95"
//           >
//             {isSidebarOpen ? (
//               <X size={18} aria-hidden="true" />
//             ) : (
//               <Filter size={18} aria-hidden="true" />
//             )}

//             <span className="mt-[2px]">
//               {isSidebarOpen ? "Close" : "Filters & Sorting"}
//             </span>
//           </button>
//         </div>

//         <aside
//           id="collection-filters"
//           aria-label="Product filters"
//           className={`lg:w-[280px] xl:w-[300px] shrink-0 lg:block lg:sticky lg:top-[120px] lg:self-start lg:z-30 lg:inset-auto lg:bg-transparent lg:p-0 ${
//             isSidebarOpen
//               ? "fixed inset-0 z-[60] bg-[#fafafa] overflow-y-auto p-4 pb-28 block w-full"
//               : "hidden"
//           }`}
//         >
//           <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-full">
//             <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
//               <div className="flex items-center gap-3">
//                 <Filter
//                   size={18}
//                   aria-hidden="true"
//                   className="text-orange-600"
//                 />

//                 <div>
//                   <h2 className="font-bold text-sm uppercase">
//                     Filters
//                   </h2>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                     Refine your list
//                   </p>
//                 </div>
//               </div>

//               {hasActiveFilters && (
//                 <button
//                   type="button"
//                   onClick={clearFilters}
//                   className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline decoration-gray-300 underline-offset-2"
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>

//             <div className="mb-8">
//               <label
//                 htmlFor="collection-search"
//                 className="sr-only"
//               >
//                 Search products
//               </label>

//               <div className="relative group">
//                 <input
//                   id="collection-search"
//                   type="search"
//                   placeholder="Search collection..."
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3.5 px-4 pl-11 text-[13px] focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
//                 />

//                 <Search
//                   size={16}
//                   aria-hidden="true"
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
//                 />
//               </div>
//             </div>

//             <div className="mb-6 border-b border-gray-100 pb-6">
//               <h3>
//                 <button
//                   type="button"
//                   aria-expanded={isCatOpen}
//                   aria-controls="collection-category-options"
//                   onClick={() => setIsCatOpen(!isCatOpen)}
//                   className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group"
//                 >
//                   Category
//                   {isCatOpen ? (
//                     <ChevronUp size={14} aria-hidden="true" />
//                   ) : (
//                     <ChevronDown size={14} aria-hidden="true" />
//                   )}
//                 </button>
//               </h3>

//               <div
//                 id="collection-category-options"
//                 hidden={!isCatOpen}
//               >
//                 <div className="flex flex-col gap-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar pt-2">
//                   {allCategories.map((category) => {
//                     const checked = selectedCategories.some(
//                       (item) =>
//                         normalize(item) === normalize(category)
//                     );

//                     return (
//                       <label
//                         key={category}
//                         className="flex items-center gap-4 cursor-pointer group"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={checked}
//                           onChange={() =>
//                             toggleCategory(category)
//                           }
//                           className="accent-black w-4 h-4"
//                         />

//                         <span
//                           className={`text-[13px] capitalize transition-colors ${
//                             checked
//                               ? "font-semibold text-black"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           {category}
//                         </span>
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6 border-b border-gray-100 pb-6">
//               <h3>
//                 <button
//                   type="button"
//                   aria-expanded={isBrandOpen}
//                   aria-controls="collection-brand-options"
//                   onClick={() => setIsBrandOpen(!isBrandOpen)}
//                   className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group"
//                 >
//                   Brand
//                   {isBrandOpen ? (
//                     <ChevronUp size={14} aria-hidden="true" />
//                   ) : (
//                     <ChevronDown size={14} aria-hidden="true" />
//                   )}
//                 </button>
//               </h3>

//               <div
//                 id="collection-brand-options"
//                 hidden={!isBrandOpen}
//               >
//                 <div className="flex flex-col gap-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar pt-2">
//                   {allBrands.map((brand) => {
//                     const checked = selectedBrands.some(
//                       (item) =>
//                         normalize(item) === normalize(brand)
//                     );

//                     return (
//                       <label
//                         key={brand}
//                         className="flex items-center gap-4 cursor-pointer group"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={checked}
//                           onChange={() => toggleBrand(brand)}
//                           className="accent-black w-4 h-4"
//                         />

//                         <span
//                           className={`text-[13px] uppercase transition-colors ${
//                             checked
//                               ? "font-semibold text-black"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           {brand}
//                         </span>
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3>
//                 <button
//                   type="button"
//                   aria-expanded={isPriceOpen}
//                   aria-controls="collection-price-options"
//                   onClick={() => setIsPriceOpen(!isPriceOpen)}
//                   className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group"
//                 >
//                   Price Range
//                   {isPriceOpen ? (
//                     <ChevronUp size={14} aria-hidden="true" />
//                   ) : (
//                     <ChevronDown size={14} aria-hidden="true" />
//                   )}
//                 </button>
//               </h3>

//               <div
//                 id="collection-price-options"
//                 hidden={!isPriceOpen}
//               >
//                 <div className="pt-2 space-y-5">
//                   <input
//                     type="range"
//                     aria-label="Maximum price"
//                     min="0"
//                     max={maxPriceLimit}
//                     value={
//                       priceRange.max === ""
//                         ? maxPriceLimit
//                         : Math.min(
//                             maxPriceLimit,
//                             Math.max(0, Number(priceRange.max))
//                           )
//                     }
//                     onChange={(event) => {
//                       setPriceRange((previous) => ({
//                         ...previous,
//                         max: event.target.value,
//                       }));
//                       resetPagination();
//                     }}
//                     className="w-full h-[4px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:h-[6px] transition-all"
//                   />

//                   <div className="flex items-center justify-between gap-4">
//                     <div className="w-full">
//                       <label
//                         htmlFor="collection-min-price"
//                         className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block"
//                       >
//                         Min (₹)
//                       </label>

//                       <input
//                         id="collection-min-price"
//                         type="number"
//                         min="0"
//                         value={priceRange.min}
//                         onChange={(event) => {
//                           setPriceRange((previous) => ({
//                             ...previous,
//                             min: event.target.value,
//                           }));
//                           resetPagination();
//                         }}
//                         className="w-full bg-[#f4f4f4] border border-transparent rounded-lg py-2.5 px-3 text-[12px] font-semibold focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
//                       />
//                     </div>

//                     <span
//                       aria-hidden="true"
//                       className="text-gray-300 mt-5"
//                     >
//                       -
//                     </span>

//                     <div className="w-full">
//                       <label
//                         htmlFor="collection-max-price"
//                         className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block"
//                       >
//                         Max (₹)
//                       </label>

//                       <input
//                         id="collection-max-price"
//                         type="number"
//                         min="0"
//                         value={priceRange.max}
//                         onChange={(event) => {
//                           setPriceRange((previous) => ({
//                             ...previous,
//                             max: event.target.value,
//                           }));
//                           resetPagination();
//                         }}
//                         className="w-full bg-[#f4f4f4] border border-transparent rounded-lg py-2.5 px-3 text-[12px] font-semibold focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-2">
//               <label className="flex items-center justify-between cursor-pointer group">
//                 <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black">
//                   In Stock Only
//                 </span>

//                 <input
//                   type="checkbox"
//                   checked={inStockOnly}
//                   onChange={(event) => {
//                     setInStockOnly(event.target.checked);
//                     resetPagination();
//                   }}
//                   className="accent-black w-5 h-5"
//                 />
//               </label>
//             </div>
//           </div>
//         </aside>

//         <div className="flex-1 w-full flex flex-col">
//           <h2 className="sr-only">Products</h2>

//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-gray-100 gap-4">
//             <p
//               role="status"
//               className="text-[13px] font-medium text-gray-400"
//             >
//               {loading ? (
//                 "Loading products..."
//               ) : loadError ? (
//                 "Products unavailable"
//               ) : (
//                 <>
//                   Showing
//                   <span className="text-black font-bold mx-1">
//                     {filteredProducts.length}
//                   </span>
//                   products
//                 </>
//               )}
//             </p>

//             <label
//               htmlFor="collection-sort"
//               className="sr-only"
//             >
//               Sort products
//             </label>

//             <select
//               id="collection-sort"
//               value={sortOrder}
//               onChange={(event) => {
//                 setSortOrder(event.target.value);
//                 resetPagination();
//               }}
//               className="bg-transparent border-none text-[11px] font-bold uppercase tracking-widest text-black focus:outline-none cursor-pointer"
//             >
//               <option value="best-selling">
//                 Sort by: Featured
//               </option>
//               <option value="price-asc">
//                 Price: Low to High
//               </option>
//               <option value="price-desc">
//                 Price: High to Low
//               </option>
//             </select>
//           </div>

//           {loading ? (
//             <div className="py-20 text-center">
//               Loading...
//             </div>
//           ) : loadError ? (
//             <div role="alert" className="py-20 text-center">
//               {loadError}
//             </div>
//           ) : filteredProducts.length === 0 ? (
//             <div className="py-20 text-center">
//               <p>No products match your filters.</p>

//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="mt-4 underline"
//               >
//                 Clear filters
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-start">
//                 {displayedProducts.map((product) => (
//                   <ShopProductCard
//                     key={product._id}
//                     product={product}
//                     onQuickView={setSelectedProduct}
//                   />
//                 ))}
//               </div>

//               {totalPages > 1 && (
//                 <nav
//                   aria-label="Product pagination"
//                   className="flex flex-wrap justify-center items-center gap-3 mt-16 mb-24 lg:mb-8"
//                 >
//                   {safeCurrentPage > 1 ? (
//                     <Link
//                       to={getPageUrl(safeCurrentPage - 1)}
//                       onClick={scrollToTop}
//                       className="px-3 py-2 rounded-full text-xs bg-[#f4f4f4]"
//                     >
//                       Previous
//                     </Link>
//                   ) : (
//                     <span
//                       aria-disabled="true"
//                       className="px-3 py-2 rounded-full text-xs bg-[#f4f4f4] opacity-40 cursor-not-allowed"
//                     >
//                       Previous
//                     </span>
//                   )}

//                   {getPageNumbers().map((page) => (
//                     <Link
//                       key={page}
//                       to={getPageUrl(page)}
//                       aria-label={`Go to page ${page}`}
//                       aria-current={
//                         safeCurrentPage === page
//                           ? "page"
//                           : undefined
//                       }
//                       onClick={scrollToTop}
//                       className={`w-10 h-10 flex items-center justify-center rounded-full text-[13px] font-bold transition-all ${
//                         safeCurrentPage === page
//                           ? "bg-black text-white shadow-md"
//                           : "bg-[#f4f4f4] text-gray-500 hover:bg-gray-200"
//                       }`}
//                     >
//                       {page}
//                     </Link>
//                   ))}

//                   {safeCurrentPage < totalPages ? (
//                     <Link
//                       to={getPageUrl(safeCurrentPage + 1)}
//                       onClick={scrollToTop}
//                       className="px-3 py-2 rounded-full text-xs bg-[#f4f4f4]"
//                     >
//                       Next
//                     </Link>
//                   ) : (
//                     <span
//                       aria-disabled="true"
//                       className="px-3 py-2 rounded-full text-xs bg-[#f4f4f4] opacity-40 cursor-not-allowed"
//                     >
//                       Next
//                     </span>
//                   )}
//                 </nav>
//               )}
//             </>
//           )}
//         </div>
//       </main>

//       {selectedProduct && (
//         <QuickViewModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}

//       <Footer />
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ShopProductCard from "./ShopProductCard";
import QuickViewModal from "../Product/ProductDetailModel";
import Footer from "../Home/Footer";
import Header1 from "../Home/Header1";
import Toast from "../../components/Toast";
import ManagedPageSeo from "../../components/ManagedPageSeo";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const getPageFromSearch = (search) => {
  const value = new URLSearchParams(search).get("page") || "1";
  const page = Number(value);

  return /^\d+$/.test(value) &&
    Number.isSafeInteger(page) &&
    page > 0
    ? page
    : 1;
};

const normalize = (value) =>
  String(value || "").trim().toLowerCase();

const getProductPrice = (product) => {
  if (product.flashDeal?.isActive) {
    const dealPrice = Number(product.flashDeal.dealPrice);

    if (Number.isFinite(dealPrice)) {
      return dealPrice;
    }
  }

  const price = Number(product.price) || 0;
  const discount = Number(product.discountPrice) || 0;

  return price - discount;
};

const getUrlFilters = (search) => {
  const params = new URLSearchParams(search);

  return {
    categories: params.getAll("category").filter(Boolean),
    brands: params.getAll("brand").filter(Boolean),
    search: params.get("search") || "",
  };
};

export default function NewCollection() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFilters = getUrlFilters(location.search);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [searchTerm, setSearchTerm] = useState(
    initialFilters.search
  );

  const [selectedCategories, setSelectedCategories] = useState(
    initialFilters.categories
  );

  const [selectedBrands, setSelectedBrands] = useState(
    initialFilters.brands
  );

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000000,
  });

  const [maxPriceLimit, setMaxPriceLimit] = useState(100000);

  const [sortOrder, setSortOrder] = useState("best-selling");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isCatOpen, setIsCatOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const currentPage = getPageFromSearch(location.search);
  const itemsPerPage = 12;

  useEffect(() => {
    let cancelled = false;

    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const { data } = await axiosInstance.get("/products");

        if (cancelled) return;

        if (!data?.success || !Array.isArray(data.products)) {
          throw new Error("Invalid product response");
        }

        const productList = data.products.filter(
          (product) => product?._id
        );

        setProducts(productList);

        const validPrices = productList
          .flatMap((product) => [
            Number(product.price),
            getProductPrice(product),
          ])
          .filter(
            (price) => Number.isFinite(price) && price >= 0
          );

        const maxPrice =
          validPrices.length > 0
            ? Math.max(1, ...validPrices)
            : 100000;

        setMaxPriceLimit(maxPrice);
        setPriceRange({ min: 0, max: maxPrice });
      } catch (error) {
        if (!cancelled) {
          console.error("Collection load error:", error);

          setLoadError(
            "Unable to load products. Please refresh and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAllProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const allCategories = useMemo(
    () => [
      ...new Set(
        products
          .map((product) =>
            typeof product.category === "string"
              ? product.category.trim()
              : ""
          )
          .filter(Boolean)
      ),
    ],
    [products]
  );

  const allBrands = useMemo(
    () => [
      ...new Set(
        products
          .map((product) =>
            typeof product.brand === "string"
              ? product.brand.trim()
              : ""
          )
          .filter(Boolean)
      ),
    ],
    [products]
  );

  // Convert existing header navigation state into URL filters.
  useEffect(() => {
    const state = location.state;

    if (!state || state.processed) return;

    const hasFilterState =
      Array.isArray(state.categories) ||
      typeof state.category === "string" ||
      typeof state.search === "string";

    if (!hasFilterState) return;

    const params = new URLSearchParams(location.search);

    params.delete("category");
    params.delete("brand");
    params.delete("search");
    params.delete("page");

    const categories = Array.isArray(state.categories)
      ? state.categories
      : state.category
        ? [state.category]
        : [];

    categories.filter(Boolean).forEach((category) => {
      params.append("category", category);
    });

    if (state.search) {
      params.set("search", state.search);
    }

    const query = params.toString();

    navigate(
      {
        pathname: location.pathname,
        search: query ? `?${query}` : "",
      },
      {
        replace: true,
        state: { ...state, processed: true },
      }
    );
  }, [
    location.pathname,
    location.search,
    location.state,
    navigate,
  ]);

  // Apply URL filters on direct visits, refresh and Back/Forward.
  useEffect(() => {
    const filters = getUrlFilters(location.search);

    setSelectedCategories(filters.categories);
    setSelectedBrands(filters.brands);
    setSearchTerm(filters.search);
  }, [location.search]);

  const updateUrlFilters = (categories, brands, search) => {
    const params = new URLSearchParams(location.search);

    params.delete("category");
    params.delete("brand");
    params.delete("search");
    params.delete("page");

    categories.forEach((category) => {
      params.append("category", category);
    });

    brands.forEach((brand) => {
      params.append("brand", brand);
    });

    if (search.trim()) {
      params.set("search", search);
    }

    const query = params.toString();

    navigate(
      {
        pathname: location.pathname,
        search: query ? `?${query}` : "",
      },
      { replace: true, state: null }
    );
  };

  const toggleCategory = (category) => {
    const exists = selectedCategories.some(
      (item) => normalize(item) === normalize(category)
    );

    const nextCategories = exists
      ? selectedCategories.filter(
          (item) => normalize(item) !== normalize(category)
        )
      : [...selectedCategories, category];

    setSelectedCategories(nextCategories);

    updateUrlFilters(
      nextCategories,
      selectedBrands,
      searchTerm
    );
  };

  const toggleBrand = (brand) => {
    const exists = selectedBrands.some(
      (item) => normalize(item) === normalize(brand)
    );

    const nextBrands = exists
      ? selectedBrands.filter(
          (item) => normalize(item) !== normalize(brand)
        )
      : [...selectedBrands, brand];

    setSelectedBrands(nextBrands);

    updateUrlFilters(
      selectedCategories,
      nextBrands,
      searchTerm
    );
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearchTerm(value);

    updateUrlFilters(
      selectedCategories,
      selectedBrands,
      value
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearchTerm("");
    setPriceRange({ min: 0, max: maxPriceLimit });
    setInStockOnly(false);
    setSortOrder("best-selling");

    navigate(
      { pathname: location.pathname, search: "" },
      { replace: true, state: null }
    );
  };

  const filteredProducts = useMemo(() => {
    const query = normalize(searchTerm);

    return products
      .filter((product) => {
        const category = normalize(product.category);
        const brand = normalize(product.brand);
        const name = normalize(product.name);

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.some(
            (item) => normalize(item) === category
          );

        const matchesBrand =
          selectedBrands.length === 0 ||
          selectedBrands.some(
            (item) => normalize(item) === brand
          );

        let matchesSearch = true;

        if (query) {
          if (
            query === "smartwatch" ||
            query === "smartwatches"
          ) {
            matchesSearch = [
              "smartwatch",
              "luxury",
              "hybrid",
              "rugged",
              "health",
            ].some(
              (word) =>
                category.includes(word) || name.includes(word)
            );
          } else if (
            query === "soundbar" ||
            query === "soundbars"
          ) {
            if (
              name.includes("heston 60") ||
              name.includes("heston 120")
            ) {
              matchesSearch = true;
            } else if (name.includes("heston 200")) {
              matchesSearch = false;
            } else {
              matchesSearch =
                category.includes("soundbar") ||
                name.includes("soundbar");
            }
          } else if (
            query === "subwoofer" ||
            query === "subwoofers"
          ) {
            if (name.includes("heston 200")) {
              matchesSearch = true;
            } else if (
              name.includes("heston 60") ||
              name.includes("heston 120")
            ) {
              matchesSearch = false;
            } else {
              matchesSearch =
                category.includes("subwoofer") ||
                name.includes("subwoofer");
            }
          } else {
            matchesSearch =
              name.includes(query) ||
              brand.includes(query) ||
              category.includes(query);
          }
        }

        const currentPrice = getProductPrice(product);

        const minPrice =
          priceRange.min === "" ? 0 : Number(priceRange.min);

        const maxPrice =
          priceRange.max === ""
            ? maxPriceLimit
            : Number(priceRange.max);

        const matchesStock =
          !inStockOnly || Number(product.stock) > 0;

        return (
          matchesCategory &&
          matchesBrand &&
          matchesSearch &&
          currentPrice >= minPrice &&
          currentPrice <= maxPrice &&
          matchesStock
        );
      })
      .sort((a, b) => {
        if (sortOrder === "price-asc") {
          return getProductPrice(a) - getProductPrice(b);
        }

        if (sortOrder === "price-desc") {
          return getProductPrice(b) - getProductPrice(a);
        }

        return 0;
      });
  }, [
    products,
    selectedCategories,
    selectedBrands,
    searchTerm,
    priceRange,
    sortOrder,
    inStockOnly,
    maxPriceLimit,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(1, totalPages)
  );

  const displayedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    let start = Math.max(1, safeCurrentPage - 2);
    const end = Math.min(totalPages, start + 3);

    if (end - start < 3) {
      start = Math.max(1, end - 3);
    }

    return Array.from(
      { length: Math.max(0, end - start + 1) },
      (_, index) => start + index
    );
  };

  const collectionHeading = searchTerm.trim()
    ? `Results for "${searchTerm.trim()}"`
    : selectedCategories.length > 0
      ? selectedCategories.join(", ")
      : selectedBrands.length > 0
        ? `${selectedBrands.join(", ")} Products`
        : "Shop Audio, Smartwatches & Lifestyle Products";

  const collectionTitle = `${collectionHeading}${
    safeCurrentPage > 1 ? ` - Page ${safeCurrentPage}` : ""
  } | Truee`;

  const collectionDescription = searchTerm.trim()
    ? `Browse Truee products matching "${searchTerm.trim()}". Explore product details, prices and availability.`
    : selectedCategories.length > 0
      ? `Explore ${selectedCategories.join(", ")} at Truee. Browse products, compare prices and view product details.`
      : selectedBrands.length > 0
        ? `Explore products from ${selectedBrands.join(", ")} at Truee. View product details, prices and availability.`
        : "Explore speakers, headphones, earphones, home theater systems, smartwatches, and beauty and wellness products at Truee.";

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    Boolean(searchTerm) ||
    inStockOnly ||
    Number(priceRange.max) !== maxPriceLimit ||
    Number(priceRange.min) > 0;

  const getPageUrl = (page) => {
    const params = new URLSearchParams(location.search);

    params.delete("page");

    if (page > 1) {
      params.set("page", String(page));
    }

    const query = params.toString();

    return `${location.pathname}${query ? `?${query}` : ""}`;
  };

  const resetPagination = () => {
    navigate(getPageUrl(1), {
      replace: true,
      state: null,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canonicalParams = new URLSearchParams();
  const currentParams = new URLSearchParams(location.search);

  ["category", "brand", "search"].forEach((key) => {
    const values = [
      ...new Set(
        currentParams
          .getAll(key)
          .map((value) => value.trim())
          .filter(Boolean)
      ),
    ].sort();

    values.forEach((value) => {
      canonicalParams.append(key, value);
    });
  });

  if (safeCurrentPage > 1) {
    canonicalParams.set("page", String(safeCurrentPage));
  }

  const canonicalQuery = canonicalParams.toString();

  const canonicalUrl = `https://truee.in/shop${
    canonicalQuery ? `?${canonicalQuery}` : ""
  }`;

  // Manage the main shop page through Super Admin.
  // Preserve existing dynamic SEO for filtered and paginated URLs.
  const isMainShopPage = canonicalQuery === "";

  return (
    <div className="min-h-screen bg-white font-sans text-[#111]">
      {isMainShopPage ? (
        <ManagedPageSeo
          pageKey="shop"
          defaultTitle={collectionTitle}
          defaultDescription={collectionDescription}
          defaultCanonical={canonicalUrl}
        />
      ) : (
        <>
          <title>{collectionTitle}</title>

          <meta
            name="description"
            content={collectionDescription}
          />

          <link rel="canonical" href={canonicalUrl} />
        </>
      )}

      <Header1 />

      <Toast
        toast={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      <div className="w-full bg-white border-b border-gray-100 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[1600px] mx-auto flex flex-col items-center text-center relative z-10"
        >
          <nav
            aria-label="Breadcrumb"
            className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-gray-400 flex items-center justify-center gap-2"
          >
            <Link
              to="/"
              className="hover:text-black transition-colors"
            >
              Home
            </Link>

            <span aria-hidden="true" className="opacity-40">
              /
            </span>

            <span aria-current="page" className="text-black">
              Collection
            </span>
          </nav>

          <h1
            className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-black mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
            }}
          >
            {collectionHeading}
          </h1>

          <p className="max-w-3xl text-sm text-gray-500 leading-relaxed mb-6">
            {collectionDescription}
          </p>

          <div
            aria-hidden="true"
            className="flex items-center gap-3 justify-center"
          >
            <div className="h-[1px] w-12 bg-[#C8A253]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8A253]" />
            <div className="h-[1px] w-12 bg-[#C8A253]" />
          </div>
        </motion.div>
      </div>

      <main className="relative w-full max-w-[1600px] bg-[#fcfbfb] mx-auto px-4 sm:px-6 md:px-12 py-12 flex flex-col lg:flex-row items-start gap-10 xl:gap-16">
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[85%] max-w-[300px]">
          <button
            type="button"
            aria-expanded={isSidebarOpen}
            aria-controls="collection-filters"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center gap-2 bg-[#111] text-white py-3.5 rounded-full w-full text-[11px] font-bold uppercase tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-gray-800 transition-all active:scale-95"
          >
            {isSidebarOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Filter size={18} aria-hidden="true" />
            )}

            <span className="mt-[2px]">
              {isSidebarOpen ? "Close" : "Filters & Sorting"}
            </span>
          </button>
        </div>

        <aside
          id="collection-filters"
          aria-label="Product filters"
          className={`lg:w-[280px] xl:w-[300px] shrink-0 lg:block lg:sticky lg:top-[120px] lg:self-start lg:z-30 lg:inset-auto lg:bg-transparent lg:p-0 ${
            isSidebarOpen
              ? "fixed inset-0 z-[60] bg-[#fafafa] overflow-y-auto p-4 pb-28 block w-full"
              : "hidden"
          }`}
        >
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-full">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <Filter
                  size={18}
                  aria-hidden="true"
                  className="text-orange-600"
                />

                <div>
                  <h2 className="font-bold text-sm uppercase">
                    Filters
                  </h2>

                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Refine your list
                  </p>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline decoration-gray-300 underline-offset-2"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="mb-8">
              <label
                htmlFor="collection-search"
                className="sr-only"
              >
                Search products
              </label>

              <div className="relative group">
                <input
                  id="collection-search"
                  type="search"
                  placeholder="Search collection..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3.5 px-4 pl-11 text-[13px] focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
                />

                <Search
                  size={16}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                />
              </div>
            </div>

            <div className="mb-6 border-b border-gray-100 pb-6">
              <h3>
                <button
                  type="button"
                  aria-expanded={isCatOpen}
                  aria-controls="collection-category-options"
                  onClick={() => setIsCatOpen(!isCatOpen)}
                  className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group"
                >
                  Category

                  {isCatOpen ? (
                    <ChevronUp size={14} aria-hidden="true" />
                  ) : (
                    <ChevronDown size={14} aria-hidden="true" />
                  )}
                </button>
              </h3>

              <div
                id="collection-category-options"
                hidden={!isCatOpen}
              >
                <div className="flex flex-col gap-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar pt-2">
                  {allCategories.map((category) => {
                    const checked = selectedCategories.some(
                      (item) =>
                        normalize(item) === normalize(category)
                    );

                    return (
                      <label
                        key={category}
                        className="flex items-center gap-4 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleCategory(category)
                          }
                          className="accent-black w-4 h-4"
                        />

                        <span
                          className={`text-[13px] capitalize transition-colors ${
                            checked
                              ? "font-semibold text-black"
                              : "text-gray-500"
                          }`}
                        >
                          {category}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mb-6 border-b border-gray-100 pb-6">
              <h3>
                <button
                  type="button"
                  aria-expanded={isBrandOpen}
                  aria-controls="collection-brand-options"
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group"
                >
                  Brand

                  {isBrandOpen ? (
                    <ChevronUp size={14} aria-hidden="true" />
                  ) : (
                    <ChevronDown size={14} aria-hidden="true" />
                  )}
                </button>
              </h3>

              <div
                id="collection-brand-options"
                hidden={!isBrandOpen}
              >
                <div className="flex flex-col gap-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar pt-2">
                  {allBrands.map((brand) => {
                    const checked = selectedBrands.some(
                      (item) =>
                        normalize(item) === normalize(brand)
                    );

                    return (
                      <label
                        key={brand}
                        className="flex items-center gap-4 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleBrand(brand)}
                          className="accent-black w-4 h-4"
                        />

                        <span
                          className={`text-[13px] uppercase transition-colors ${
                            checked
                              ? "font-semibold text-black"
                              : "text-gray-500"
                          }`}
                        >
                          {brand}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3>
                <button
                  type="button"
                  aria-expanded={isPriceOpen}
                  aria-controls="collection-price-options"
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group"
                >
                  Price Range

                  {isPriceOpen ? (
                    <ChevronUp size={14} aria-hidden="true" />
                  ) : (
                    <ChevronDown size={14} aria-hidden="true" />
                  )}
                </button>
              </h3>

              <div
                id="collection-price-options"
                hidden={!isPriceOpen}
              >
                <div className="pt-2 space-y-5">
                  <input
                    type="range"
                    aria-label="Maximum price"
                    min="0"
                    max={maxPriceLimit}
                    value={
                      priceRange.max === ""
                        ? maxPriceLimit
                        : Math.min(
                            maxPriceLimit,
                            Math.max(0, Number(priceRange.max))
                          )
                    }
                    onChange={(event) => {
                      setPriceRange((previous) => ({
                        ...previous,
                        max: event.target.value,
                      }));

                      resetPagination();
                    }}
                    className="w-full h-[4px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:h-[6px] transition-all"
                  />

                  <div className="flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="collection-min-price"
                        className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block"
                      >
                        Min (₹)
                      </label>

                      <input
                        id="collection-min-price"
                        type="number"
                        min="0"
                        value={priceRange.min}
                        onChange={(event) => {
                          setPriceRange((previous) => ({
                            ...previous,
                            min: event.target.value,
                          }));

                          resetPagination();
                        }}
                        className="w-full bg-[#f4f4f4] border border-transparent rounded-lg py-2.5 px-3 text-[12px] font-semibold focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    <span
                      aria-hidden="true"
                      className="text-gray-300 mt-5"
                    >
                      -
                    </span>

                    <div className="w-full">
                      <label
                        htmlFor="collection-max-price"
                        className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block"
                      >
                        Max (₹)
                      </label>

                      <input
                        id="collection-max-price"
                        type="number"
                        min="0"
                        value={priceRange.max}
                        onChange={(event) => {
                          setPriceRange((previous) => ({
                            ...previous,
                            max: event.target.value,
                          }));

                          resetPagination();
                        }}
                        className="w-full bg-[#f4f4f4] border border-transparent rounded-lg py-2.5 px-3 text-[12px] font-semibold focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black">
                  In Stock Only
                </span>

                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) => {
                    setInStockOnly(event.target.checked);
                    resetPagination();
                  }}
                  className="accent-black w-5 h-5"
                />
              </label>
            </div>
          </div>
        </aside>

        <div className="flex-1 w-full flex flex-col">
          <h2 className="sr-only">Products</h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-gray-100 gap-4">
            <p
              role="status"
              className="text-[13px] font-medium text-gray-400"
            >
              {loading ? (
                "Loading products..."
              ) : loadError ? (
                "Products unavailable"
              ) : (
                <>
                  Showing

                  <span className="text-black font-bold mx-1">
                    {filteredProducts.length}
                  </span>

                  products
                </>
              )}
            </p>

            <label
              htmlFor="collection-sort"
              className="sr-only"
            >
              Sort products
            </label>

            <select
              id="collection-sort"
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value);
                resetPagination();
              }}
              className="bg-transparent border-none text-[11px] font-bold uppercase tracking-widest text-black focus:outline-none cursor-pointer"
            >
              <option value="best-selling">
                Sort by: Featured
              </option>

              <option value="price-asc">
                Price: Low to High
              </option>

              <option value="price-desc">
                Price: High to Low
              </option>
            </select>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              Loading...
            </div>
          ) : loadError ? (
            <div role="alert" className="py-20 text-center">
              {loadError}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p>No products match your filters.</p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-start">
                {displayedProducts.map((product) => (
                  <ShopProductCard
                    key={product._id}
                    product={product}
                    onQuickView={setSelectedProduct}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Product pagination"
                  className="flex flex-wrap justify-center items-center gap-3 mt-16 mb-24 lg:mb-8"
                >
                  {safeCurrentPage > 1 ? (
                    <Link
                      to={getPageUrl(safeCurrentPage - 1)}
                      onClick={scrollToTop}
                      className="px-3 py-2 rounded-full text-xs bg-[#f4f4f4]"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="px-3 py-2 rounded-full text-xs bg-[#f4f4f4] opacity-40 cursor-not-allowed"
                    >
                      Previous
                    </span>
                  )}

                  {getPageNumbers().map((page) => (
                    <Link
                      key={page}
                      to={getPageUrl(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={
                        safeCurrentPage === page
                          ? "page"
                          : undefined
                      }
                      onClick={scrollToTop}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-[13px] font-bold transition-all ${
                        safeCurrentPage === page
                          ? "bg-black text-white shadow-md"
                          : "bg-[#f4f4f4] text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </Link>
                  ))}

                  {safeCurrentPage < totalPages ? (
                    <Link
                      to={getPageUrl(safeCurrentPage + 1)}
                      onClick={scrollToTop}
                      className="px-3 py-2 rounded-full text-xs bg-[#f4f4f4]"
                    >
                      Next
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="px-3 py-2 rounded-full text-xs bg-[#f4f4f4] opacity-40 cursor-not-allowed"
                    >
                      Next
                    </span>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </main>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
}