
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   Search,
//   User,
//   Star,
//   ShoppingBag,
//   X,
//   Menu,
//   History,
//   Clock,
//   LogOut,
//   Package,
//   ChevronDown,
// } from "lucide-react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useAuth } from "../../context/AuthContext";
// import Cart from "../Cart";
// import { motion, useScroll, useMotionValueEvent } from "framer-motion";

// const staticBrands = [
//   "Noise",
//   "Marshall",
//   "Devialet",
//   "Sonos",
//   "Bang & Olufsen",
//   "Truee",
//   "Outln",
//   "Milagrow",
//   	"Sonodyne",
//   "Sony",
//   "Shokz",
//   "Withings",
//   "Therabody",
//   "Bowers & Wilkins",
//   "JBL",
//   "Bose",
//   "polar",
//    "SlidersHorizontal",
//   "Coffee",
//   "BatteryFull",
//   "Scale",
//   "Volume1",
//   "Package",
//   	"Aether EduLabs",
  
// ];

// const NAV_CATEGORIES = [
//   {
//     label: "SPEAKERS",
//     keyword: "Speaker",
//     sub: [
//       { label: "Karaoke Speakers", keyword: "Karaoke" },
//       { label: "Home Theater Speakers", keyword: "Home Theater" },
//       { label: "Party Speakers", keyword: "Party" },
//       { label: "Portable Speakers", keyword: "Portable" },
//       { label: "Smart Speaker", keyword: "Smart Speaker" },
//       { label: "Power Speakers", keyword: "Power" },
//     ],
//   },
//   {
//     label: "HEADPHONES",
//     keyword: "Headphone",
//     sub: [
//       { label: "Wired Headphones", keyword: "Wired Headphone" },
//       { label: "Wireless Headphones", keyword: "Wireless Headphone" },
//       {
//         label: "Bone Conduction Headphones",
//         keyword: "Bone Conduction Headphones",
//       },
//     ],
//   },
//   {
//     label: "EARPHONES",
//     keyword: "Earphone",
//     sub: [
//       { label: "Wired Earphones", keyword: "Wired Earphone" },
//       {
//         label: "In-Ear Monitors (IEM)",
//         keyword: "In-Ear Monitors (IEM)",
//       },
//       { label: "Truly Wireless Earbuds", keyword: "TWS" },
//     ],
//   },
//   {
//     label: "SMARTWATCHES",
//     keyword: "Smartwatch",
//     sub: [
//       { label: "Hybrid Smartwatches", keyword: "Hybrid" },
//       { label: "Active & Rugged", keyword: "Rugged" },
//       { label: "Health & Fitness", keyword: "Health" },
//     ],
//   },
//   {
//     label: "BEAUTY & WELLNESS",
//     keyword: "Beauty & Wellness",
//     sub: [
//       { label: "Beauty", keyword: "Beauty" },
//       { label: "Wellness", keyword: "Wellness" },
//       { label: "Foam Roller", keyword: "Foam Roller" },
//       { label: "Massager", keyword: "Massager" },
//       { label: "Muscle Stimulator", keyword: "Muscle Stimulator" },
//       { label: "Roller Table", keyword: "Roller Table" },
//       { label: "Coffee Makers ", keyword: "Coffee Makers " },
//       { label: "	Handheld Milk Frother ", keyword: "	Handheld Milk Frother " },
//       { label: "	Coffee Accessories, ", keyword: "	Coffee Accessories, " },
//       { label: "	Air Purifiers", keyword: "	Air Purifiers" },
//       { label: "	Robot Vacuum Cleaners", keyword: "	Robot Vacuum Cleaners" },
//       { label: "	AI Labs and Educational Kits", keyword: "	AI Labs and Educational Kits" },
//     ],
//   },
//   {
//     label: "HOME THEATER",
//     keyword: "Home Theater",
//     sub: [
//       { label: "Home Theater Setup", keyword: "Home Theater" },
//       { label: "Soundbars", keyword: "Soundbar" },
//       { label: "Subwoofers", keyword: "Subwoofer" },
//       { label: "Amplifier", keyword: "Amplifier" },
//       { label: "Projector", keyword: "Projector" },
//     ],
//   },
// ];

// const getSearchUrl = (term) =>
//   `/shop?search=${encodeURIComponent(String(term).trim())}`;

// const getBrandUrl = (brand) =>
//   `/shop?brand=${encodeURIComponent(brand)}`;

// const SearchInline = ({ onClose, navigate }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);

//   const searchContainerRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         searchContainerRef.current &&
//         !searchContainerRef.current.contains(event.target)
//       ) {
//         onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, [onClose]);

//   const fetchRecentSearches = async () => {
//     try {
//       const guestId = localStorage.getItem("guestId");
//       const params = new URLSearchParams({ type: "search" });

//       if (guestId) params.set("guestId", guestId);

//       const { data } = await axiosInstance.get(
//         `/history?${params.toString()}`
//       );

//       if (data.success && Array.isArray(data.history)) {
//         const searches = data.history
//           .map((item) => item.searchQuery)
//           .filter(Boolean);

//         setRecentSearches([...new Set(searches)].slice(0, 5));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     let cancelled = false;

//     const timer = setTimeout(async () => {
//       if (!query.trim()) {
//         setSuggestions([]);
//         setIsSearching(false);
//         return;
//       }

//       setIsSearching(true);

//       try {
//         const { data } = await axiosInstance.get(
//           `/products/search-suggestions?q=${encodeURIComponent(
//             query.trim()
//           )}`
//         );

//         if (!cancelled) {
//           setSuggestions(
//             data.success && Array.isArray(data.suggestions)
//               ? data.suggestions
//               : []
//           );
//         }
//       } catch (error) {
//         if (!cancelled) {
//           setSuggestions([]);
//           console.error(error);
//         }
//       } finally {
//         if (!cancelled) setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       cancelled = true;
//       clearTimeout(timer);
//     };
//   }, [query]);

