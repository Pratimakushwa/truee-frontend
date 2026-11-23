
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   Truck,
//   Clock,
//   ShieldCheck,
//   Globe,
//   MapPin,
//   Package,
// } from "lucide-react";

// const iconMap = {
//   "Dispatch & Timelines": <Clock aria-hidden="true" />,
//   "White-Glove Delivery": <Truck aria-hidden="true" />,
//   "International Shipping": <Globe aria-hidden="true" />,
//   "Shipping Charges": <Package aria-hidden="true" />,
//   "Live Order Tracking": <MapPin aria-hidden="true" />,
//   "Transit Insurance": <ShieldCheck aria-hidden="true" />,
// };

// export default function ShippingPolicy() {
//   const location = useLocation();

//   const [shippingData, setShippingData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const pageTitle = "Shipping & Delivery Policy | Truee";

//   const pageDescription =
//     "Read the Truee shipping policy for information about order dispatch, delivery timelines, shipping charges, tracking and transit insurance.";

//   const pagePath =
//     location.pathname.replace(/\/+$/, "") || "/";

//   const canonicalUrl = `https://truee.in${pagePath}`;

//   const seoTags = (
//     <>
//       <title>{pageTitle}</title>

//       <meta
//         name="description"
//         content={pageDescription}
//       />

//       <link
//         rel="canonical"
//         href={canonicalUrl}
//       />

//       <meta
//         property="og:type"
//         content="website"
//       />

//       <meta
//         property="og:site_name"
//         content="Truee"
//       />

//       <meta
//         property="og:title"
//         content={pageTitle}
//       />

//       <meta
//         property="og:description"
//         content={pageDescription}
//       />

//       <meta
//         property="og:url"
//         content={canonicalUrl}
//       />

//       <meta
//         name="twitter:card"
//         content="summary"
//       />

//       <meta
//         name="twitter:title"
//         content={pageTitle}
//       />

//       <meta
//         name="twitter:description"
//         content={pageDescription}
//       />
//     </>
//   );

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     let cancelled = false;

//     const fetchShippingData = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:8080/api/v1/legal/get-policy/shipping"
//         );

//         if (!cancelled && data?.success) {
//           setShippingData(data.data);
//         }
//       } catch (error) {
//         if (!cancelled) {
//           console.log("Using default shipping policy data.");
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchShippingData();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const fadeUp = {
//     hidden: {
//       opacity: 0,
//       y: 60,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 1.2,
//         ease: [0.16, 1, 0.3, 1],
//       },
//     },
//   };

//   const stagger = {
//     hidden: {
//       opacity: 0,
//     },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const defaultSections = [
//     {
//       title: "Dispatch & Timelines",
//       text: "All orders are meticulously inspected, beautifully packed, and dispatched within 24 to 48 hours of order confirmation. Bespoke or limited-edition items may require additional preparation time.",
//     },
//     {
//       title: "White-Glove Delivery",
//       text: "We utilize premium logistics partners (such as BlueDart, DHL, and FedEx) for all domestic shipments. Standard delivery within India typically takes 3 to 5 business days.",
//     },
//     {
//       title: "International Shipping",
//       text: "Truee Luxury caters to a global audience. International delivery times vary by destination, generally ranging from 7 to 14 business days. Customs and import duties are the responsibility of the recipient.",
//     },
//     {
//       title: "Shipping Charges",
//       text: "We offer complimentary insured shipping on all domestic orders above ₹10,000. For international orders or expedited delivery requests, shipping fees are dynamically calculated at checkout.",
//     },
//     {
//       title: "Live Order Tracking",
//       text: "Once your order leaves our boutique, you will receive an exclusive tracking link via email and SMS. Our concierge team constantly monitors your package until it reaches your hands.",
//     },
//     {
//       title: "Transit Insurance",
//       text: "Every Truee Luxury shipment is fully insured against theft and accidental damage during transit. This coverage ends the moment the package is signed for at the delivery address.",
//     },
//   ];

//   const sectionsToShow =
//     shippingData?.sections?.length > 0
//       ? shippingData.sections
//       : defaultSections;

//   if (loading) {
//     return (
//       <>
//         {seoTags}

//         <div
//           role="status"
//           className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse"
//         >
//           Preparing Global Logistics...
//         </div>
//       </>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
//       {seoTags}

//       {/* Hero */}
//       <section
//         aria-labelledby="shipping-policy-heading"
//         className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black"
//       >
//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[20%]"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=2000')",
//           }}
//         />

//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/40 to-black/80"
//         />

//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={stagger}
//           className="relative z-10 text-center px-6 mt-16"
//         >
//           <motion.p
//             variants={fadeUp}
//             className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
//           >
//             Global Logistics
//           </motion.p>

//           <motion.h1
//             id="shipping-policy-heading"
//             variants={fadeUp}
//             className="text-4xl md:text-6xl font-serif text-white drop-shadow-xl mb-6"
//           >
//             {shippingData?.heroTitle || "Shipping Policy."}
//           </motion.h1>

//           <motion.div
//             aria-hidden="true"
//             variants={fadeUp}
//             className="w-16 h-[2px] bg-[#C8A253] mx-auto"
//           />
//         </motion.div>
//       </section>

//       <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={fadeUp}
//           className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white text-center mb-16"
//         >
//           <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
//             {shippingData?.subtitle ||
//               "At Truee Luxury, the journey of your masterpiece is as important as the product itself. We partner with the world’s most elite courier services to ensure your audio equipment arrives securely and promptly."}
//           </p>
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={stagger}
//           className="space-y-8"
//         >
//           {sectionsToShow.map((item, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               className="group relative bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(200,162,83,0.1)] border border-gray-100 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 items-start cursor-default"
//             >
//               <div
//                 aria-hidden="true"
//                 className="absolute left-2 top-4 bottom-4 w-1.5 rounded-full bg-gray-100 group-hover:bg-[#C8A253] transition-colors duration-500"
//               />

//               <div className="md:w-1/3 flex items-center gap-4 text-[#C8A253] pl-4">
//                 <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#C8A253] group-hover:text-white transition-colors duration-500">
//                   {iconMap[item.title] || (
//                     <Package aria-hidden="true" />
//                   )}
//                 </div>

//                 <h2 className="text-xl font-serif text-black">
//                   {item.title}
//                 </h2>
//               </div>

//               <div className="md:w-2/3 text-gray-500 leading-relaxed text-sm relative">
//                 {item.text}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Truck,
  Clock,
  ShieldCheck,
  Globe,
  MapPin,
  Package,
} from "lucide-react";
import ManagedPageSeo from "../components/ManagedPageSeo";

