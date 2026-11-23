

// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Crown, Loader2 } from 'lucide-react';
// import { useServerTheme } from '../hooks/useServerTheme';
// import axiosInstance from '../utils/axiosInstance';
// import QuickModel from '../pages/Product/ProductDetailModel';

// export default function Newsletter() {
//   useServerTheme();

//   const [email, setEmail] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Naya: Loading state
//   const [error, setError] = useState(''); // Naya: Error state

//   const [leftProduct, setLeftProduct] = useState(null);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axiosInstance.get('/products');
//         if (data.success && data.products.length > 0) {
//           const targetProduct = data.products.find(p =>
//             p.name?.toLowerCase().includes('devialet mania') ||
//             p.name?.toLowerCase().includes('mania')
//           );
//           setLeftProduct(targetProduct || data.products[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching newsletter product:", error);
//       }
//     };
//     fetchProduct();
//   }, []);

//   // ⚡ FIX: Ab ye function asal mein Backend ko email bhejeha
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     setIsLoading(true);
//     setError('');

//     try {
//       // Backend ke '/newsletter/subscribe' route par post request
//       const response = await axiosInstance.post('/newsletter/subscribe', { email });

//       if (response.data.success) {
//         setIsSubmitted(true);
//         setTimeout(() => {
//           setIsSubmitted(false);
//           setEmail('');
//         }, 4000);
//       }
//     } catch (err) {
//       // Agar email pehle se subscribed hai ya koi error hai
//       setError(err.response?.data?.message || 'Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const leftImageUrl = "https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/02/devialet-mania-review-07-1675694263-jpg.webp";

//   return (
//     <section className="w-full h-auto overflow-x-hidden bg-white px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col justify-center items-center py-6  transition-colors duration-500">

//       <div className="w-full max-w-[1500px] bg-gradient-to-r from-[#f3ede1] via-[#f6efe3] to-white border border-[#eee2c9]/60 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-colors duration-500">

//         {/* Left Side - Image */}
//         <div
//           className="w-full md:w-[30%] lg:w-[26%] h-[180px] sm:h-[220px] md:h-auto relative overflow-hidden group cursor-pointer shrink-0"
//           onClick={() => leftProduct && setQuickViewProduct(leftProduct)}
//         >
//           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700 z-10"></div>

//           <img
//             src={leftImageUrl}
//             alt={leftProduct?.name || "Premium Audio"}
//             className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
//           />
//         </div>

//         {/* Right Side - Content */}
//         <div className="w-full md:flex-1 p-6 sm:p-8 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-8 relative bg-transparent">

//           {/* Text block */}
//           <div className="relative z-10 w-full md:w-auto md:flex-1">
//             <div className="flex items-center gap-2 mb-2 sm:mb-3">
//               <Crown className="w-4 h-4 text-[var(--theme-primary)]" />
//               <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-primary)]">
//                 The Inner Circle
//               </span>
//             </div>

//             <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[34px] font-serif text-[#111] mb-2 leading-[1.15]">
//               Elevate Your{' '}
//               <span className="italic text-[var(--theme-primary)]">Everyday</span>
//             </h2>

//             <p className="text-zinc-500 text-[12px] sm:text-[13px] md:text-[13px] leading-relaxed max-w-md">
//               Become a Truee insider. Gain early access to limited releases and curated tech stories.
//             </p>
//           </div>

