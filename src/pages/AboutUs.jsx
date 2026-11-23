
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   Star,
//   ShieldCheck,
//   Music,
//   Play,
//   Award,
//   Globe,
//   Gem,
//   Truck,
//   HeartHandshake,
// } from "lucide-react";

// export default function AboutUs() {
//   const location = useLocation();

//   const [aboutData, setAboutData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const pageTitle =
//     "About Truee | Our Audio & Lifestyle Story";

//   const pageDescription =
//     "Discover the story behind Truee, our passion for premium audio and lifestyle products, and our approach to product selection and customer service.";

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

//     const fetchAboutData = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:8080/api/v1/legal/get-policy/about"
//         );

//         if (!cancelled && data?.success) {
//           setAboutData(data.data);
//         }
//       } catch (error) {
//         if (!cancelled) {
//           console.log(
//             "Database connection error or data missing, using default luxury content."
//           );
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchAboutData();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const fadeInUp = {
//     hidden: {
//       opacity: 0,
//       y: 150,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 1.5,
//         ease: [0.16, 1, 0.3, 1],
//       },
//     },
//   };

//   const staggerContainer = {
//     hidden: {
//       opacity: 0,
//     },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.4,
//       },
//     },
//   };

//   const slideInLeft = {
//     hidden: {
//       opacity: 0,
//       x: -100,
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 1.2,
//         ease: [0.16, 1, 0.3, 1],
//       },
//     },
//   };

//   const slideInRight = {
//     hidden: {
//       opacity: 0,
//       x: 100,
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 1.2,
//         ease: [0.16, 1, 0.3, 1],
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <>
//         {seoTags}

//         <div
//           role="status"
//           className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse"
//         >
//           Curating the Truee Experience...
//         </div>
//       </>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#1a1a1a] overflow-hidden">
//       {seoTags}

//       {/* Hero */}
//       <div className="relative w-full h-[60vh] md:h-[80vh] bg-black flex flex-col items-center justify-center text-center px-6 overflow-hidden">
//         <motion.div
//           aria-hidden="true"
//           initial={{
//             scale: 1.1,
//             opacity: 0,
//           }}
//           animate={{
//             scale: 1,
//             opacity: 0.5,
//           }}
//           transition={{
//             duration: 1.5,
//             ease: "easeOut",
//           }}
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2000')",
//           }}
//         />

//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
//         />

//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={staggerContainer}
//           className="relative z-10"
//         >
//           <motion.p
//             variants={fadeInUp}
//             className="text-[#C8A253] text-[11px] md:text-[13px] font-bold tracking-[0.4em] uppercase mb-4"
//           >
//             Our Heritage
//           </motion.p>

//           <motion.h1
//             variants={fadeInUp}
//             className="text-5xl md:text-8xl font-serif font-medium text-white mb-6 tracking-tight"
//           >
//             {aboutData?.heroTitle || "The Truee Story."}
//           </motion.h1>

//           <motion.div
//             aria-hidden="true"
//             variants={fadeInUp}
//             className="w-16 h-[2px] bg-[#C8A253] mx-auto"
//           />
//         </motion.div>
//       </div>

//       {/* The philosophy */}
//       <section
//         aria-labelledby="about-philosophy-heading"
//         className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto"
//       >
//         <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{
//               once: true,
//               margin: "-100px",
//             }}
//             variants={slideInLeft}
//             className="w-full lg:w-1/2"
//           >
//             <h2
//               id="about-philosophy-heading"
//               className="text-3xl md:text-5xl font-serif mb-6 text-black leading-tight"
//             >
//               Redefining Sound
//               <br />
//               <span className="text-[#C8A253] italic">
//                 & Luxury
//               </span>
//             </h2>

//             <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
//               {aboutData?.sections?.[0]?.text ||
//                 "At Truee Luxury, we don't just sell products; we deliver experiences. Born from a passion for uncompromised acoustic brilliance and timeless design, our boutique curates the world's most prestigious audio equipment for those who refuse to settle for ordinary."}
//             </p>

//             <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
//               {aboutData?.sections?.[1]?.text ||
//                 "Every speaker, every headphone, and every lifestyle accessory in our collection is a masterpiece of engineering. We bridge the gap between audiophile-grade performance and high-end fashion."}
//             </p>

//             <div className="flex items-center gap-4">
//               <div
//                 aria-hidden="true"
//                 className="w-12 h-[1px] bg-black"
//               />

//               <span className="text-[11px] font-bold uppercase tracking-widest text-black">
//                 Since 2026
//               </span>
//             </div>
//           </motion.div>

//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{
//               once: true,
//               margin: "-100px",
//             }}
//             variants={slideInRight}
//             className="w-full lg:w-1/2 relative"
//           >
//             <div className="aspect-[4/5] md:aspect-square w-full bg-gray-100 rounded-3xl overflow-hidden relative">
//               <img
//                 src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1200"
//                 alt="Over-ear headphones"
//                 loading="lazy"
//                 decoding="async"
//                 className="w-full h-full object-cover"
//               />

//               <div className="absolute -bottom-6 -left-6 bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
//                 <p className="text-4xl font-serif text-[#C8A253] mb-2">
//                   100%
//                 </p>

//                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
//                   Authentic Curations
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Immersive banner */}
//       <section
//         aria-labelledby="about-audiophile-heading"
//         className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black"
//       >
//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-cover bg-[center_top] md:bg-[center_20%] opacity-60 grayscale-[30%]"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=2000')",
//           }}
//         />

