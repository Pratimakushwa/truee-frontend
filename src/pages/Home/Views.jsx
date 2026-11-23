

import React, { useState, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {
  Volume2,
  BatteryCharging,
  Droplet,
  Bluetooth,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";

const stripHtml = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const checkStock = (value) => {
  if (value === true) return true;

  const text = String(value ?? "").toLowerCase().trim();

  if (
    !text ||
    ["0", "false", "out of stock", "coming soon"].includes(text)
  ) {
    return false;
  }

  const quantity = Number(text);

  if (Number.isFinite(quantity)) {
    return quantity > 0;
  }

  return ["available", "in stock", "yes"].includes(text);
};

const features = [
  { Icon: Volume2, value: "360°", label: "Sound" },
  {
    Icon: BatteryCharging,
    value: "20+",
    label: "Hours Playtime",
  },
  { Icon: Droplet, value: "IPX2", label: "Water Resistant" },
  { Icon: Bluetooth, value: "5.0", label: "Bluetooth" },
];

export default function MarshallDesign() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const headingId = useId();

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

        const tufton = products.find((item) =>
          /\btufton\b/i.test(String(item.name || ""))
        );

        if (!cancelled) {
          setProduct(tufton?._id ? tufton : null);
        }
      } catch (error) {
        console.error("Error fetching Tufton product:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || !product) return null;

  const name = product.name || "Marshall Tufton";
  const productUrl = `/product/${product._id}`;

  const imageUrl =
    product.images?.[0]?.url ||
    product.variants?.[0]?.images?.[0]?.url ||
    (typeof product.image === "string" ? product.image : "") ||
    "https://placehold.co/600x600/ffffff/111111?text=Marshall+Tufton";

  const description =
    stripHtml(product.description) ||
    `Explore ${name} at Truee. View product details, features and available options.`;

  // Existing pricing convention: discountPrice is the discount amount.
  const originalPrice = Number(product.price) || 0;
  const discount = Number(product.discountPrice) || 0;
  const finalPrice = originalPrice - discount;

  const variants = Array.isArray(product.variants)
    ? product.variants
    : [];

  const isAvailable =
    variants.length > 0
      ? variants.some((variant) => checkStock(variant.stock))
      : checkStock(product.stock);

  return (
    <section
      aria-labelledby={headingId}
      className="w-full flex flex-col items-center justify-center bg-white py-12 px-4 lg:px-12 relative z-10"
      style={{
        fontFamily:
          '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <div className="w-full max-w-[1300px] flex flex-col md:flex-row h-auto md:min-h-[440px] bg-white rounded-[24px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-gray-100 relative z-20">
        {/* Product image */}
        <Link
          to={productUrl}
          aria-label={`View ${name}`}
          className="w-full md:w-[45%] h-[350px] md:h-auto md:min-h-[440px] relative p-8 flex items-center justify-center cursor-pointer group z-20"
        >
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 w-80 h-80 bg-[#F6F0E7] rounded-full z-0 transition-transform duration-700 group-hover:scale-105"
          />

          <div
            aria-hidden="true"
            className="absolute left-8 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-2 opacity-30 z-0"
          >
            {Array.from({ length: 10 }, (_, index) => (
              <div
                key={index}
                className="w-1 h-1 bg-[#C8A253] rounded-full"
              />
            ))}
          </div>

          <img
            src={imageUrl}
            alt={name}
            width={600}
            height={600}
            loading="lazy"
            decoding="async"
            className="relative z-10 w-full h-full max-h-[380px] object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Desktop decoration */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 z-10 pointer-events-none"
        >
          <div className="absolute top-0 bottom-0 left-[45%] right-0 bg-[#C8A253] [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]" />
          <div className="absolute top-0 bottom-0 left-[45%] right-0 bg-[#FCFBF8] ml-[1.5px] [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]" />
        </div>

        <div
          aria-hidden="true"
          className="md:hidden w-full h-[2px] bg-[#C8A253]"
        />

        {/* Product content */}
        <div className="w-full md:w-[55%] relative flex flex-col justify-center px-6 py-10 md:pl-[12%] md:pr-12 lg:pr-16 z-20 bg-[#FCFBF8] md:bg-transparent">
          <div
            aria-hidden="true"
            className="absolute top-8 right-8 grid grid-cols-4 gap-2 opacity-20 hidden sm:grid"
          >
            {Array.from({ length: 16 }, (_, index) => (
              <div
                key={index}
                className="w-1 h-1 bg-gray-400 rounded-full"
              />
            ))}
          </div>

          <div className="relative z-20">
            <div className="mb-4">
              <span className="text-[8px] md:text-[11px] font-bold text-[#A87E43] tracking-[0.15em] uppercase">
                Premium Sound
              </span>

              <div
                aria-hidden="true"
                className="w-16 h-[1.5px] bg-[#A87E43] mt-1.5"
              />
            </div>

            <h2
              id={headingId}
              className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#111] mb-2"
            >
              <Link to={productUrl} className="hover:underline">
                {name}
              </Link>
            </h2>

            <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed max-w-lg mb-8">
              {description}
            </p>

            {/* Original feature labels */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-6 pb-6 border-b border-gray-200">
              {features.map(({ Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5"
                >
                  <Icon
                    aria-hidden="true"
                    className="text-[#A87E43]"
                    size={22}
                    strokeWidth={1.5}
                  />

                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111]">
                      {value}
                    </span>
                    <span className="text-[9px] text-gray-500">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price and availability */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xl md:text-2xl font-bold text-[#111] tracking-tight">
                {finalPrice > 0
                  ? `₹${finalPrice.toLocaleString("en-IN")}`
                  : "Price on Request"}
              </span>

              {discount > 0 && finalPrice > 0 && (
                <span className="text-base text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}

              <span
                className={`text-[9px] font-bold px-3 py-1.5 rounded uppercase tracking-wider ${
                  isAvailable
                    ? "bg-[#E0F2E9] text-[#299555]"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isAvailable ? "Available" : "Out of Stock"}
              </span>
            </div>

            {/* Product link and original badges */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Link
                to={productUrl}
                aria-label={`Shop ${name}`}
                className="flex items-center justify-center gap-3 bg-[#111] text-white px-8 py-3.5 rounded-lg text-[11px] font-bold hover:bg-[#222] transition-colors uppercase tracking-widest w-max group shadow-lg"
              >
                Shop Now
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="text-[#C8A253] group-hover:translate-x-1 transition-transform"
                  strokeWidth={2}
                />
              </Link>

              <div className="flex items-center gap-4 pl-0 sm:pl-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={20}
                    aria-hidden="true"
                    className="text-[#A87E43]"
                    strokeWidth={1.5}
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111]">
                      1 Year
                    </span>
                    <span className="text-[9px] text-gray-500">
                      Warranty
                    </span>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="w-px h-6 bg-gray-300 hidden sm:block"
                />

                <div className="flex items-center gap-2">
                  <Truck
                    size={20}
                    aria-hidden="true"
                    className="text-[#A87E43]"
                    strokeWidth={1.5}
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111]">
                      Free
                    </span>
                    <span className="text-[9px] text-gray-500">
                      Shipping
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}