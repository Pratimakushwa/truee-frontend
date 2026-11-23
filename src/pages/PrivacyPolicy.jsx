


// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   Shield,
//   Lock,
//   EyeOff,
//   Database,
//   CheckCircle,
// } from "lucide-react";

// const iconMap = {
//   "Data Collection": <Database aria-hidden="true" />,
//   "Elite Security Protocols": <Shield aria-hidden="true" />,
//   "Confidentiality Guarantee": <Lock aria-hidden="true" />,
//   "Cookies & Tracking": <EyeOff aria-hidden="true" />,
// };

// export default function PrivacyPolicy() {
//   const location = useLocation();

//   const [privacyData, setPrivacyData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const pageTitle = "Privacy Policy | Truee";

//   const pageDescription =
//     "Read the Truee privacy policy for information about personal data, privacy and security when using our website.";

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

//     const fetchPrivacyData = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:8080/api/v1/legal/get-policy/privacy"
//         );

//         if (!cancelled && data?.success) {
//           setPrivacyData(data.data);
//         }
//       } catch (error) {
//         if (!cancelled) {
//           console.log("Using default privacy data.");
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchPrivacyData();

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
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const defaultSections = [
//     {
//       title: "Data Collection",
//       text: "We collect essential information to provide you with a bespoke shopping experience at Truee Luxury.",
//     },
//     {
//       title: "Elite Security Protocols",
//       text: "Your digital safety is paramount. All payment transactions and personal data are encrypted using state-of-the-art technology.",
//     },
//   ];

//   const sectionsToShow =
//     privacyData?.sections?.length > 0
//       ? privacyData.sections
//       : defaultSections;

//   if (loading) {
//     return (
//       <>
//         {seoTags}

//         <div
//           role="status"
//           className="min-h-[60vh] flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse"
//         >
//           Securing Data...
//         </div>
//       </>
//     );
//   }

//   return (
//     <div className="bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
//       {seoTags}

//       {/* Hero */}
//       <section
//         aria-labelledby="privacy-policy-heading"
//         className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-black"
//       >
//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80&w=2000')",
//           }}
//         />

//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.9)_100%)]"
//         />

//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={stagger}
//           className="relative z-10 text-center px-6 mt-16 text-white"
//         >
//           <motion.p
//             variants={fadeUp}
//             className="text-[#C8A253] rounded-2xl text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
//           >
//             Privacy Policy
//           </motion.p>

//           <motion.h1
//             id="privacy-policy-heading"
//             variants={fadeUp}
//             className="text-4xl md:text-6xl font-serif drop-shadow-xl mb-6"
//           >
//             {privacyData?.heroTitle || "Privacy & Security."}
//           </motion.h1>

//           <motion.p
//             variants={fadeUp}
//             className="text-[10px] uppercase tracking-widest text-gray-400 font-bold"
//           >
//             Last Updated:{" "}
//             {privacyData?.lastUpdated || "July 2026"}
//           </motion.p>
//         </motion.div>
//       </section>

//       <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={fadeUp}
//           className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center text-center mb-16"
//         >
//           <p className="text-gray-600 font-serif text-lg italic">
//             {privacyData?.subtitle ||
//               '"Your privacy is our priority. We protect your data with uncompromising standards."'}
//           </p>
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={stagger}
//           className="space-y-6"
//         >
//           {sectionsToShow.map((section, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               className="group relative bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 hover:border-[#C8A253]/50 hover:shadow-[0_15px_40px_-10px_rgba(200,162,83,0.15)] transition-all duration-500 flex items-start justify-between cursor-default"
//             >
//               <div
//                 aria-hidden="true"
//                 className="absolute rounded-full left-2 top-4 bottom-4 w-1.5 bg-gray-100 group-hover:bg-[#C8A253] transition-colors duration-500"
//               />

//               <div className="pl-6">
//                 <div className="flex items-center gap-3 mb-4 text-[#C8A253]">
//                   {iconMap[section.title] || (
//                     <CheckCircle aria-hidden="true" />
//                   )}

//                   <h2 className="text-xl font-serif text-black group-hover:text-[#C8A253] transition-colors">
//                     {section.title}
//                   </h2>
//                 </div>

//                 <p className="text-gray-500 leading-relaxed text-sm md:text-base">
//                   {section.text || section.content}
//                 </p>
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
  Shield,
  Lock,
  EyeOff,
  Database,
  CheckCircle,
} from "lucide-react";
import ManagedPageSeo from "../components/ManagedPageSeo";