//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.3)_60%,rgba(0,0,0,0.8)_100%)]"
//         />

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{
//             once: true,
//             margin: "-50px",
//           }}
//           variants={staggerContainer}
//           className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center text-white"
//         >
//           <motion.div variants={fadeInUp}>
//             <Play
//               aria-hidden="true"
//               className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 md:mb-8 text-[#C8A253] opacity-100 drop-shadow-2xl"
//               strokeWidth={1}
//             />
//           </motion.div>

//           <motion.h2
//             id="about-audiophile-heading"
//             variants={fadeInUp}
//             className="text-2xl md:text-4xl lg:text-5xl font-serif font-light leading-snug mb-6 md:mb-8 drop-shadow-2xl px-4 text-white"
//           >
//             "Music is the universal language of mankind. We
//             ensure you hear it in its absolute purest form."
//           </motion.h2>

//           <motion.p
//             variants={fadeInUp}
//             className="text-[#C8A253] text-[10px] md:text-[12px] font-bold tracking-[0.3em] uppercase drop-shadow-lg"
//           >
//             The Audiophile Promise
//           </motion.p>
//         </motion.div>
//       </section>

//       {/* Why choose Truee */}
//       <section
//         aria-labelledby="about-why-truee-heading"
//         className="py-24 md:py-32 bg-[#fafafa]"
//       >
//         <div className="max-w-[1400px] mx-auto px-6 md:px-12">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             className="text-center mb-20"
//           >
//             <p className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4">
//               Our Mission
//             </p>

//             <h2
//               id="about-why-truee-heading"
//               className="text-3xl md:text-5xl font-serif text-black mb-6"
//             >
//               Why Choose Truee Luxury?
//             </h2>

//             <p className="text-gray-500 text-lg max-w-2xl mx-auto">
//               We don't just sell technology. We provide a
//               gateway to unmatched auditory perfection. Here
//               is why connoisseurs choose us.
//             </p>
//           </motion.div>

//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//             className="grid grid-cols-1 md:grid-cols-3 gap-12"
//           >
//             <motion.div
//               variants={fadeInUp}
//               className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
//             >
//               <Gem
//                 aria-hidden="true"
//                 className="w-12 h-12 text-[#C8A253] mb-6"
//                 strokeWidth={1.5}
//               />

//               <h3 className="text-xl font-serif text-black mb-4">
//                 Unrivaled Exclusivity
//               </h3>

//               <p className="text-gray-500 leading-relaxed">
//                 Our catalog features limited-edition pieces
//                 and top-tier brands that are rarely available
//                 elsewhere. When you buy from Truee, you own a
//                 piece of exclusivity.
//               </p>
//             </motion.div>

//             <motion.div
//               variants={fadeInUp}
//               className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
//             >
//               <ShieldCheck
//                 aria-hidden="true"
//                 className="w-12 h-12 text-[#C8A253] mb-6"
//                 strokeWidth={1.5}
//               />

//               <h3 className="text-xl font-serif text-black mb-4">
//                 100% Authenticity
//               </h3>

//               <p className="text-gray-500 leading-relaxed">
//                 Every item is rigorously verified and comes
//                 with an official brand warranty. We guarantee
//                 absolute authenticity, giving you complete
//                 peace of mind.
//               </p>
//             </motion.div>

//             <motion.div
//               variants={fadeInUp}
//               className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
//             >
//               <HeartHandshake
//                 aria-hidden="true"
//                 className="w-12 h-12 text-[#C8A253] mb-6"
//                 strokeWidth={1.5}
//               />

//               <h3 className="text-xl font-serif text-black mb-4">
//                 White-Glove Service
//               </h3>

//               <p className="text-gray-500 leading-relaxed">
//                 From the moment you browse to post-purchase
//                 support, our luxury concierge team is dedicated
//                 to providing you with a seamless, VIP shopping
//                 experience.
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* The Truee standard */}
//       <section
//         aria-labelledby="about-standard-heading"
//         className="py-24 bg-white"
//       >
//         <h2
//           id="about-standard-heading"
//           className="sr-only"
//         >
//           The Truee Standard
//         </h2>