//   const trackSearchHistory = async (term) => {
//     if (!term.trim()) return;

//     try {
//       await axiosInstance.post("/history/add", {
//         type: "search",
//         searchQuery: term.trim(),
//         guestId: localStorage.getItem("guestId"),
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();

//     const term = query.trim();
//     if (!term) return;

//     void trackSearchHistory(term);
//     onClose();
//     navigate(getSearchUrl(term));
//   };

//   return (
//     <div
//       className="flex-1 max-w-2xl mx-auto px-4 relative z-50"
//       ref={searchContainerRef}
//     >
//       <form
//         role="search"
//         onSubmit={handleSearch}
//         className="flex items-center gap-4 animate-slide-in-right bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
//       >
//         <Search
//           className="text-zinc-500"
//           size={18}
//           aria-hidden="true"
//         />

//         <label htmlFor="header-product-search" className="sr-only">
//           Search products
//         </label>

//         <input
//           id="header-product-search"
//           autoFocus
//           type="search"
//           value={query}
//           onChange={(event) => setQuery(event.target.value)}
//           onFocus={() => {
//             setShowDropdown(true);
//             if (!query) void fetchRecentSearches();
//           }}
//           placeholder="Search luxury products..."
//           className="w-full bg-transparent border-none text-black text-xs lg:text-sm focus:outline-none focus:ring-0 placeholder-zinc-400 tracking-wider"
//         />

//         {isSearching && (
//           <div
//             role="status"
//             className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"
//           >
//             <span className="sr-only">Searching...</span>
//           </div>
//         )}

//         <button
//           type="button"
//           aria-label="Close search"
//           onClick={onClose}
//           className="text-zinc-500 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
//         >
//           <X size={20} aria-hidden="true" />
//         </button>
//       </form>

//       {showDropdown &&
//         (query.trim()
//           ? suggestions.length > 0
//           : recentSearches.length > 0) && (
//           <div className="absolute top-[120%] left-4 right-4 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden text-black animate-fade-in">
//             {!query.trim() && recentSearches.length > 0 && (
//               <div className="p-4">
//                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-2 flex items-center gap-2">
//                   <History className="w-3 h-3" aria-hidden="true" />
//                   Recent Searches
//                 </p>

//                 <ul className="space-y-1">
//                   {recentSearches.map((term) => (
//                     <li key={term}>
//                       <Link
//                         to={getSearchUrl(term)}
//                         onClick={() => {
//                           void trackSearchHistory(term);
//                           onClose();
//                         }}
//                         className="flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
//                       >
//                         <Clock
//                           className="w-3.5 h-3.5 opacity-50"
//                           aria-hidden="true"
//                         />
//                         {term}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {query.trim() && suggestions.length > 0 && (
//               <ul className="py-2">
//                 {suggestions.map((item) => (
//                   <li
//                     key={item._id}
//                     className="border-b border-gray-100 last:border-0"
//                   >
//                     <Link
//                       to={getSearchUrl(item.name)}
//                       onClick={() => {
//                         void trackSearchHistory(item.name);
//                         onClose();
//                       }}
//                       className="px-6 py-3 hover:bg-gray-50 flex justify-between items-center group transition-colors"
//                     >
//                       <div className="flex-1 min-w-0 pr-4">
//                         <div className="text-[13px] font-semibold text-gray-900 group-hover:text-black transition-colors truncate">
//                           {item.name}
//                         </div>

//                         <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">
//                           <span className="text-black font-bold">
//                             {item.brand}
//                           </span>
//                           {" "}• {item.category}
//                         </div>
//                       </div>

//                       <div className="text-[11px] font-black text-black bg-gray-100 px-3 py-1.5 rounded-lg group-hover:bg-gray-200 transition-all">
//                         ₹{item.price?.toLocaleString("en-IN")}
//                       </div>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//     </div>
//   );
// };

// export default function Header1() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useAuth();

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [expandedCategoryId, setExpandedCategoryId] = useState(null);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [scrolled, setScrolled] = useState(false);
//   const [closeDropdown, setCloseDropdown] = useState(false);

//   const dropdownTimerRef = useRef(null);
//   const { scrollY } = useScroll();

//   useMotionValueEvent(scrollY, "change", (latest) => {
//     setScrolled(latest > 24);
//   });

//   useEffect(() => {
//     return () => clearTimeout(dropdownTimerRef.current);
//   }, []);

//   useEffect(() => {
//     let cancelled = false;

//     const fetchCartData = async () => {
//       try {
//         const { data } = await axiosInstance.get("/cart");

//         if (!cancelled && data.success) {
//           setCartCount(data.cart?.items?.length || 0);
//         }
//       } catch {
//         if (!cancelled) setCartCount(0);
//       }
//     };

//     void fetchCartData();

//     const handleCartUpdate = (event) => {
//       // Product detail apna cart kholta hai, isliye duplicate na kholo.
//       if (event.detail?.openCart !== false) {
//         setIsCartOpen(true);
//       }

//       if (event.detail?.increase) {
//         setCartCount(
//           (previous) => previous + event.detail.increase
//         );
//       } else {
//         void fetchCartData();
//       }
//     };

//     const openCart = () => setIsCartOpen(true);

//     window.addEventListener("cartUpdated", handleCartUpdate);
//     window.addEventListener("openCart", openCart);

//     return () => {
//       cancelled = true;
//       window.removeEventListener("cartUpdated", handleCartUpdate);
//       window.removeEventListener("openCart", openCart);
//     };
//   }, [user]);

//   const toggleCategory = (categoryId) => {
//     setExpandedCategoryId((previous) =>
//       previous === categoryId ? null : categoryId
//     );
//   };

//   const handleDropdownClick = () => {
//     setCloseDropdown(true);
//     clearTimeout(dropdownTimerRef.current);

//     dropdownTimerRef.current = setTimeout(
//       () => setCloseDropdown(false),
//       200
//     );
//   };