const iconMap = {
  "Data Collection": <Database aria-hidden="true" />,
  "Elite Security Protocols": <Shield aria-hidden="true" />,
  "Confidentiality Guarantee": <Lock aria-hidden="true" />,
  "Cookies & Tracking": <EyeOff aria-hidden="true" />,
};

export default function PrivacyPolicy() {
  const location = useLocation();

  const [privacyData, setPrivacyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const pageTitle = "Privacy Policy | Truee";

  const pageDescription =
    "Read the Truee privacy policy for information about personal data, privacy and security when using our website.";

  const pagePath = location.pathname.replace(/\/+$/, "") || "/";
  const canonicalUrl = `https://truee.in${pagePath}`;

  const seoTags = (
    <ManagedPageSeo
      pageKey="privacy-policy"
      defaultTitle={pageTitle}
      defaultDescription={pageDescription}
      defaultCanonical={canonicalUrl}
    />
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    let cancelled = false;

    const fetchPrivacyData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/legal/get-policy/privacy"
        );

        if (!cancelled && data?.success) {
          setPrivacyData(data.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.log("Using default privacy data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPrivacyData();

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
        staggerChildren: 0.15,
      },
    },
  };

  const defaultSections = [
    {
      title: "Data Collection",
      text: "We collect essential information to provide you with a bespoke shopping experience at Truee Luxury.",
    },
    {
      title: "Elite Security Protocols",
      text: "Your digital safety is paramount. All payment transactions and personal data are encrypted using state-of-the-art technology.",
    },
  ];

  const sectionsToShow =
    privacyData?.sections?.length > 0
      ? privacyData.sections
      : defaultSections;

  if (loading) {
    return (
      <>
        {seoTags}

        <div
          role="status"
          className="min-h-[60vh] flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse"
        >
          Securing Data...
        </div>
      </>
    );
  }

  return (
    <div className="bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
      {seoTags}

      {/* Hero */}
      <section
        aria-labelledby="privacy-policy-heading"
        className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-black"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80&w=2000')",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.9)_100%)]"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center px-6 mt-16 text-white"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#C8A253] rounded-2xl text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
          >
            Privacy Policy
          </motion.p>

          <motion.h1
            id="privacy-policy-heading"
            variants={fadeUp}
            className="text-4xl md:text-6xl font-serif drop-shadow-xl mb-6"
          >
            {privacyData?.heroTitle || "Privacy & Security."}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[10px] uppercase tracking-widest text-gray-400 font-bold"
          >
            Last Updated:{" "}
            {privacyData?.lastUpdated || "July 2026"}
          </motion.p>
        </motion.div>
      </section>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center text-center mb-16"
        >
          <p className="text-gray-600 font-serif text-lg italic">
            {privacyData?.subtitle ||
              '"Your privacy is our priority. We protect your data with uncompromising standards."'}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-6"
        >
          {sectionsToShow.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group relative bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 hover:border-[#C8A253]/50 hover:shadow-[0_15px_40px_-10px_rgba(200,162,83,0.15)] transition-all duration-500 flex items-start justify-between cursor-default"
            >
              <div
                aria-hidden="true"
                className="absolute rounded-full left-2 top-4 bottom-4 w-1.5 bg-gray-100 group-hover:bg-[#C8A253] transition-colors duration-500"
              />

              <div className="pl-6">
                <div className="flex items-center gap-3 mb-4 text-[#C8A253]">
                  {iconMap[section.title] || (
                    <CheckCircle aria-hidden="true" />
                  )}

                  <h2 className="text-xl font-serif text-black group-hover:text-[#C8A253] transition-colors">
                    {section.title}
                  </h2>
                </div>

                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {section.text || section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}