//         <div className="max-w-[1400px] mx-auto px-6 md:px-12">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{
//               once: true,
//               margin: "-50px",
//             }}
//             variants={staggerContainer}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
//           >
//             <motion.div
//               variants={fadeInUp}
//               className="flex flex-col items-center group"
//             >
//               <div className="w-20 h-20 rounded-full bg-gray-50 shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
//                 <Music
//                   aria-hidden="true"
//                   size={32}
//                   strokeWidth={1.5}
//                 />
//               </div>

//               <h3 className="text-[15px] font-bold uppercase tracking-widest mb-4">
//                 Pure Fidelity
//               </h3>

//               <p className="text-gray-500 text-sm leading-relaxed px-4">
//                 Experience sound exactly as the artist
//                 intended, with perfect studio-grade clarity.
//               </p>
//             </motion.div>

//             <motion.div
//               variants={fadeInUp}
//               className="flex flex-col items-center group"
//             >
//               <div className="w-20 h-20 rounded-full bg-gray-50 shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
//                 <Star
//                   aria-hidden="true"
//                   size={32}
//                   strokeWidth={1.5}
//                 />
//               </div>

//               <h3 className="text-[15px] font-bold uppercase tracking-widest mb-4">
//                 Premium Build
//               </h3>

//               <p className="text-gray-500 text-sm leading-relaxed px-4">
//                 Crafted using aerospace-grade aluminum and
//                 signature luxury finishes.
//               </p>
//             </motion.div>

//             <motion.div
//               variants={fadeInUp}
//               className="flex flex-col items-center group"
//             >
//               <div className="w-20 h-20 rounded-full bg-gray-50 shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
//                 <Globe
//                   aria-hidden="true"
//                   size={32}
//                   strokeWidth={1.5}
//                 />
//               </div>

//               <h3 className="text-[15px] font-bold uppercase tracking-widest mb-4">
//                 Global Reach
//               </h3>