//   const categoriesWithBrands = [
//     ...NAV_CATEGORIES,
//     {
//       label: "BRANDS",
//       keyword: "Brand",
//       sub: staticBrands.map((brand) => ({
//         label: brand,
//         keyword: brand,
//       })),
//     },
//   ];

//   const activeSearch = new URLSearchParams(
//     location.search
//   ).get("search");

//   const isTransparent =
//     location.pathname === "/" && !scrolled;

//   const textColorClass = isTransparent
//     ? "text-white"
//     : "text-black";

//   const navInactiveText = isTransparent
//     ? "text-gray-200 hover:text-white"
//     : "text-[#6b6b6b] hover:text-black";

//   const underlineColor = isTransparent
//     ? "after:bg-white"
//     : "after:bg-black";

//   const dropdownVisibility = closeDropdown
//     ? "hidden"
//     : "opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0";

//   return (
//     <>
//       {!isTransparent && location.pathname !== "/" && (
//         <div className="h-[75px] w-full" />
//       )}

//       <motion.header
//         initial={{ y: 0, opacity: 1 }}
//         animate={{ y: 0, opacity: 1 }}
//         className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 h-[75px] flex-shrink-0 z-[999] transition-all duration-300 ${
//           isTransparent
//             ? "bg-transparent border-transparent"
//             : "bg-white border-b border-gray-200"
//         }`}
//       >
//         <div className="flex-1 xl:hidden">
//           <button
//             type="button"
//             aria-label={
//               isMobileMenuOpen ? "Close menu" : "Open menu"
//             }
//             aria-expanded={isMobileMenuOpen}
//             aria-controls="mobile-main-navigation"
//             onClick={() =>
//               setIsMobileMenuOpen(!isMobileMenuOpen)
//             }
//             className={`${textColorClass} hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none outline-none`}
//           >
//             {isMobileMenuOpen ? (
//               <X size={24} strokeWidth={1.5} aria-hidden="true" />
//             ) : (
//               <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
//             )}
//           </button>
//         </div>

//         <div className="flex-1 xl:flex-none flex justify-center xl:justify-start">
//           <Link
//             to="/"
//             aria-label="Truee home"
//             className="flex items-center gap-1 group cursor-pointer"
//           >
//             <img
//               src="/Truee_Luxury_Logo.png"
//               alt="Truee"
//               className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${
//                 isTransparent
//                   ? "brightness-0 invert"
//                   : "brightness-0"
//               }`}
//             />

//             <span
//               className={`text-sm md:text-[14px] font-semibold tracking-[0.1em] uppercase opacity-90 group-hover:opacity-100 transition-opacity ${textColorClass}`}
//             >
//               TRUEE
//             </span>
//           </Link>
//         </div>

//         {isSearchOpen ? (
//           <SearchInline
//             onClose={() => setIsSearchOpen(false)}
//             navigate={navigate}
//           />
//         ) : (
//           <nav
//             aria-label="Main navigation"
//             className="hidden xl:flex items-center h-full gap-3 2xl:gap-6 relative z-50"
//           >
//             {NAV_CATEGORIES.map((category) => {
//               const isActive =
//                 location.pathname === "/shop" &&
//                 activeSearch === category.keyword;

//               return (
//                 <div
//                   key={category.label}
//                   className="h-full flex items-center relative group"
//                 >
//                   <Link
//                     to={getSearchUrl(category.keyword)}
//                     onClick={handleDropdownClick}
//                     className={`font-semibold text-[10px] xl:text-[11px] tracking-widest uppercase transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none relative py-2 after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${underlineColor} ${
//                       isActive
//                         ? `${textColorClass} after:w-full`
//                         : `${navInactiveText} after:w-0 group-hover:after:w-full`
//                     }`}
//                   >
//                     {category.label}

//                     <ChevronDown
//                       size={14}
//                       aria-hidden="true"
//                       className="transition-transform duration-300 group-hover:rotate-180"
//                     />
//                   </Link>

//                   <div
//                     className={`absolute top-[65%] left-1/2 -translate-x-1/2 pt-6 w-56 z-[10] transition-all duration-500 ease-out ${dropdownVisibility}`}
//                   >
//                     <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2">
//                       <div className="px-4 py-2 border-b border-gray-50">
//                         <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
//                           Categories
//                         </span>
//                       </div>

//                       <ul className="w-full">
//                         {category.sub.map((item) => (
//                           <li key={item.label}>
//                             <Link
//                               to={getSearchUrl(item.keyword)}
//                               onClick={handleDropdownClick}
//                               className="block w-full text-left px-4 py-2.5 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors uppercase tracking-wider cursor-pointer border-b border-gray-50 bg-transparent outline-none"
//                             >
//                               {item.label}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             <div className="h-full flex items-center relative group">
//               <Link
//                 to="/brands"
//                 onClick={handleDropdownClick}
//                 className={`font-semibold text-[10px] xl:text-[11px] tracking-widest uppercase transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none relative py-2 after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${underlineColor} ${
//                   location.pathname === "/brands"
//                     ? `${textColorClass} after:w-full`
//                     : `${navInactiveText} after:w-0 group-hover:after:w-full`
//                 }`}
//               >
//                 BRANDS
//                 <ChevronDown
//                   size={14}
//                   aria-hidden="true"
//                   className="transition-transform duration-300 group-hover:rotate-180"
//                 />
//               </Link>

//               <div
//                 className={`absolute top-[65%] left-1/2 -translate-x-1/2 pt-6 w-64 z-[10] transition-all duration-500 ease-out ${dropdownVisibility}`}
//               >
//                 <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2">
//                   <div className="px-4 py-2 border-b border-gray-50">
//                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
//                       Select Brand
//                     </span>
//                   </div>