//           {/* Form block */}
//           <div className="relative z-10 w-full md:w-[340px] lg:w-[380px] shrink-0">
//             {isSubmitted ? (
//               <div className="bg-white/70 border border-[var(--theme-primary)]/20 rounded-full px-6 py-4 text-center animate-in fade-in zoom-in duration-500">
//                 <p className="text-[var(--theme-primary)] font-serif italic text-[15px]">Welcome to the Club.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="w-full">
//                 <div className="flex items-stretch bg-white rounded-full shadow-sm border border-zinc-200 overflow-hidden focus-within:border-[var(--theme-primary)] transition-colors duration-300">
//                   <input
//                     type="email"
//                     id="newsletter-email"
//                     required
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       setError('');
//                     }}
//                     placeholder="Email address"
//                     disabled={isLoading}
//                     className="flex-1 min-w-0 bg-transparent px-4 sm:px-5 py-3 sm:py-3.5 text-[13px] sm:text-[14px] text-[#111] placeholder:text-zinc-400 focus:outline-none disabled:opacity-50"
//                   />
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="shrink-0 bg-[var(--theme-primary)] text-black hover:bg-black hover:text-white font-bold px-4 sm:px-6 py-3 sm:py-3.5 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <>
//                         Subscribe
//                         <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//                 {error && <p className="text-red-500 text-[11px] mt-2 font-medium px-1">{error}</p>}
//               </form>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Quick View Modal */}
//       {quickViewProduct && (
//         <QuickModel
//           isOpen={!!quickViewProduct}
//           onClose={() => setQuickViewProduct(null)}
//           product={quickViewProduct}
//         />
//       )}
//     </section>
//   );
// }
import React, { useState, useEffect, useRef, useId } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Crown, Loader2 } from "lucide-react";
import { useServerTheme } from "../hooks/useServerTheme";
import axiosInstance from "../utils/axiosInstance";

