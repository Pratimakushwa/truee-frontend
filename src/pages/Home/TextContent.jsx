

import React from "react";
import { Link } from "react-router-dom";

const TextContent = () => {
  return (
    <div
      className="flex flex-col items-start text-left w-full max-w-full"
      style={{
        fontFamily:
          '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <span className="inline-flex items-center gap-2 bg-[#FDFBF7] border border-[#E5D5A4]/40 text-[#C8A253] text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full mb-5">
        <span
          aria-hidden="true"
          className="relative flex h-1.5 w-1.5"
        >
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A253] opacity-50" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C8A253]" />
        </span>
        Explore Our Collection
      </span>

      <h2
        className="text-2xl sm:text-3xl md:text-[32px] text-[#1a1a1a] mb-2"
        style={{ fontWeight: 600 }}
      >
        Explore Speakers &amp; Headphones
        <span className="text-[#C8A253]">.</span>
      </h2>

      <div
        aria-hidden="true"
        className="w-16 h-[2px] bg-[#C8A253] mb-6 sm:mb-8"
      />

      <p className="text-gray-500 text-[13.5px] sm:text-[14.5px] leading-[1.8] mb-8 font-medium max-w-xl">
        Discover speakers, headphones and earphones at Truee.
        Explore product features, available variants and prices
        to find an option for your home, workspace or everyday
        listening.
      </p>

      <Link
        to="/shop"
        className="group bg-[#111] text-white px-8 py-3.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#C8A253] hover:shadow-[0_8px_25px_rgba(200,162,83,0.25)] transition-all duration-300 cursor-pointer inline-flex items-center gap-3 self-start"
      >
        Explore All Products
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
};

export default TextContent;