//                   <ul className="w-full max-h-[60vh] overflow-y-auto custom-scrollbar">
//                     {staticBrands.map((brand) => (
//                       <li key={brand}>
//                         <Link
//                           to={getBrandUrl(brand)}
//                           onClick={handleDropdownClick}
//                           className="block w-full text-left px-4 py-2.5 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors uppercase tracking-wider cursor-pointer bg-transparent border-none outline-none"
//                         >
//                           {brand}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         )}

//         <div className="flex-1 xl:flex-none flex items-center justify-end gap-4 md:gap-5 h-full relative z-50">
//           <button
//             type="button"
//             aria-label={
//               isSearchOpen ? "Close search" : "Open search"
//             }
//             onClick={() => setIsSearchOpen(!isSearchOpen)}
//             className={`${textColorClass} hover:opacity-60 transition-opacity cursor-pointer hidden sm:block bg-transparent border-none outline-none`}
//           >
//             <Search
//               size={18}
//               strokeWidth={1.5}
//               aria-hidden="true"
//             />
//           </button>

//           <div className="h-full flex items-center relative group">
//             <Link
//               to={user ? "/profile" : "/login"}
//               aria-label={user ? "My profile" : "Login"}
//               className={`${textColorClass} hover:opacity-60 transition-opacity cursor-pointer flex items-center gap-1`}
//             >
//               <User
//                 size={18}
//                 strokeWidth={1.5}
//                 aria-hidden="true"
//               />

//               {user && (
//                 <ChevronDown
//                   size={14}
//                   aria-hidden="true"
//                   className="transition-transform duration-300 group-hover:rotate-180"
//                 />
//               )}
//             </Link>

//             {user && (
//               <div
//                 className={`absolute top-[65%] right-0 pt-6 w-56 z-[100] transition-all duration-500 ease-out ${dropdownVisibility}`}
//               >
//                 <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden text-black">
//                   <div className="p-4 border-b border-gray-50 bg-gray-50/50">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                       Signed in as
//                     </p>
//                     <p className="text-sm font-semibold text-black truncate">
//                       {user.name || user.email || "User"}
//                     </p>
//                   </div>

//                   <div className="py-2">
//                     <Link
//                       to="/profile"
//                       onClick={handleDropdownClick}
//                       className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
//                     >
//                       <User
//                         size={16}
//                         className="text-gray-400"
//                         aria-hidden="true"
//                       />
//                       My Profile
//                     </Link>

//                     <Link
//                       to="/profile?tab=orders"
//                       onClick={handleDropdownClick}
//                       className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
//                     >
//                       <Package
//                         size={16}
//                         className="text-gray-400"
//                         aria-hidden="true"
//                       />
//                       Orders
//                     </Link>
//                   </div>

//                   <div className="py-2 border-t border-gray-50">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         logout();
//                         handleDropdownClick();
//                         navigate("/login");
//                       }}
//                       className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer bg-transparent border-none outline-none"
//                     >
//                       <LogOut size={16} aria-hidden="true" />
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <Link
//             to="/wishlist"
//             aria-label="Wishlist"
//             className={`${textColorClass} hover:opacity-60 transition-opacity cursor-pointer`}
//           >
//             <Star
//               size={18}
//               strokeWidth={1.5}
//               aria-hidden="true"
//             />
//           </Link>

//           <button
//             type="button"
//             aria-label={`Open cart, ${cartCount} items`}
//             onClick={() => setIsCartOpen(true)}
//             className={`relative flex items-center justify-center ${textColorClass} hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none outline-none`}
//           >
//             <ShoppingBag
//               size={18}
//               strokeWidth={1.5}
//               aria-hidden="true"
//             />

//             {cartCount > 0 && (
//               <span
//                 className={`absolute -top-1 -right-2 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
//                   isTransparent
//                     ? "bg-white text-black"
//                     : "bg-black text-white"
//                 }`}
//               >
//                 {cartCount}
//               </span>
//             )}
//           </button>
//         </div>

//         {isMobileMenuOpen && (
//           <nav
//             id="mobile-main-navigation"
//             aria-label="Mobile navigation"
//             className="absolute top-[75px] left-0 w-full bg-white shadow-xl xl:hidden flex flex-col py-4 z-40 border-t border-zinc-100 max-h-[calc(100dvh-75px)] overflow-y-auto custom-scrollbar text-black"
//           >
//             <form
//               role="search"
//               className="px-6 pb-4 mb-2 border-b border-zinc-100 flex items-center gap-2"
//               onSubmit={(event) => {
//                 event.preventDefault();

//                 const formData = new FormData(event.currentTarget);
//                 const term = String(
//                   formData.get("search") || ""
//                 ).trim();

//                 if (!term) return;

//                 setIsMobileMenuOpen(false);
//                 navigate(getSearchUrl(term));
//               }}
//             >
//               <Search
//                 size={16}
//                 className="text-zinc-400"
//                 aria-hidden="true"
//               />

//               <input
//                 type="search"
//                 name="search"
//                 aria-label="Search products"
//                 placeholder="Search..."
//                 className="w-full bg-transparent border-none text-sm outline-none text-black"
//               />
//             </form>

//             <div className="flex flex-col gap-1">
//               {categoriesWithBrands.map((category, index) => {
//                 const isBrands = category.label === "BRANDS";
//                 const isExpanded =
//                   expandedCategoryId === category.label;
//                 const submenuId = `mobile-category-${index}`;

//                 return (
//                   <div
//                     key={category.label}
//                     className="border-b border-zinc-100 last:border-0"
//                   >
//                     <div className="w-full flex items-center justify-between px-6 py-4">
//                       <Link
//                         to={
//                           isBrands
//                             ? "/brands"
//                             : getSearchUrl(category.keyword)
//                         }
//                         onClick={() => setIsMobileMenuOpen(false)}
//                         className="text-[#6b6b6b] hover:text-black font-semibold text-[11px] tracking-widest uppercase transition-colors cursor-pointer flex-1 text-left"
//                       >
//                         {category.label}
//                       </Link>