export default function Newsletter() {
  useServerTheme();

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [leftProduct, setLeftProduct] = useState(null);

  const resetTimerRef = useRef(null);
  const mountedRef = useRef(false);
  const submittingRef = useRef(false);

  const headingId = useId();
  const emailId = useId();
  const errorId = useId();

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      clearTimeout(resetTimerRef.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get("/products");

        const products = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];

        const targetProduct = products.find((product) => {
          const name = String(product.name || "").toLowerCase();

          return name.includes("devialet") && name.includes("mania");
        });

        if (!cancelled) {
          setLeftProduct(
            targetProduct?._id ? targetProduct : null
          );
        }
      } catch (err) {
        console.error("Error fetching newsletter product:", err);
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submittedEmail = email.trim();

    if (!submittedEmail || submittingRef.current) return;

    submittingRef.current = true;
    setIsLoading(true);
    setError("");

    try {
      const { data } = await axiosInstance.post(
        "/newsletter/subscribe",
        { email: submittedEmail }
      );

      if (!mountedRef.current) return;

      if (data?.success) {
        setIsSubmitted(true);

        clearTimeout(resetTimerRef.current);

        resetTimerRef.current = setTimeout(() => {
          if (mountedRef.current) {
            setIsSubmitted(false);
            setEmail("");
          }
        }, 4000);
      } else {
        setError(
          data?.message ||
            "Unable to subscribe. Please try again."
        );
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      submittingRef.current = false;

      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  const productDestination = leftProduct
    ? `/product/${leftProduct._id}`
    : "/shop?search=Devialet%20Mania";

  const leftImageUrl =
    "https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/02/devialet-mania-review-07-1675694263-jpg.webp";

  return (
    <section
      aria-labelledby={headingId}
      className="w-full h-auto overflow-x-hidden bg-white px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col justify-center items-center py-6 transition-colors duration-500"
    >
      <div className="w-full max-w-[1500px] bg-gradient-to-r from-[#f3ede1] via-[#f6efe3] to-white border border-[#eee2c9]/60 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-colors duration-500">
        {/* Product image link */}
        <Link
          to={productDestination}
          aria-label={
            leftProduct
              ? `View ${leftProduct.name}`
              : "Browse Devialet Mania products"
          }
          className="block w-full md:w-[30%] lg:w-[26%] h-[180px] sm:h-[220px] md:h-auto relative overflow-hidden group cursor-pointer shrink-0"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700 z-10 pointer-events-none"
          />

          <img
            src={leftImageUrl}
            alt="Devialet Mania portable speaker"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </Link>

        {/* Content */}
        <div className="w-full md:flex-1 p-6 sm:p-8 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-8 relative bg-transparent">
          <div className="relative z-10 w-full md:w-auto md:flex-1">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Crown
                aria-hidden="true"
                className="w-4 h-4 text-[var(--theme-primary)]"
              />

              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-primary)]">
                The Inner Circle
              </span>
            </div>

            <h2
              id={headingId}
              className="text-2xl sm:text-3xl md:text-3xl lg:text-[34px] font-serif text-[#111] mb-2 leading-[1.15]"
            >
              Elevate Your{" "}
              <span className="italic text-[var(--theme-primary)]">
                Everyday
              </span>
            </h2>

            <p className="text-zinc-500 text-[12px] sm:text-[13px] md:text-[13px] leading-relaxed max-w-md">
              Subscribe to the Truee newsletter for product news
              and updates.
            </p>
          </div>

          {/* Subscription form */}
          <div className="relative z-10 w-full md:w-[340px] lg:w-[380px] shrink-0">
            {isSubmitted ? (
              <div
                role="status"
                className="bg-white/70 border border-[var(--theme-primary)]/20 rounded-full px-6 py-4 text-center animate-in fade-in zoom-in duration-500"
              >
                <p className="text-[var(--theme-primary)] font-serif italic text-[15px]">
                  Thank you for subscribing.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-label="Subscribe to the Truee newsletter"
                aria-busy={isLoading}
                className="w-full"
              >
                <label htmlFor={emailId} className="sr-only">
                  Email address
                </label>

                <div className="flex items-stretch bg-white rounded-full shadow-sm border border-zinc-200 overflow-hidden focus-within:border-[var(--theme-primary)] transition-colors duration-300">
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    placeholder="Email address"
                    disabled={isLoading}
                    className="flex-1 min-w-0 bg-transparent px-4 sm:px-5 py-3 sm:py-3.5 text-[13px] sm:text-[14px] text-[#111] placeholder:text-zinc-400 focus:outline-none disabled:opacity-50"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    aria-label={
                      isLoading
                        ? "Subscribing"
                        : "Subscribe to the newsletter"
                    }
                    className="shrink-0 bg-[var(--theme-primary)] text-black hover:bg-black hover:text-white font-bold px-4 sm:px-6 py-3 sm:py-3.5 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>
                        <Loader2
                          aria-hidden="true"
                          className="w-4 h-4 animate-spin"
                        />
                        <span className="sr-only">
                          Subscribing…
                        </span>
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight
                          aria-hidden="true"
                          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <p
                    id={errorId}
                    role="alert"
                    className="text-red-500 text-[11px] mt-2 font-medium px-1"
                  >
                    {error}
                  </p>
                )}

                <p className="mt-3 px-1 text-[11px] text-zinc-500">
                  Read our{" "}
                  <Link
                    to="/privacy-policy"
                    className="underline hover:text-black"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}






// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Crown, Loader2 } from 'lucide-react';
// import { useServerTheme } from '../hooks/useServerTheme';
// import axiosInstance from '../utils/axiosInstance';
// import QuickModel from '../pages/Product/ProductDetailModel';

// export default function Newsletter() {
//   useServerTheme();

//   const [email, setEmail] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Naya: Loading state
//   const [error, setError] = useState(''); // Naya: Error state

//   const [leftProduct, setLeftProduct] = useState(null);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axiosInstance.get('/products');
//         if (data.success && data.products.length > 0) {
//           const targetProduct = data.products.find(p =>
//             p.name?.toLowerCase().includes('devialet mania') ||
//             p.name?.toLowerCase().includes('mania')
//           );
//           setLeftProduct(targetProduct || data.products[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching newsletter product:", error);
//       }
//     };
//     fetchProduct();
//   }, []);

//   // ⚡ FIX: Ab ye function asal mein Backend ko email bhejeha
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     setIsLoading(true);
//     setError('');

//     try {
//       // Backend ke '/newsletter/subscribe' route par post request
//       const response = await axiosInstance.post('/newsletter/subscribe', { email });

//       if (response.data.success) {
//         setIsSubmitted(true);
//         setTimeout(() => {
//           setIsSubmitted(false);
//           setEmail('');
//         }, 4000);
//       }
//     } catch (err) {
//       // Agar email pehle se subscribed hai ya koi error hai
//       setError(err.response?.data?.message || 'Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const leftImageUrl = "https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/02/devialet-mania-review-07-1675694263-jpg.webp";

//   return (
//     <section 
//       className="w-full h-auto overflow-x-hidden bg-white px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col justify-center items-center py-6  transition-colors duration-500"
//       // ⚡ Only Font Family changed to Apple SF Pro
//       style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
//     >

//       <div className="w-full max-w-[1500px] bg-gradient-to-r from-[#f3ede1] via-[#f6efe3] to-white border border-[#eee2c9]/60 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-colors duration-500">

//         {/* Left Side - Image */}
//         <div
//           className="w-full md:w-[30%] lg:w-[26%] h-[180px] sm:h-[220px] md:h-auto relative overflow-hidden group cursor-pointer shrink-0"
//           onClick={() => leftProduct && setQuickViewProduct(leftProduct)}
//         >
//           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700 z-10"></div>

//           <img
//             src={leftImageUrl}
//             alt={leftProduct?.name || "Premium Audio"}
//             className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
//           />
//         </div>

//         {/* Right Side - Content */}
//         <div className="w-full md:flex-1 p-6 sm:p-8 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-8 relative bg-transparent">

//           {/* Text block */}
//           <div className="relative z-10 w-full md:w-auto md:flex-1">
//             <div className="flex items-center gap-2 mb-2 sm:mb-3">
//               <Crown className="w-4 h-4 text-[var(--theme-primary)]" />
//               <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-primary)]">
//                 The Inner Circle
//               </span>
//             </div>

//             {/* ⚡ Removed font-serif and added font-bold */}
//             <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[34px] font-bold text-[#111] mb-2 leading-[1.15]">
//               Elevate Your{' '}
//               <span className="italic text-[var(--theme-primary)]">Everyday</span>
//             </h2>

//             <p className="text-zinc-500 text-[12px] sm:text-[13px] md:text-[13px] leading-relaxed max-w-md">
//               Become a Truee insider. Gain early access to limited releases and curated tech stories.
//             </p>
//           </div>

//           {/* Form block */}
//           <div className="relative z-10 w-full md:w-[340px] lg:w-[380px] shrink-0">
//             {isSubmitted ? (
//               <div className="bg-white/70 border border-[var(--theme-primary)]/20 rounded-full px-6 py-4 text-center animate-in fade-in zoom-in duration-500">
//                 {/* ⚡ Removed font-serif */}
//                 <p className="text-[var(--theme-primary)] italic font-semibold text-[15px]">Welcome to the Club.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="w-full">
//                 <div className="flex items-stretch bg-white rounded-full shadow-sm border border-zinc-200 overflow-hidden focus-within:border-[var(--theme-primary)] transition-colors duration-300">
//                   <input
//                     type="email"
//                     id="newsletter-email"
//                     required
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       setError('');
//                     }}
//                     placeholder="Email address"
//                     disabled={isLoading}
//                     className="flex-1 min-w-0 bg-transparent px-4 sm:px-5 py-3 sm:py-3.5 text-[13px] sm:text-[14px] text-[#111] placeholder:text-zinc-400 focus:outline-none disabled:opacity-50"
//                   />
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="shrink-0 bg-[var(--theme-primary)] text-black hover:bg-black hover:text-white font-bold px-4 sm:px-6 py-3 sm:py-3.5 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <>
//                         Subscribe
//                         <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//                 {error && <p className="text-red-500 text-[11px] mt-2 font-medium px-1">{error}</p>}
//               </form>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Quick View Modal */}
//       {quickViewProduct && (
//         <QuickModel
//           isOpen={!!quickViewProduct}
//           onClose={() => setQuickViewProduct(null)}
//           product={quickViewProduct}
//         />
//       )}
//     </section>
//   );
// }