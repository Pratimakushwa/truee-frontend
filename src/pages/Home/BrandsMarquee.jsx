

import React from "react";
import { Link } from "react-router-dom";

const brands = [
  { id: 1, name: "Devialet", imgUrl: "/logos/01.png" },
  { id: 2, name: "Nespresso", imgUrl: "/logos/02.png" },
  {
    id: 4,
    name: "Withings",
    imgUrl: "/logos/04.png",
    scale: "scale-[1.1]",
  },
  { id: 5, name: "Sonos", imgUrl: "/logos/05.png" },
  { id: 6, name: "Therabody", imgUrl: "/logos/06.png" },
  {
    id: 7,
    name: "Bang & Olufsen",
    imgUrl: "/logos/07.png",
    scale: "scale-[1.2]",
  },
  {
    id: 8,
    name: "Sennheiser",
    imgUrl: "/logos/08.png",
    scale: "scale-[1.1]",
  },
  { id: 9, name: "Bose", imgUrl: "/logos/09.png" },
  { id: 10, name: "Sony", imgUrl: "/logos/10.png" },
  { id: 11, name: "Marshall", imgUrl: "/logos/11.png" },
  { id: 12, name: "Polar", imgUrl: "/logos/13.png" },
  { id: 14, name: "Truee", imgUrl: "/Truee_Luxury_Logo.png" },
  { id: 13, name: "Noise", imgUrl: "/logos/noise-logo.png" },
];

export default function BrandsMarquee() {
  return (
    <section
      aria-label="Shop by brand"
      className="pb-2 bg-white overflow-hidden"
    >
      <style>{`
        @keyframes truee-brand-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .truee-brand-track {
          animation: truee-brand-scroll 35s linear infinite;
        }

        .truee-brand-marquee:hover .truee-brand-track,
        .truee-brand-marquee:focus-within .truee-brand-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .truee-brand-track {
            animation: none;
          }

          .truee-brand-marquee {
            overflow-x: auto;
          }

          .truee-brand-copy {
            display: none;
          }
        }
      `}</style>

      <div className="truee-brand-marquee w-full relative overflow-hidden mt-4">
        <div className="truee-brand-track flex w-max">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1 ? true : undefined}
              className={`flex flex-nowrap shrink-0 gap-12 px-6 items-center ${
                copyIndex === 1 ? "truee-brand-copy" : ""
              }`}
            >
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                  tabIndex={copyIndex === 1 ? -1 : undefined}
                  aria-label={`Shop ${brand.name} products`}
                  className="flex-shrink-0 w-[140px] h-[70px] md:w-[120px] md:h-[60px] flex items-center justify-center cursor-pointer group px-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black"
                >
                  <img
                    src={brand.imgUrl}
                    alt={`${brand.name} logo`}
                    className={`max-w-full max-h-full object-contain opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100 grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0 mix-blend-multiply transition-all duration-500 ${
                      brand.scale || "scale-100"
                    }`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}