const iconMap = {
  "Dispatch & Timelines": <Clock aria-hidden="true" />,
  "White-Glove Delivery": <Truck aria-hidden="true" />,
  "International Shipping": <Globe aria-hidden="true" />,
  "Shipping Charges": <Package aria-hidden="true" />,
  "Live Order Tracking": <MapPin aria-hidden="true" />,
  "Transit Insurance": <ShieldCheck aria-hidden="true" />,
};

export default function ShippingPolicy() {
  const location = useLocation();

  const [shippingData, setShippingData] = useState(null);
  const [loading, setLoading] = useState(true);

  const pageTitle = "Shipping & Delivery Policy | Truee";

  const pageDescription =
    "Read the Truee shipping policy for information about order dispatch, delivery timelines, shipping charges, tracking and transit insurance.";

  const pagePath = location.pathname.replace(/\/+$/, "") || "/";
  const canonicalUrl = `https://truee.in${pagePath}`;

  const seoTags = (
    <ManagedPageSeo
      pageKey="shipping-policy"
      defaultTitle={pageTitle}
      defaultDescription={pageDescription}
      defaultCanonical={canonicalUrl}
    />
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    let cancelled = false;

    const fetchShippingData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/legal/get-policy/shipping"
        );

        if (!cancelled && data?.success) {
          setShippingData(data.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.log("Using default shipping policy data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchShippingData();

    return () => {
      cancelled = true;
    };
  }, []);

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const stagger = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const defaultSections = [
    {
      title: "Dispatch & Timelines",
      text: "All orders are meticulously inspected, beautifully packed, and dispatched within 24 to 48 hours of order confirmation. Bespoke or limited-edition items may require additional preparation time.",
    },
    {
      title: "White-Glove Delivery",
      text: "We utilize premium logistics partners (such as BlueDart, DHL, and FedEx) for all domestic shipments. Standard delivery within India typically takes 3 to 5 business days.",
    },
    {
      title: "International Shipping",
      text: "Truee Luxury caters to a global audience. International delivery times vary by destination, generally ranging from 7 to 14 business days. Customs and import duties are the responsibility of the recipient.",
    },
    {
      title: "Shipping Charges",
      text: "We offer complimentary insured shipping on all domestic orders above ₹10,000. For international orders or expedited delivery requests, shipping fees are dynamically calculated at checkout.",
    },
    {
      title: "Live Order Tracking",
      text: "Once your order leaves our boutique, you will receive an exclusive tracking link via email and SMS. Our concierge team constantly monitors your package until it reaches your hands.",
    },
    {
      title: "Transit Insurance",
      text: "Every Truee Luxury shipment is fully insured against theft and accidental damage during transit. This coverage ends the moment the package is signed for at the delivery address.",
    },
  ];

  const sectionsToShow =
    shippingData?.sections?.length > 0
      ? shippingData.sections
      : defaultSections;

  if (loading) {
    return (
      <>
        {seoTags}

        <div
          role="status"
          className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse"
        >
          Preparing Global Logistics...
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
      {seoTags}

      {/* Hero */}
      <section
        aria-labelledby="shipping-policy-heading"
        className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[20%]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=2000')",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/40 to-black/80"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center px-6 mt-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
          >
            Global Logistics
          </motion.p>

          <motion.h1
            id="shipping-policy-heading"
            variants={fadeUp}
            className="text-4xl md:text-6xl font-serif text-white drop-shadow-xl mb-6"
          >
            {shippingData?.heroTitle || "Shipping Policy."}
          </motion.h1>

          <motion.div
            aria-hidden="true"
            variants={fadeUp}
            className="w-16 h-[2px] bg-[#C8A253] mx-auto"
          />
        </motion.div>
      </section>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white text-center mb-16"
        >
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            {shippingData?.subtitle ||
              "At Truee Luxury, the journey of your masterpiece is as important as the product itself. We partner with the world’s most elite courier services to ensure your audio equipment arrives securely and promptly."}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-8"
        >
          {sectionsToShow.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group relative bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(200,162,83,0.1)] border border-gray-100 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 items-start cursor-default"
            >
              <div
                aria-hidden="true"
                className="absolute left-2 top-4 bottom-4 w-1.5 rounded-full bg-gray-100 group-hover:bg-[#C8A253] transition-colors duration-500"
              />

              <div className="md:w-1/3 flex items-center gap-4 text-[#C8A253] pl-4">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#C8A253] group-hover:text-white transition-colors duration-500">
                  {iconMap[item.title] || (
                    <Package aria-hidden="true" />
                  )}
                </div>

                <h2 className="text-xl font-serif text-black">
                  {item.title}
                </h2>
              </div>

              <div className="md:w-2/3 text-gray-500 leading-relaxed text-sm relative">
                {item.text}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}