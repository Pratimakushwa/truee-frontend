

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   Mail,
//   MapPin,
//   Phone,
//   Clock,
//   Send,
//   Headphones,
// } from "lucide-react";

// const iconMap = {
//   "Email Us": <Mail size={20} aria-hidden="true" />,
//   "Call Support": <Phone size={20} aria-hidden="true" />,
//   Boutique: <MapPin size={20} aria-hidden="true" />,
//   "Working Hours": <Clock size={20} aria-hidden="true" />,
// };

// export default function ContactUs() {
//   const location = useLocation();

//   const [contactData, setContactData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const pageTitle = "Contact Truee | Product & Order Support";

//   const pageDescription =
//     "Contact Truee for help with audio and lifestyle products, order enquiries and shopping support. Find our contact details or send us a message.";

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

//     const fetchContactData = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:8080/api/v1/legal/get-policy/contact"
//         );

//         if (!cancelled && data?.success) {
//           setContactData(data.data);
//         }
//       } catch (error) {
//         if (!cancelled) {
//           console.log("Using default contact data.");
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchContactData();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:8080/api/v1/contact/submit",
//         formData
//       );

//       if (data.success) {
//         alert(data.message);

//         setFormData({
//           name: "",
//           email: "",
//           subject: "",
//           message: "",
//         });
//       } else {
//         alert(
//           data.message ||
//             "Failed to send message. Please try again."
//         );
//       }
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//           "Failed to send message. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const fadeUp = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 1,
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

//   const defaultInfo = [
//     {
//       title: "Email Us",
//       text: "support@truee.in",
//     },
//     {
//       title: "Call Support",
//       text: "+91 98765 43210",
//     },
//     {
//       title: "Boutique",
//       text: "Bhopal, Madhya Pradesh, India",
//     },
//     {
//       title: "Working Hours",
//       text: "Mon - Sat: 10:00 AM - 6:30 PM",
//     },
//   ];

//   const infoToShow =
//     contactData?.sections?.length > 0
//       ? contactData.sections
//       : defaultInfo;

//   if (loading) {
//     return (
//       <>
//         {seoTags}

//         <div
//           role="status"
//           className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse"
//         >
//           Connecting to Concierge...
//         </div>
//       </>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a]">
//       {seoTags}

//       {/* Hero */}
//       <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-black">
//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-cover bg-[center_30%] opacity-40 grayscale"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=2000')",
//           }}
//         />

//         <div
//           aria-hidden="true"
//           className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/50 to-black/80"
//         />

//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={stagger}
//           className="relative z-10 text-center px-6 mt-10"
//         >
//           <motion.p
//             variants={fadeUp}
//             className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
//           >
//             Concierge Service
//           </motion.p>

//           <motion.h1
//             variants={fadeUp}
//             className="text-4xl md:text-6xl font-serif text-white"
//           >
//             {contactData?.heroTitle || "Let's Connect."}
//           </motion.h1>
//         </motion.div>
//       </div>

//       <div className="max-w-[1200px] mx-auto px-6 md:px-12 -mt-20 relative z-20 pb-24">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//           {/* Contact information */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={stagger}
//             className="lg:col-span-5 space-y-6"
//           >
//             <motion.div
//               variants={fadeUp}
//               className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100"
//             >
//               <Headphones
//                 aria-hidden="true"
//                 className="w-10 h-10 text-[#C8A253] mb-6"
//               />

//               <h2 className="text-2xl font-serif mb-8">
//                 White-Glove Support
//               </h2>

//               <div className="space-y-8">
//                 {infoToShow.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex cursor-pointer items-start gap-4 group"
//                   >
//                     <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-300">
//                       {iconMap[item.title] || (
//                         <Mail
//                           size={20}
//                           aria-hidden="true"
//                         />
//                       )}
//                     </div>

//                     <div>
//                       <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
//                         {item.title}
//                       </h3>

//                       <p className="text-black font-medium text-sm">
//                         {item.text}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Contact form */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeUp}
//             className="lg:col-span-7 bg-white p-10 md:p-14 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100"
//           >
//             <h2
//               id="contact-form-heading"
//               className="text-2xl font-serif mb-2"
//             >
//               Send a Message
//             </h2>

//             <p className="text-gray-500 text-sm mb-8">
//               Our audio specialists will get back to you
//               within 24 hours.
//             </p>

//             <form
//               aria-labelledby="contact-form-heading"
//               aria-busy={isSubmitting}
//               className="space-y-6"
//               onSubmit={handleSubmit}
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="contact-name"
//                     className="sr-only"
//                   >
//                     Full Name
//                   </label>

//                   <input
//                     id="contact-name"
//                     required
//                     type="text"
//                     name="name"
//                     autoComplete="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Full Name"
//                     className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="contact-email"
//                     className="sr-only"
//                   >
//                     Email Address
//                   </label>

