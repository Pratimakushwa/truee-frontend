

// import React, { useState, useEffect } from 'react';
// import axiosInstance from "../../utils/axiosInstance";
// import { Tag, Copy, Check, X } from 'lucide-react';

// const HomeCouponDisplay = ({ displayLocation }) => {
//     const [coupons, setCoupons] = useState([]);
//     const [copied, setCopied] = useState(null);
//     const [isVisible, setIsVisible] = useState(false);
//     const [isClosed, setIsClosed] = useState(false); // ⚡ Naya state close handle karne ke liye

//     useEffect(() => {
//         const fetchCoupons = async () => {
//             try {
//                 const { data } = await axiosInstance.get('/coupons/all');
//                 const filtered = (data.coupons || []).filter(c => {
//                     const placementMatch = (c.placements && c.placements.includes(displayLocation)) || (c.showOn && c.showOn.includes(displayLocation));
//                     return placementMatch && (!c.status || c.status.toLowerCase() === 'active');
//                 });
//                 setCoupons(filtered);
//             } catch (err) { console.error("Coupon load error", err); }
//         };
//         fetchCoupons();
//     }, [displayLocation]);

//     // ⚡ LOOP LOGIC: 5 sec visible, 2 sec hidden (BINA KISI CHANGE KE)
//     useEffect(() => {
//         if (coupons.length === 0) return;

//         const interval = setInterval(() => {
//             setIsVisible(prev => !prev);
//         }, 7000); // Total cycle time (5s show + 2s hide)

//         // Initial delay before first show
//         const timeout = setTimeout(() => setIsVisible(true), 2000);

//         return () => {
//             clearInterval(interval);
//             clearTimeout(timeout);
//         };
//     }, [coupons.length]);

//     const copyCode = (code) => {
//         navigator.clipboard.writeText(code);
//         setCopied(code);
//         setTimeout(() => setCopied(null), 2000);
//     };

//     // ⚡ Agar user ne close kar diya ya coupons nahi hain, toh kuch mat dikhao
//     if (coupons.length === 0 || isClosed) return null;

//     return (
//         <div 
//             className={`fixed bottom-8 right-8 z-[9999] transition-all duration-700 ease-in-out transform
//             ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
//         >
//             {coupons.slice(0, 1).map(c => (
//                 <div key={c._id} className="w-[300px] bg-white border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] p-5 rounded-2xl relative">
                    
//                     {/* ⚡ CLOSE BUTTON ADDED HERE */}
//                     <button 
//                         onClick={() => setIsClosed(true)}
//                         className="absolute top-3 right-3 p-1 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
//                         aria-label="Close"
//                     >
//                         <X size={14} />
//                     </button>

//                     {/* Header */}
//                     <div className="flex items-center gap-3 mb-4">
//                         <div className="bg-[#FCFAEF] p-2.5 rounded-full border border-[#C8A253]/20">
//                             <Tag size={16} className="text-[#C8A253]" />
//                         </div>
//                         <div className="flex-1 pr-4"> {/* Added pr-4 to prevent text from overlapping the close button */}
//                             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black line-clamp-1">
//                                 {c.campaign || "Limited Offer"}
//                             </h4>
//                             <p className="text-[9px] text-gray-500 font-medium">Use code at checkout</p>
//                         </div>
//                     </div>

//                     {/* Code Section */}
//                     <div 
//                         onClick={() => copyCode(c.code)}
//                         className="group w-full flex items-center justify-between px-4 py-3 bg-[#111] text-white cursor-pointer hover:bg-[#C8A253] transition-all duration-300"
//                     >
//                         <span className="font-bold text-xs tracking-[0.2em] uppercase">
//                             {c.code}
//                         </span>
//                         {copied === c.code ? (
//                             <Check size={14} className="text-white" />
//                         ) : (
//                             <Copy size={14} className="text-white opacity-60 group-hover:opacity-100" />
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default HomeCouponDisplay;

import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Tag, Copy, Check, X } from "lucide-react";

export default function HomeCouponDisplay({ displayLocation }) {
  const [coupons, setCoupons] = useState([]);
  const [copied, setCopied] = useState(null);
  const [copyError, setCopyError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const copyTimerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCoupons = async () => {
      try {
        const { data } = await axiosInstance.get("/coupons/all");

        const list = Array.isArray(data?.coupons)
          ? data.coupons
          : [];

        const filtered = list.filter((coupon) => {
          const placementMatch =
            (Array.isArray(coupon.placements) &&
              coupon.placements.includes(displayLocation)) ||
            (Array.isArray(coupon.showOn) &&
              coupon.showOn.includes(displayLocation));

          const isActive =
            !coupon.status ||
            String(coupon.status).toLowerCase() === "active";

          return placementMatch && isActive && coupon.code;
        });

        if (!cancelled) setCoupons(filtered);
      } catch (error) {
        console.error("Coupon load error:", error);
      }
    };

    fetchCoupons();

    return () => {
      cancelled = true;
    };
  }, [displayLocation]);

  // Show after 2 seconds, then keep the existing 7-second toggle.
  useEffect(() => {
    if (coupons.length === 0 || isClosed) return;

    const timeout = setTimeout(() => setIsVisible(true), 2000);

    const interval = setInterval(() => {
      setIsVisible((previous) => !previous);
    }, 7000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [coupons.length, isClosed]);

  useEffect(() => {
    return () => clearTimeout(copyTimerRef.current);
  }, []);

  const copyCode = async (code) => {
    setCopyError("");
    setCopied(null);
    clearTimeout(copyTimerRef.current);

    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);

      copyTimerRef.current = setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch {
      setCopyError(
        "Could not copy automatically. Please copy the code manually."
      );
    }
  };

  if (coupons.length === 0 || isClosed) return null;

  const coupon = coupons[0];

  return (
    <aside
      aria-label="Coupon offer"
      aria-hidden={!isVisible}
      inert={!isVisible}
      className={`fixed bottom-8 right-4 sm:right-8 z-[9999] max-w-[calc(100vw-2rem)] transition-all duration-700 ease-in-out motion-reduce:transition-none transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <div className="w-[300px] max-w-full bg-white border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] p-5 rounded-2xl relative">
        <button
          type="button"
          onClick={() => setIsClosed(true)}
          aria-label="Close coupon offer"
          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X size={14} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#FCFAEF] p-2.5 rounded-full border border-[#C8A253]/20">
            <Tag
              size={16}
              aria-hidden="true"
              className="text-[#C8A253]"
            />
          </div>

          <div className="flex-1 pr-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black line-clamp-1">
              {coupon.campaign || "Coupon Offer"}
            </p>

            <p className="text-[9px] text-gray-500 font-medium">
              Use code at checkout
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => copyCode(coupon.code)}
          aria-label={`Copy coupon code ${coupon.code}`}
          className="group w-full flex items-center justify-between px-4 py-3 bg-[#111] text-white cursor-pointer hover:bg-[#C8A253] transition-all duration-300"
        >
          <span className="font-bold text-xs tracking-[0.2em] uppercase">
            {coupon.code}
          </span>

          {copied === coupon.code ? (
            <Check size={14} aria-hidden="true" />
          ) : (
            <Copy
              size={14}
              aria-hidden="true"
              className="opacity-60 group-hover:opacity-100"
            />
          )}
        </button>

        <p role="status" className="text-xs text-gray-600 mt-2">
          {copied === coupon.code ? "Coupon code copied." : ""}
        </p>

        {copyError && (
          <p role="alert" className="text-xs text-red-600 mt-2">
            {copyError}
          </p>
        )}
      </div>
    </aside>
  );
}