//                       <button
//                         type="button"
//                         aria-label={`${
//                           isExpanded ? "Collapse" : "Expand"
//                         } ${category.label}`}
//                         aria-expanded={isExpanded}
//                         aria-controls={submenuId}
//                         onClick={() =>
//                           toggleCategory(category.label)
//                         }
//                         className="p-2 -mr-2 text-[#6b6b6b] hover:text-black bg-transparent border-none outline-none cursor-pointer"
//                       >
//                         <ChevronDown
//                           size={16}
//                           aria-hidden="true"
//                           className={`transition-transform duration-300 ${
//                             isExpanded ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>
//                     </div>

//                     <div id={submenuId} hidden={!isExpanded}>
//                       <div className="bg-[#fafafa] px-6 py-2 flex flex-col gap-2">
//                         {category.sub.map((item) => (
//                           <Link
//                             key={item.label}
//                             to={
//                               isBrands
//                                 ? getBrandUrl(item.keyword)
//                                 : getSearchUrl(item.keyword)
//                             }
//                             onClick={() =>
//                               setIsMobileMenuOpen(false)
//                             }
//                             className="text-left py-2 pl-4 text-zinc-500 hover:text-black font-medium text-[10px] tracking-[0.15em] uppercase transition-colors"
//                           >
//                             {item.label}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="mt-6 pt-6 border-t border-gray-100">
//               <div className="flex items-center gap-4 px-6">
//                 <User
//                   size={18}
//                   strokeWidth={1.5}
//                   className="text-black"
//                   aria-hidden="true"
//                 />

//                 {user ? (
//                   <div className="flex-1">
//                     <p className="text-xs font-semibold text-black truncate">
//                       {user.name || user.email}
//                     </p>

//                     <Link
//                       to="/profile"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="text-[10px] text-gray-500 hover:text-black"
//                     >
//                       View Account
//                     </Link>
//                   </div>
//                 ) : (
//                   <Link
//                     to="/login"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex-1 text-[11px] font-bold text-black uppercase tracking-widest hover:text-gray-600"
//                   >
//                     Login / Sign Up
//                   </Link>
//                 )}
//               </div>

//               {user && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     logout();
//                     navigate("/login");
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className="mt-4 w-full flex items-center gap-3 px-6 py-3 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer bg-transparent border-none outline-none"
//                 >
//                   <LogOut size={16} aria-hidden="true" />
//                   Logout
//                 </button>
//               )}
//             </div>
//           </nav>
//         )}

//         <Cart
//           isOpen={isCartOpen}
//           onClose={() => setIsCartOpen(false)}
//         />
//       </motion.header>
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Search,
  User,
  Star,
  ShoppingBag,
  X,
  Menu,
  History,
  Clock,
  LogOut,
  Package,
  ChevronDown,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import Cart from "../Cart";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const staticBrands = [
  "Noise",
  "Marshall",
  "Devialet",
  "Sonos",
  "Bang & Olufsen",
  "Truee",
  "Outln",
  "Milagrow",
  "Sonodyne",
  "Sony",
  "Shokz",
  "Withings",
  "Therabody",
  "Bowers & Wilkins",
  "JBL",
  "Bose",
  "polar",
  "SlidersHorizontal",
  "Coffee",
  "BatteryFull",
  "Scale",
  "Volume1",
  "Package",
  "Aether EduLabs",
];

const NAV_CATEGORIES = [
  {
    label: "SPEAKERS",
    keyword: "Speaker",
    sub: [
      { label: "Karaoke Speakers", keyword: "Karaoke" },
      { label: "Home Theater Speakers", keyword: "Home Theater" },
      { label: "Party Speakers", keyword: "Party" },
      { label: "Portable Speakers", keyword: "Portable" },
      { label: "Smart Speaker", keyword: "Smart Speaker" },
      { label: "Power Speakers", keyword: "Power" },
    ],
  },
  {
    label: "HEADPHONES",
    keyword: "Headphone",
    sub: [
      { label: "Wired Headphones", keyword: "Wired Headphone" },
      { label: "Wireless Headphones", keyword: "Wireless Headphone" },
      {
        label: "Bone Conduction Headphones",
        keyword: "Bone Conduction Headphones",
      },
    ],
  },
  {
    label: "EARPHONES",
    keyword: "Earphone",
    sub: [
      { label: "Wired Earphones", keyword: "Wired Earphone" },
      {
        label: "In-Ear Monitors (IEM)",
        keyword: "In-Ear Monitors (IEM)",
      },
      { label: "Truly Wireless Earbuds", keyword: "TWS" },
    ],
  },
  {
    label: "SMARTWATCHES",
    keyword: "Smartwatch",
    sub: [
      { label: "Hybrid Smartwatches", keyword: "Hybrid" },
      { label: "Active & Rugged", keyword: "Rugged" },
      { label: "Health & Fitness", keyword: "Health" },
    ],
  },
  {
    label: "BEAUTY & WELLNESS",
    keyword: "Beauty & Wellness",
    sub: [
      { label: "Beauty", keyword: "Beauty" },
      { label: "Wellness", keyword: "Wellness" },
      { label: "Foam Roller", keyword: "Foam Roller" },
      { label: "Massager", keyword: "Massager" },
      { label: "Muscle Stimulator", keyword: "Muscle Stimulator" },
      { label: "Roller Table", keyword: "Roller Table" },
      { label: "Coffee Makers ", keyword: "Coffee Makers " },
      { label: "Handheld Milk Frother ", keyword: "Handheld Milk Frother " },
      { label: "Coffee Accessories, ", keyword: "Coffee Accessories, " },
      { label: "Air Purifiers", keyword: "Air Purifiers" },
      { label: "Robot Vacuum Cleaners", keyword: "Robot Vacuum Cleaners" },
      { label: "AI Labs and Educational Kits", keyword: "AI Labs and Educational Kits" },
    ],
  },
  {
    label: "HOME THEATER",
    keyword: "Home Theater",
    sub: [
      { label: "Home Theater Setup", keyword: "Home Theater" },
      { label: "Soundbars", keyword: "Soundbar" },
      { label: "Subwoofers", keyword: "Subwoofer" },
      { label: "Amplifier", keyword: "Amplifier" },
      { label: "Projector", keyword: "Projector" },
    ],
  },
];