//               <p className="text-gray-500 text-sm leading-relaxed px-4">
//                 We handpick only the top 1% of audio tech
//                 globally to ensure you get the absolute best.
//               </p>
//             </motion.div>

//             <motion.div
//               variants={fadeInUp}
//               className="flex flex-col items-center group"
//             >
//               <div className="w-20 h-20 rounded-full bg-gray-50 shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
//                 <Truck
//                   aria-hidden="true"
//                   size={32}
//                   strokeWidth={1.5}
//                 />
//               </div>

//               <h3 className="text-[15px] font-bold uppercase tracking-widest mb-4">
//                 Secure Transit
//               </h3>

//               <p className="text-gray-500 text-sm leading-relaxed px-4">
//                 Insured, premium packaging ensuring your
//                 masterpiece arrives in pristine condition.
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Closing note */}
//       <section
//         aria-labelledby="about-quality-heading"
//         className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden"
//       >
//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-cover bg-center opacity-60"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1459489240801-b55d28b12e12?auto=format&fit=crop&q=80&w=2000')",
//           }}
//         />

//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-black/70"
//         />

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="relative z-10 px-6 max-w-[900px] mx-auto text-center"
//         >
//           <motion.div variants={fadeInUp}>
//             <Award
//               aria-hidden="true"
//               className="w-14 h-14 mx-auto text-[#C8A253] mb-8"
//               strokeWidth={1}
//             />
//           </motion.div>

//           <motion.h2
//             id="about-quality-heading"
//             variants={fadeInUp}
//             className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight"
//           >
//             "Luxury is attention to detail, originality, and
//             above all,{" "}
//             <span className="italic text-[#C8A253]">
//               quality.
//             </span>
//             "
//           </motion.h2>

//           <motion.div
//             aria-hidden="true"
//             variants={fadeInUp}
//             className="w-16 h-[2px] bg-[#C8A253] mx-auto mb-8"
//           />

//           <motion.div
//             variants={fadeInUp}
//             className="text-gray-300 font-light text-lg md:text-xl mb-10 max-w-2xl mx-auto"
//           >
//             Join the elite club of audiophiles and tastemakers.
//             Experience a world where every note is perfection
//             and every design is timeless.
//           </motion.div>

//           <motion.p
//             variants={fadeInUp}
//             className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#C8A253]"
//           >
//             Proudly Founded in Bhopal, India
//           </motion.p>
//         </motion.div>
//       </section>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Star,
  ShieldCheck,
  Music,
  Play,
  Award,
  Globe,
  Gem,
  Truck,
  HeartHandshake,
} from "lucide-react";

import ManagedPageSeo from "../components/ManagedPageSeo";