//                   <input
//                     id="contact-email"
//                     required
//                     type="email"
//                     name="email"
//                     autoComplete="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Email Address"
//                     className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="contact-subject"
//                   className="sr-only"
//                 >
//                   Subject or Order ID
//                 </label>

//                 <input
//                   id="contact-subject"
//                   required
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleInputChange}
//                   placeholder="Subject / Order ID"
//                   className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="contact-message"
//                   className="sr-only"
//                 >
//                   Your Message
//                 </label>

//                 <textarea
//                   id="contact-message"
//                   required
//                   rows={5}
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   placeholder="How can we elevate your experience?"
//                   className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm resize-none"
//                 />
//               </div>

//               <button
//                 disabled={isSubmitting}
//                 type="submit"
//                 className="px-10 py-4 bg-black text-white font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-[#C8A253] transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
//               >
//                 {isSubmitting
//                   ? "Submitting..."
//                   : "Submit Request"}

//                 <Send
//                   size={14}
//                   aria-hidden="true"
//                 />
//               </button>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  Headphones,
} from "lucide-react";
import ManagedPageSeo from "../components/ManagedPageSeo";

const iconMap = {
  "Email Us": <Mail size={20} aria-hidden="true" />,
  "Call Support": <Phone size={20} aria-hidden="true" />,
  Boutique: <MapPin size={20} aria-hidden="true" />,
  "Working Hours": <Clock size={20} aria-hidden="true" />,
};

export default function ContactUs() {
  const location = useLocation();

  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageTitle = "Contact Truee | Product & Order Support";

  const pageDescription =
    "Contact Truee for help with audio and lifestyle products, order enquiries and shopping support. Find our contact details or send us a message.";

  const pagePath = location.pathname.replace(/\/+$/, "") || "/";
  const canonicalUrl = `https://truee.in${pagePath}`;

  const seoTags = (
    <ManagedPageSeo
      pageKey="contact"
      defaultTitle={pageTitle}
      defaultDescription={pageDescription}
      defaultCanonical={canonicalUrl}
    />
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    let cancelled = false;

    const fetchContactData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/legal/get-policy/contact"
        );

        if (!cancelled && data?.success) {
          setContactData(data.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.log("Using default contact data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchContactData();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/contact/submit",
        formData
      );

      if (data.success) {
        alert(data.message);

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(
          data.message ||
            "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
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

  const defaultInfo = [
    {
      title: "Email Us",
      text: "support@truee.in",
    },
    {
      title: "Call Support",
      text: "+91 98765 43210",
    },
    {
      title: "Boutique",
      text: "Bhopal, Madhya Pradesh, India",
    },
    {
      title: "Working Hours",
      text: "Mon - Sat: 10:00 AM - 6:30 PM",
    },
  ];

  const infoToShow =
    contactData?.sections?.length > 0
      ? contactData.sections
      : defaultInfo;

  if (loading) {
    return (
      <>
        {seoTags}

        <div
          role="status"
          className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse"
        >
          Connecting to Concierge...
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a]">
      {seoTags}

      {/* Hero */}
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-black">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-[center_30%] opacity-40 grayscale"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=2000')",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/50 to-black/80"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center px-6 mt-10"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
          >
            Concierge Service
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-serif text-white"
          >
            {contactData?.heroTitle || "Let's Connect."}
          </motion.h1>
        </motion.div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 -mt-20 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-5 space-y-6"
          >
            <motion.div
              variants={fadeUp}
              className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100"
            >
              <Headphones
                aria-hidden="true"
                className="w-10 h-10 text-[#C8A253] mb-6"
              />

              <h2 className="text-2xl font-serif mb-8">
                White-Glove Support
              </h2>

              <div className="space-y-8">
                {infoToShow.map((item, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#C8A253] group-hover:bg-[#C8A253] group-hover:text-white transition-all duration-300">
                      {iconMap[item.title] || (
                        <Mail size={20} aria-hidden="true" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                        {item.title}
                      </h3>

                      <p className="text-black font-medium text-sm">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-7 bg-white p-10 md:p-14 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100"
          >
            <h2
              id="contact-form-heading"
              className="text-2xl font-serif mb-2"
            >
              Send a Message
            </h2>

            <p className="text-gray-500 text-sm mb-8">
              Our audio specialists will get back to you within
              24 hours.
            </p>

            <form
              aria-labelledby="contact-form-heading"
              aria-busy={isSubmitting}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="sr-only"
                  >
                    Full Name
                  </label>

                  <input
                    id="contact-name"
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="sr-only"
                  >
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="sr-only"
                >
                  Subject or Order ID
                </label>

                <input
                  id="contact-subject"
                  required
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject / Order ID"
                  className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="sr-only"
                >
                  Your Message
                </label>

                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we elevate your experience?"
                  className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="px-10 py-4 bg-black text-white font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-[#C8A253] transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Request"}

                <Send size={14} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}