const getSearchUrl = (term) =>
  `/shop?search=${encodeURIComponent(String(term).trim())}`;

const getBrandUrl = (brand) =>
  `/shop?brand=${encodeURIComponent(brand)}`;

const SearchInline = ({ onClose, navigate }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const fetchRecentSearches = async () => {
    try {
      const guestId = localStorage.getItem("guestId");
      const params = new URLSearchParams({ type: "search" });

      if (guestId) params.set("guestId", guestId);

      const { data } = await axiosInstance.get(
        `/history?${params.toString()}`
      );

      if (data.success && Array.isArray(data.history)) {
        const searches = data.history
          .map((item) => item.searchQuery)
          .filter(Boolean);

        setRecentSearches([...new Set(searches)].slice(0, 5));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      try {
        const { data } = await axiosInstance.get(
          `/products/search-suggestions?q=${encodeURIComponent(
            query.trim()
          )}`
        );

        if (!cancelled) {
          setSuggestions(
            data.success && Array.isArray(data.suggestions)
              ? data.suggestions
              : []
          );
        }
      } catch (error) {
        if (!cancelled) {
          setSuggestions([]);
          console.error(error);
        }
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const trackSearchHistory = async (term) => {
    if (!term.trim()) return;

    try {
      await axiosInstance.post("/history/add", {
        type: "search",
        searchQuery: term.trim(),
        guestId: localStorage.getItem("guestId"),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const term = query.trim();
    if (!term) return;

    void trackSearchHistory(term);
    onClose();
    navigate(getSearchUrl(term));
  };

  return (
    <div
      className="flex-1 max-w-2xl mx-auto px-4 relative z-50"
      ref={searchContainerRef}
    >
      <form
        role="search"
        onSubmit={handleSearch}
        className="flex items-center gap-4 animate-slide-in-right bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
      >
        <Search
          className="text-zinc-500"
          size={18}
          aria-hidden="true"
        />

        <label htmlFor="header-product-search" className="sr-only">
          Search products
        </label>

        <input
          id="header-product-search"
          autoFocus
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            setShowDropdown(true);
            if (!query) void fetchRecentSearches();
          }}
          placeholder="Search luxury products..."
          className="w-full bg-transparent border-none text-black text-xs lg:text-sm focus:outline-none focus:ring-0 placeholder-zinc-400 tracking-wider"
        />

        {isSearching && (
          <div
            role="status"
            className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"
          >
            <span className="sr-only">Searching...</span>
          </div>
        )}

        <button
          type="button"
          aria-label="Close search"
          onClick={onClose}
          className="text-zinc-500 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </form>

      {showDropdown &&
        (query.trim()
          ? suggestions.length > 0
          : recentSearches.length > 0) && (
          <div className="absolute top-[120%] left-4 right-4 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden text-black animate-fade-in">
            {!query.trim() && recentSearches.length > 0 && (
              <div className="p-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-2 flex items-center gap-2">
                  <History className="w-3 h-3" aria-hidden="true" />
                  Recent Searches
                </p>

                <ul className="space-y-1">
                  {recentSearches.map((term) => (
                    <li key={term}>
                      <Link
                        to={getSearchUrl(term)}
                        onClick={() => {
                          void trackSearchHistory(term);
                          onClose();
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                      >
                        <Clock
                          className="w-3.5 h-3.5 opacity-50"
                          aria-hidden="true"
                        />
                        {term}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {query.trim() && suggestions.length > 0 && (
              <ul className="py-2">
                {suggestions.map((item) => (
                  <li
                    key={item._id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <Link
                      to={getSearchUrl(item.name)}
                      onClick={() => {
                        void trackSearchHistory(item.name);
                        onClose();
                      }}
                      className="px-6 py-3 hover:bg-gray-50 flex justify-between items-center group transition-colors"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="text-[13px] font-semibold text-gray-900 group-hover:text-black transition-colors truncate">
                          {item.name}
                        </div>

                        <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">
                          <span className="text-black font-bold">
                            {item.brand}
                          </span>
                          {" "}• {item.category}
                        </div>
                      </div>

                      <div className="text-[11px] font-black text-black bg-gray-100 px-3 py-1.5 rounded-lg group-hover:bg-gray-200 transition-all">
                        ₹{item.price?.toLocaleString("en-IN")}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
    </div>
  );
};

export default function Header1() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [closeDropdown, setCloseDropdown] = useState(false);
  const [managedCategories, setManagedCategories] = useState([]);
  const [managedBrands, setManagedBrands] = useState([]);

  const dropdownTimerRef = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    return () => clearTimeout(dropdownTimerRef.current);
  }, []);

  // Load active categories and brands added from Admin Product Inventory.
  useEffect(() => {
    let cancelled = false;

    const fetchManagedOptions = async () => {
      try {
        const { data } = await axiosInstance.get('/products/options/public');

        if (!cancelled && data.success) {
          setManagedCategories(
            Array.isArray(data.categories) ? data.categories : []
          );
          setManagedBrands(
            Array.isArray(data.brands) ? data.brands : []
          );
        }
      } catch (error) {
        if (!cancelled) console.error('Failed to load header options:', error);
      }
    };

    void fetchManagedOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchCartData = async () => {
      try {
        const { data } = await axiosInstance.get("/cart");

        if (!cancelled && data.success) {
          setCartCount(data.cart?.items?.length || 0);
        }
      } catch {
        if (!cancelled) setCartCount(0);
      }
    };

    void fetchCartData();

    const handleCartUpdate = (event) => {
      // Product detail apna cart kholta hai, isliye duplicate na kholo.
      if (event.detail?.openCart !== false) {
        setIsCartOpen(true);
      }

      if (event.detail?.increase) {
        setCartCount(
          (previous) => previous + event.detail.increase
        );
      } else {
        void fetchCartData();
      }
    };

    const openCart = () => setIsCartOpen(true);

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("openCart", openCart);

    return () => {
      cancelled = true;
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("openCart", openCart);
    };
  }, [user]);

  const toggleCategory = (categoryId) => {
    setExpandedCategoryId((previous) =>
      previous === categoryId ? null : categoryId
    );
  };

  const handleDropdownClick = () => {
    setCloseDropdown(true);
    clearTimeout(dropdownTimerRef.current);

    dropdownTimerRef.current = setTimeout(
      () => setCloseDropdown(false),
      200
    );
  };

  const navCategories = NAV_CATEGORIES.map((category) => {
    const existingLabels = new Set(
      category.sub.map((item) => item.label.trim().toLowerCase())
    );
    const newItems = managedCategories
      .filter((item) => item.menuGroup === category.label && item.value)
      .filter((item) => !existingLabels.has(item.value.trim().toLowerCase()))
      .map((item) => ({
        label: item.value,
        keyword: item.value,
      }));

    return {
      ...category,
      sub: [...category.sub, ...newItems],
    };
  });

  const allBrands = [
    ...new Map(
      [...staticBrands, ...managedBrands]
        .filter((brand) => typeof brand === 'string' && brand.trim())
        .map((brand) => [brand.trim().toLowerCase(), brand.trim()])
    ).values(),
  ];

  const categoriesWithBrands = [
    ...navCategories,
    {
      label: "BRANDS",
      keyword: "Brand",
      sub: allBrands.map((brand) => ({
        label: brand,
        keyword: brand,
      })),
    },
  ];

  const activeSearch = new URLSearchParams(
    location.search
  ).get("search");

  const isTransparent =
    location.pathname === "/" && !scrolled;

  const textColorClass = isTransparent
    ? "text-white"
    : "text-black";

  const navInactiveText = isTransparent
    ? "text-gray-200 hover:text-white"
    : "text-[#6b6b6b] hover:text-black";

  const underlineColor = isTransparent
    ? "after:bg-white"
    : "after:bg-black";

  const dropdownVisibility = closeDropdown
    ? "hidden"
    : "opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0";

  return (
    <>
      {!isTransparent && location.pathname !== "/" && (
        <div className="h-[75px] w-full" />
      )}

      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 h-[75px] flex-shrink-0 z-[999] transition-all duration-300 ${
          isTransparent
            ? "bg-transparent border-transparent"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="flex-1 xl:hidden">
          <button
            type="button"
            aria-label={
              isMobileMenuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-main-navigation"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className={`${textColorClass} hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none outline-none`}
          >
            {isMobileMenuOpen ? (
              <X size={24} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex-1 xl:flex-none flex justify-center xl:justify-start">
          <Link
            to="/"
            aria-label="Truee home"
            className="flex items-center gap-1 group cursor-pointer"
          >
            <img
              src="/Truee_Luxury_Logo.png"
              alt="Truee"
              className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${
                isTransparent
                  ? "brightness-0 invert"
                  : "brightness-0"
              }`}
            />

            <span
              className={`text-sm md:text-[14px] font-semibold tracking-[0.1em] uppercase opacity-90 group-hover:opacity-100 transition-opacity ${textColorClass}`}
            >
              TRUEE
            </span>
          </Link>
        </div>

        {isSearchOpen ? (
          <SearchInline
            onClose={() => setIsSearchOpen(false)}
            navigate={navigate}
          />
        ) : (
          <nav
            aria-label="Main navigation"
            className="hidden xl:flex items-center h-full gap-3 2xl:gap-6 relative z-50"
          >
            {navCategories.map((category) => {
              const isActive =
                location.pathname === "/shop" &&
                activeSearch === category.keyword;

              return (
                <div
                  key={category.label}
                  className="h-full flex items-center relative group"
                >
                  <Link
                    to={getSearchUrl(category.keyword)}
                    onClick={handleDropdownClick}
                    className={`font-semibold text-[10px] xl:text-[11px] tracking-widest uppercase transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none relative py-2 after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${underlineColor} ${
                      isActive
                        ? `${textColorClass} after:w-full`
                        : `${navInactiveText} after:w-0 group-hover:after:w-full`
                    }`}
                  >
                    {category.label}

                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </Link>

                  <div
                    className={`absolute top-[65%] left-1/2 -translate-x-1/2 pt-6 w-56 z-[10] transition-all duration-500 ease-out ${dropdownVisibility}`}
                  >
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                          Categories
                        </span>
                      </div>

                      <ul className="w-full">
                        {category.sub.map((item) => (
                          <li key={item.label}>
                            <Link
                              to={getSearchUrl(item.keyword)}
                              onClick={handleDropdownClick}
                              className="block w-full text-left px-4 py-2.5 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors uppercase tracking-wider cursor-pointer border-b border-gray-50 bg-transparent outline-none"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="h-full flex items-center relative group">
              <Link
                to="/brands"
                onClick={handleDropdownClick}
                className={`font-semibold text-[10px] xl:text-[11px] tracking-widest uppercase transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none relative py-2 after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${underlineColor} ${
                  location.pathname === "/brands"
                    ? `${textColorClass} after:w-full`
                    : `${navInactiveText} after:w-0 group-hover:after:w-full`
                }`}
              >
                BRANDS
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </Link>

              <div
                className={`absolute top-[65%] left-1/2 -translate-x-1/2 pt-6 w-64 z-[10] transition-all duration-500 ease-out ${dropdownVisibility}`}
              >
                <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      Select Brand
                    </span>
                  </div>

                  <ul className="w-full max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {allBrands.map((brand) => (
                      <li key={brand}>
                        <Link
                          to={getBrandUrl(brand)}
                          onClick={handleDropdownClick}
                          className="block w-full text-left px-4 py-2.5 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors uppercase tracking-wider cursor-pointer bg-transparent border-none outline-none"
                        >
                          {brand}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        )}

        <div className="flex-1 xl:flex-none flex items-center justify-end gap-4 md:gap-5 h-full relative z-50">
          <button
            type="button"
            aria-label={
              isSearchOpen ? "Close search" : "Open search"
            }
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`${textColorClass} hover:opacity-60 transition-opacity cursor-pointer hidden sm:block bg-transparent border-none outline-none`}
          >
            <Search
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>

          <div className="h-full flex items-center relative group">
            <Link
              to={user ? "/profile" : "/login"}
              aria-label={user ? "My profile" : "Login"}
              className={`${textColorClass} hover:opacity-60 transition-opacity cursor-pointer flex items-center gap-1`}
            >
              <User
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
              />

              {user && (
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              )}
            </Link>

            {user && (
              <div
                className={`absolute top-[65%] right-0 pt-6 w-56 z-[100] transition-all duration-500 ease-out ${dropdownVisibility}`}
              >
                <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden text-black">
                  <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Signed in as
                    </p>
                    <p className="text-sm font-semibold text-black truncate">
                      {user.name || user.email || "User"}
                    </p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/profile"
                      onClick={handleDropdownClick}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                    >
                      <User
                        size={16}
                        className="text-gray-400"
                        aria-hidden="true"
                      />
                      My Profile
                    </Link>

                    <Link
                      to="/profile?tab=orders"
                      onClick={handleDropdownClick}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                    >
                      <Package
                        size={16}
                        className="text-gray-400"
                        aria-hidden="true"
                      />
                      Orders
                    </Link>
                  </div>

                  <div className="py-2 border-t border-gray-50">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        handleDropdownClick();
                        navigate("/login");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer bg-transparent border-none outline-none"
                    >
                      <LogOut size={16} aria-hidden="true" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className={`${textColorClass} hover:opacity-60 transition-opacity cursor-pointer`}
          >
            <Star
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            aria-label={`Open cart, ${cartCount} items`}
            onClick={() => setIsCartOpen(true)}
            className={`relative flex items-center justify-center ${textColorClass} hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none outline-none`}
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            {cartCount > 0 && (
              <span
                className={`absolute -top-1 -right-2 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  isTransparent
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav
            id="mobile-main-navigation"
            aria-label="Mobile navigation"
            className="absolute top-[75px] left-0 w-full bg-white shadow-xl xl:hidden flex flex-col py-4 z-40 border-t border-zinc-100 max-h-[calc(100dvh-75px)] overflow-y-auto custom-scrollbar text-black"
          >
            <form
              role="search"
              className="px-6 pb-4 mb-2 border-b border-zinc-100 flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();

                const formData = new FormData(event.currentTarget);
                const term = String(
                  formData.get("search") || ""
                ).trim();

                if (!term) return;

                setIsMobileMenuOpen(false);
                navigate(getSearchUrl(term));
              }}
            >
              <Search
                size={16}
                className="text-zinc-400"
                aria-hidden="true"
              />

              <input
                type="search"
                name="search"
                aria-label="Search products"
                placeholder="Search..."
                className="w-full bg-transparent border-none text-sm outline-none text-black"
              />
            </form>

            <div className="flex flex-col gap-1">
              {categoriesWithBrands.map((category, index) => {
                const isBrands = category.label === "BRANDS";
                const isExpanded =
                  expandedCategoryId === category.label;
                const submenuId = `mobile-category-${index}`;

                return (
                  <div
                    key={category.label}
                    className="border-b border-zinc-100 last:border-0"
                  >
                    <div className="w-full flex items-center justify-between px-6 py-4">
                      <Link
                        to={
                          isBrands
                            ? "/brands"
                            : getSearchUrl(category.keyword)
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[#6b6b6b] hover:text-black font-semibold text-[11px] tracking-widest uppercase transition-colors cursor-pointer flex-1 text-left"
                      >
                        {category.label}
                      </Link>

                      <button
                        type="button"
                        aria-label={`${
                          isExpanded ? "Collapse" : "Expand"
                        } ${category.label}`}
                        aria-expanded={isExpanded}
                        aria-controls={submenuId}
                        onClick={() =>
                          toggleCategory(category.label)
                        }
                        className="p-2 -mr-2 text-[#6b6b6b] hover:text-black bg-transparent border-none outline-none cursor-pointer"
                      >
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div id={submenuId} hidden={!isExpanded}>
                      <div className="bg-[#fafafa] px-6 py-2 flex flex-col gap-2">
                        {category.sub.map((item) => (
                          <Link
                            key={item.label}
                            to={
                              isBrands
                                ? getBrandUrl(item.keyword)
                                : getSearchUrl(item.keyword)
                            }
                            onClick={() =>
                              setIsMobileMenuOpen(false)
                            }
                            className="text-left py-2 pl-4 text-zinc-500 hover:text-black font-medium text-[10px] tracking-[0.15em] uppercase transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4 px-6">
                <User
                  size={18}
                  strokeWidth={1.5}
                  className="text-black"
                  aria-hidden="true"
                />

                {user ? (
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-black truncate">
                      {user.name || user.email}
                    </p>

                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[10px] text-gray-500 hover:text-black"
                    >
                      View Account
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-[11px] font-bold text-black uppercase tracking-widest hover:text-gray-600"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>

              {user && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-4 w-full flex items-center gap-3 px-6 py-3 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer bg-transparent border-none outline-none"
                >
                  <LogOut size={16} aria-hidden="true" />
                  Logout
                </button>
              )}
            </div>
          </nav>
        )}

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </motion.header>
    </>
  );
}