export default function AboutUs() {
  const location = useLocation();

  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  const pageTitle =
    "About Truee | Our Audio & Lifestyle Story";

  const pageDescription =
    "Discover the story behind Truee, our passion for premium audio and lifestyle products, and our approach to product selection and customer service.";

  const pagePath =
    location.pathname.replace(/\/+$/, "") || "/";

  const canonicalUrl = `https://truee.in${pagePath}`;

  const seoTags = (
    <ManagedPageSeo
      pageKey="about"
      defaultTitle={pageTitle}
      defaultDescription={pageDescription}
      defaultCanonical={canonicalUrl}
    />
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    let cancelled = false;

    const fetchAboutData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/legal/get-policy/about"
        );

        if (!cancelled && data?.success) {
          setAboutData(data.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.log(
            "Database connection error or data missing, using default luxury content."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAboutData();

    return () => {
      cancelled = true;
    };
  }, []);

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 150,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  if (loading) {
    return (
      <>
        {seoTags}

        <div
          role="status"
          className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse"
        >
          Curating the Truee Experience...
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a] overflow-hidden">
      {seoTags}

      {/* Hero */}
      <div className="relative w-full h-[60vh] md:h-[80vh] bg-black flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div
          aria-hidden="true"
          initial={{
            scale: 1.1,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 0.5,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2000')",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10"
        >
          <motion.p
            variants={fadeInUp}
            className="text-[#C8A253] text-[11px] md:text-[13px] font-bold tracking-[0.4em] uppercase mb-4"
          >
            Our Heritage
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-8xl font-serif font-medium text-white mb-6 tracking-tight"
          >
            {aboutData?.heroTitle || "The Truee Story."}
          </motion.h1>

          <motion.div
            aria-hidden="true"
            variants={fadeInUp}
            className="w-16 h-[2px] bg-[#C8A253] mx-auto"
          />
        </motion.div>
      </div>

      {/* The philosophy */}
      <section
        aria-labelledby="about-philosophy-heading"
        className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-100px",
            }}
            variants={slideInLeft}
            className="w-full lg:w-1/2"
          >
            <h2
              id="about-philosophy-heading"
              className="text-3xl md:text-5xl font-serif mb-6 text-black leading-tight"
            >
              Redefining Sound
              <br />
              <span className="text-[#C8A253] italic">
                &amp; Luxury
              </span>
            </h2>

            <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
              {aboutData?.sections?.[0]?.text ||
                "At Truee Luxury, we don't just sell products; we deliver experiences. Born from a passion for uncompromised acoustic brilliance and timeless design, our boutique curates the world's most prestigious audio equipment for those who refuse to settle for ordinary."}
            </p>

            <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
              {aboutData?.sections?.[1]?.text ||
                "Every speaker, every headphone, and every lifestyle accessory in our collection is a masterpiece of engineering. We bridge the gap between audiophile-grade performance and high-end fashion."}
            </p>

            <div className="flex items-center gap-4">
              <div
                aria-hidden="true"
                className="w-12 h-[1px] bg-black"
              />

              <span className="text-[11px] font-bold uppercase tracking-widest text-black">
                Since 2026
              </span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-100px",
            }}
            variants={slideInRight}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] md:aspect-square w-full bg-gray-100 rounded-3xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1200"
                alt="Over-ear headphones"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />

              <div className="absolute -bottom-6 -left-6 bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
                <p className="text-4xl font-serif text-[#C8A253] mb-2">
                  100%
                </p>

                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Authentic Curations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Immersive banner */}
      <section
        aria-labelledby="about-audiophile-heading"
        className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-[center_top] md:bg-[center_20%] opacity-60 grayscale-[30%]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=2000')",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.3)_60%,rgba(0,0,0,0.8)_100%)]"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-50px",
          }}
          variants={staggerContainer}
          className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center text-white"
        >
          <motion.div variants={fadeInUp}>
            <Play
              aria-hidden="true"
              className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 md:mb-8 text-[#C8A253] opacity-100 drop-shadow-2xl"
              strokeWidth={1}
            />
          </motion.div>

          <motion.h2
            id="about-audiophile-heading"
            variants={fadeInUp}
            className="text-2xl md:text-4xl lg:text-5xl font-serif font-light leading-snug mb-6 md:mb-8 drop-shadow-2xl px-4 text-white"
          >
            "Music is the universal language of mankind. We
            ensure you hear it in its absolute purest form."
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-[#C8A253] text-[10px] md:text-[12px] font-bold tracking-[0.3em] uppercase drop-shadow-lg"
          >
            The Audiophile Promise
          </motion.p>
        </motion.div>
      </section>

      {/* Why choose Truee */}
      <section
        aria-labelledby="about-why-truee-heading"
        className="py-24 md:py-32 bg-[#fafafa]"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <p className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4">
              Our Mission
            </p>

            <h2
              id="about-why-truee-heading"
              className="text-3xl md:text-5xl font-serif text-black mb-6"
            >
              Why Choose Truee Luxury?
            </h2>

            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We don't just sell technology. We provide a
              gateway to unmatched auditory perfection. Here
              is why connoisseurs choose us.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <Gem
                aria-hidden="true"
                className="w-12 h-12 text-[#C8A253] mb-6"
                strokeWidth={1.5}
              />

              <h3 className="text-xl font-serif text-black mb-4">
                Unrivaled Exclusivity
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Our catalog features limited-edition pieces
                and top-tier brands that are rarely available
                elsewhere. When you buy from Truee, you own a
                piece of exclusivity.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <ShieldCheck
                aria-hidden="true"
                className="w-12 h-12 text-[#C8A253] mb-6"
                strokeWidth={1.5}
              />

              <h3 className="text-xl font-serif text-black mb-4">
                100% Authenticity
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Every item is rigorously verified and comes
                with an official brand warranty. We guarantee
                absolute authenticity, giving you complete
                peace of mind.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <HeartHandshake
                aria-hidden="true"
                className="w-12 h-12 text-[#C8A253] mb-6"
                strokeWidth={1.5}
              />

              <h3 className="text-xl font-serif text-black mb-4">
                White-Glove Service
              </h3>

              <p className="text-gray-500 leading-relaxed">
                From the moment you browse to post-purchase
                support, our luxury concierge team is dedicated
                to providing you with a seamless, VIP shopping
                experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Truee standard */}
      <section
        aria-labelledby="about-standard-heading"
        className="py-24 bg-white"
      >
        <h2
          id="about-standard-heading"
          className="sr-only"
        >
          The Truee Standard
        </h2>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-50px",
            }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center group"
            >
              <div className="w-20 h-20 rounded-full bg-gray-50 shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                <Music
                  aria-hidden="true"
                  size={32}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-[15px] font-bold uppercase tracking-widest mb-4">
                Pure Fidelity
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed px-4">
                Experience sound exactly as the artist
                intended, with perfect studio-grade clarity.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center group"
            >
              <div className="w-20 h-20 rounded-full bg-gray-50 shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                <Star
                  aria-hidden="true"
                  size={32}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-[15px] font-bold uppercase tracking-widest mb-4">
                Premium Build
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed px-4">
                Crafted using aerospace-grade aluminum and
                signature luxury finishes.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center group"
            >
              <div className="w-20 h-20 rounded-full bg-gray-50 shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                <Globe
                  aria-hidden="true"
                  size={32}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-[15px] font-bold uppercase tracking-widest mb-4">
                Global Reach
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed px-4">
                We handpick only the top 1% of audio tech
                globally to ensure you get the absolute best.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center group"
            >
              <div className="w-20 h-20 rounded-full bg-gray-50 shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                <Truck
                  aria-hidden="true"
                  size={32}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-[15px] font-bold uppercase tracking-widest mb-4">
                Secure Transit
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed px-4">
                Insured, premium packaging ensuring your
                masterpiece arrives in pristine condition.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Closing note */}
      <section
        aria-labelledby="about-quality-heading"
        className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1459489240801-b55d28b12e12?auto=format&fit=crop&q=80&w=2000')",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/70"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 px-6 max-w-[900px] mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <Award
              aria-hidden="true"
              className="w-14 h-14 mx-auto text-[#C8A253] mb-8"
              strokeWidth={1}
            />
          </motion.div>

          <motion.h2
            id="about-quality-heading"
            variants={fadeInUp}
            className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight"
          >
            "Luxury is attention to detail, originality, and
            above all,{" "}
            <span className="italic text-[#C8A253]">
              quality.
            </span>
            "
          </motion.h2>

          <motion.div
            aria-hidden="true"
            variants={fadeInUp}
            className="w-16 h-[2px] bg-[#C8A253] mx-auto mb-8"
          />

          <motion.div
            variants={fadeInUp}
            className="text-gray-300 font-light text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Join the elite club of audiophiles and tastemakers.
            Experience a world where every note is perfection
            and every design is timeless.
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#C8A253]"
          >
            Proudly Founded in Bhopal, India
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}