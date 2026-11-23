
// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
// import axiosInstance from "../../utils/axiosInstance";

// export default function TestimonialSlider() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFeaturedReviews = async () => {
//       try {
//         const { data } = await axiosInstance.get(
//           "/reviews/approved-testimonials",
//         );

//         if (data.testimonials && data.testimonials.length > 0) {
//           const formattedReviews = data.testimonials.map((t) => ({
//             id: t._id,
//             name: t.user?.name || "Valued Customer",
//             role: "Verified Buyer",
//             quote: t.comment,
//             rating: t.rating || 5,
//             productName: t.productName,
//           }));
//           setTestimonials(formattedReviews);
//         } else {
//           setTestimonials([]);
//         }
//       } catch (err) {
//         console.error("Error fetching testimonials:", err);
//         setError("Unable to load testimonials.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeaturedReviews();
//   }, []);

//   useEffect(() => {
//     if (testimonials.length === 0) return;
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   const nextSlide = () => {
//     if (testimonials.length > 0)
//       setActiveIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     if (testimonials.length > 0)
//       setActiveIndex(
//         (prev) => (prev - 1 + testimonials.length) % testimonials.length,
//       );
//   };

//   const getCardClassName = (index) => {
//     const length = testimonials.length;
//     if (length === 0) return "hidden";

//     const isCenter = index === activeIndex;
//     const isLeft = index === (activeIndex - 1 + length) % length;
//     const isRight = index === (activeIndex + 1) % length;

//     let baseClass =
//       "absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out w-[90%] max-w-[330px] sm:max-w-none sm:w-[440px] md:w-[520px] h-[220px] sm:h-[250px] bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 rounded-xl p-5 sm:p-7 flex";

//     if (isCenter) {
//       return (
//         baseClass +
//         " -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 z-30 pointer-events-auto"
//       );
//     } else if (isLeft && length > 1) {
//       return (
//         baseClass +
//         " -translate-x-[130%] sm:-translate-x-[140%] md:-translate-x-[125%] -translate-y-1/2 scale-[0.85] opacity-0 sm:opacity-60 md:opacity-100 z-20 pointer-events-none"
//       );
//     } else if (isRight && length > 1) {
//       return (
//         baseClass +
//         " translate-x-[30%] sm:translate-x-[40%] md:translate-x-[25%] -translate-y-1/2 scale-[0.85] opacity-0 sm:opacity-60 md:opacity-100 z-20 pointer-events-none"
//       );
//     } else {
//       return (
//         baseClass +
//         " -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 z-10 pointer-events-none"
//       );
//     }
//   };

//   if (loading || error || testimonials.length === 0) {
//     return (
//       <div 
//         className="bg-[#fafafa] flex flex-col items-center justify-center py-12 sm:py-14 px-4"
//         style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
//       >
//         <div className="text-center mb-6 max-w-xl">
//           <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-[#111] mb-2 tracking-tight">
//             This Is What Our Customers Say
//           </h2>
//           <p className="text-gray-500 text-sm md:text-base">
//             Real stories from people who use our platform every day.
//           </p>
//         </div>
//         <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 sm:p-12 text-center text-gray-500 tracking-wide text-sm sm:text-base w-full max-w-lg">
//           {loading
//             ? "Loading testimonials..."
//             : error || "No testimonials available yet."}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="w-full bg-[#fafafa] flex flex-col items-center justify-center py-10 px-4 overflow-hidden"
//       style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-center gap-3 mb-3">
//         <span className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"></span>
//         <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#a97c2f] uppercase">
//           Customer Reviews
//         </span>
//         <span className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"></span>
//       </div>

//       <div className="text-center mb-8 sm:mb-10 max-w-xl">
//         <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#111] mb-2">
//           This Is What Our Customers Say
//         </h2>
//         <p className="text-gray-500 text-sm md:text-base tracking-wide">
//           Real stories from people who use our platform every day.
//         </p>
//       </div>

//       <div className="relative w-full max-w-7xl h-[230px] sm:h-[280px] flex justify-center items-center">
//         {testimonials.map((testimonial, index) => (
//           <div key={testimonial.id} className={getCardClassName(index)}>
//             <div className="flex w-full h-full gap-4 sm:gap-5 items-stretch">
              
//               {/* Premium Vertical Line */}
//               <div
//                 className="w-1 bg-[#C8A253] rounded-full flex-shrink-0"
//                 style={{ height: "80%", alignSelf: "center" }}
//               ></div>

//               {/* Card Content Layout */}
//               <div className="flex flex-col flex-1 text-left h-full justify-center py-1">
//                 <div className="mb-3 sm:mb-4">
//                   <Quote
//                     size={16}
//                     strokeWidth={2.5}
//                     className="text-[#C8A253] opacity-90 rotate-180 mb-2 sm:mb-2.5 hidden sm:block"
//                   />

//                   <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed line-clamp-4 font-medium pr-2">
//                     {testimonial.quote}
//                   </p>
//                 </div>

//                 <div>
//                   {/* Improved Star UI */}
//                   <div className="flex gap-1 mb-2">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={14}
//                         strokeWidth={1.5}
//                         className={`${
//                           i < testimonial.rating
//                             ? "fill-[#eab308] text-[#eab308]"
//                             : "fill-gray-200 text-gray-200"
//                         } transition-colors duration-200 sm:w-[15px] sm:h-[15px]`}
//                       />
//                     ))}
//                   </div>

//                   <h4 className="text-[0.95rem] sm:text-[1.05rem] font-semibold text-[#111] leading-tight mb-1">
//                     {testimonial.name}
//                   </h4>
//                   <p className="text-[0.55rem] sm:text-[0.6rem] font-bold text-gray-400 uppercase tracking-[0.2em]">
//                     {testimonial.productName ? `Verified Buyer` : "Customer"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useId } from "react";
import { Star, Quote } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const getValidRating = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const rating = Number(value);

  return Number.isFinite(rating) && rating >= 1 && rating <= 5
    ? rating
    : null;
};

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headingId = useId();

  useEffect(() => {
    let cancelled = false;

    const fetchFeaturedReviews = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/reviews/approved-testimonials"
        );

        if (cancelled) return;

        const reviews = Array.isArray(data?.testimonials)
          ? data.testimonials
          : [];

        const seen = new Set();

        const formattedReviews = reviews
          .filter((review) => {
            if (
              !review?._id ||
              seen.has(review._id) ||
              !String(review.comment || "").trim()
            ) {
              return false;
            }

            seen.add(review._id);
            return true;
          })
          .map((review) => ({
            id: review._id,
            name: review.user?.name || "Customer",
            quote: String(review.comment).trim(),
            rating: getValidRating(review.rating),
            productName: review.productName || "",
          }));

        setTestimonials(formattedReviews);
        setActiveIndex(0);
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching testimonials:", err);
          setError("Unable to load testimonials.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchFeaturedReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (testimonials.length < 2) return;

    const interval = setInterval(() => {
      setActiveIndex(
        (previous) => (previous + 1) % testimonials.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getCardClassName = (index) => {
    const length = testimonials.length;

    const isCenter = index === activeIndex;
    const isLeft = index === (activeIndex - 1 + length) % length;
    const isRight = index === (activeIndex + 1) % length;

    const baseClass =
      "absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out motion-reduce:transition-none w-[90%] max-w-[330px] sm:max-w-none sm:w-[440px] md:w-[520px] h-[220px] sm:h-[250px] bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 rounded-xl p-5 sm:p-7 flex";

    if (isCenter) {
      return `${baseClass} -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 z-30 pointer-events-auto`;
    }

    if (isLeft && length > 1) {
      return `${baseClass} -translate-x-[130%] sm:-translate-x-[140%] md:-translate-x-[125%] -translate-y-1/2 scale-[0.85] opacity-0 sm:opacity-60 md:opacity-100 z-20 pointer-events-none`;
    }

    if (isRight && length > 1) {
      return `${baseClass} translate-x-[30%] sm:translate-x-[40%] md:translate-x-[25%] -translate-y-1/2 scale-[0.85] opacity-0 sm:opacity-60 md:opacity-100 z-20 pointer-events-none`;
    }

    return `${baseClass} -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 z-10 pointer-events-none`;
  };

  const fontStyle = {
    fontFamily:
      '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
  };

  if (loading || error || testimonials.length === 0) {
    return (
      <section
        aria-labelledby={headingId}
        className="bg-[#fafafa] flex flex-col items-center justify-center py-12 sm:py-14 px-4"
        style={fontStyle}
      >
        <div className="text-center mb-6 max-w-xl">
          <h2
            id={headingId}
            className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-[#111] mb-2 tracking-tight"
          >
            This Is What Our Customers Say
          </h2>

          <p className="text-gray-500 text-sm md:text-base">
            Customer feedback about products and shopping at Truee.
          </p>
        </div>

        <div
          role="status"
          className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 sm:p-12 text-center text-gray-500 tracking-wide text-sm sm:text-base w-full max-w-lg"
        >
          {loading
            ? "Loading testimonials..."
            : error || "No testimonials available yet."}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[#fafafa] flex flex-col items-center justify-center py-10 px-4 overflow-hidden"
      style={fontStyle}
    >
      <div className="flex items-center justify-center gap-3 mb-3">
        <span
          aria-hidden="true"
          className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"
        />

        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#a97c2f] uppercase">
          Customer Reviews
        </span>

        <span
          aria-hidden="true"
          className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"
        />
      </div>

      <div className="text-center mb-8 sm:mb-10 max-w-xl">
        <h2
          id={headingId}
          className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#111] mb-2"
        >
          This Is What Our Customers Say
        </h2>

        <p className="text-gray-500 text-sm md:text-base tracking-wide">
          Customer feedback about products and shopping at Truee.
        </p>
      </div>

      <div className="relative w-full max-w-7xl h-[230px] sm:h-[280px] flex justify-center items-center">
        {testimonials.map((testimonial, index) => (
          <figure
            key={testimonial.id}
            aria-hidden={index !== activeIndex}
            className={`${getCardClassName(index)} m-0`}
          >
            <div className="flex w-full h-full gap-4 sm:gap-5 items-stretch">
              <div
                aria-hidden="true"
                className="w-1 bg-[#C8A253] rounded-full flex-shrink-0"
                style={{ height: "80%", alignSelf: "center" }}
              />

              <div className="flex flex-col flex-1 min-w-0 text-left h-full justify-center py-1">
                <div className="mb-3 sm:mb-4">
                  <Quote
                    size={16}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="text-[#C8A253] opacity-90 rotate-180 mb-2 sm:mb-2.5 hidden sm:block"
                  />

                  <blockquote className="m-0 text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed line-clamp-4 font-medium pr-2">
                    {testimonial.quote}
                  </blockquote>
                </div>

                <figcaption>
                  {testimonial.rating !== null && (
                    <div
                      role="img"
                      aria-label={`${testimonial.rating} out of 5 stars`}
                      className="flex gap-1 mb-2"
                    >
                      {Array.from({ length: 5 }, (_, starIndex) => {
                        const fillPercent =
                          Math.max(
                            0,
                            Math.min(1, testimonial.rating - starIndex)
                          ) * 100;

                        return (
                          <span
                            key={starIndex}
                            aria-hidden="true"
                            className="relative inline-block w-[14px] h-[14px] sm:w-[15px] sm:h-[15px]"
                          >
                            <Star
                              size={14}
                              strokeWidth={1.5}
                              className="absolute inset-0 w-full h-full fill-gray-200 text-gray-200"
                            />

                            <span
                              className="absolute inset-y-0 left-0 overflow-hidden"
                              style={{ width: `${fillPercent}%` }}
                            >
                              <Star
                                size={14}
                                strokeWidth={1.5}
                                className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] max-w-none fill-[#eab308] text-[#eab308]"
                              />
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <p className="text-[0.95rem] sm:text-[1.05rem] font-semibold text-[#111] leading-tight mb-1">
                    {testimonial.name}
                  </p>

                  <p className="text-[0.55rem] sm:text-[0.6rem] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    {testimonial.productName || "Customer"}
                  </p>
                </figcaption>
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}