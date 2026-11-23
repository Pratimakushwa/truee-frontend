
// import {
//   useEffect,
//   useId,
//   useRef,
//   useState,
// } from "react";

// import {
//   Search,
//   Save,
//   Send,
//   Loader2,
//   AlertCircle,
//   CheckCircle2,
//   Image as ImageIcon,
//   FileText,
// } from "lucide-react";

// import api from "../../utils/axiosInstance";
// import { mergeHomeContent } from "../../utils/homeContentDefaults";

// const PAGES = [
//   { key: "home", label: "Home", path: "/" },
//   { key: "shop", label: "Shop", path: "/shop" },
//   { key: "products", label: "Products", path: "/products" },
//   { key: "brands", label: "Brands", path: "/brands" },
//   { key: "about", label: "About Us", path: "/about" },
//   { key: "contact", label: "Contact Us", path: "/contact" },
//   {
//     key: "privacy-policy",
//     label: "Privacy Policy",
//     path: "/privacy-policy",
//   },
//   { key: "terms", label: "Terms", path: "/terms" },
//   {
//     key: "refund-policy",
//     label: "Refund Policy",
//     path: "/refund-policy",
//   },
//   {
//     key: "shipping-policy",
//     label: "Shipping Policy",
//     path: "/ShippingPolicy",
//   },
//   { key: "blog", label: "Blog Entry Page", path: "/blog" },
// ];

// function prepareForm(page, saved) {
//   if (page.key === "home") {
//     return mergeHomeContent(saved);
//   }

//   return {
//     seo: {
//       title: "",
//       description: "",
//       canonicalUrl: `https://truee.in${page.path}`,
//       noIndex: false,
//       socialTitle: "",
//       socialDescription: "",
//       socialImage: "",
//       socialImageAlt: "",
//       ...(saved?.seo || {}),
//     },

//     // Preserve any existing content without exposing Home controls.
//     content: saved?.content || {},
//   };
// }

// function Field({
//   label,
//   value,
//   onChange,
//   multiline = false,
//   maxLength,
//   hint,
// }) {
//   const id = useId();

//   const props = {
//     id,
//     value: value ?? "",
//     onChange: (event) => onChange(event.target.value),
//     maxLength,
//     className:
//       "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C8A253] focus:ring-4 focus:ring-[#C8A253]/10",
//   };

//   return (
//     <div className="min-w-0">
//       <label
//         htmlFor={id}
//         className="mb-2 block text-sm font-medium text-slate-700"
//       >
//         {label}
//       </label>

//       {multiline ? (
//         <textarea {...props} rows={4} />
//       ) : (
//         <input {...props} type="text" />
//       )}

//       {(hint || maxLength) && (
//         <div className="mt-2 flex justify-between gap-4 text-xs text-slate-400">
//           <span>{hint}</span>
//           {maxLength && (
//             <span className="shrink-0">
//               {(value || "").length}/{maxLength}
//             </span>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// function Panel({ title, description, children }) {
//   return (
//     <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//       <h2 className="text-lg font-semibold text-slate-900">
//         {title}
//       </h2>

//       {description && (
//         <p className="mt-1 text-sm leading-6 text-slate-500">
//           {description}
//         </p>
//       )}

//       <div className="mt-6 space-y-5">{children}</div>
//     </section>
//   );
// }

// function safeImage(value) {
//   if (typeof value !== "string") return "";

//   const url = value.trim();

//   if (
//     url.startsWith("/") &&
//     !url.startsWith("//") &&
//     !/[\\\s]/.test(url)
//   ) {
//     return url;
//   }

//   try {
//     const parsed = new URL(url);

//     return parsed.protocol === "https:" &&
//       !parsed.username &&
//       !parsed.password
//       ? url
//       : "";
//   } catch {
//     return "";
//   }
// }

// function ImagePreview({ value, alt }) {
//   const [failed, setFailed] = useState(false);
//   const url = safeImage(value);

//   if (!url || failed) {
//     return (
//       <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
//         <ImageIcon size={20} className="mr-2" />
//         {failed ? "Image load nahi hui" : "Image preview"}
//       </div>
//     );
//   }

//   return (
//     <img
//       src={url}
//       alt={alt || "Image preview"}
//       onError={() => setFailed(true)}
//       className="h-44 w-full rounded-xl border border-slate-200 bg-slate-50 object-contain"
//     />
//   );
// }

// // Each page gets its own editor state.
// // Switching pages cannot carry the previous page's revision/form.
// function PageEditor({ page, onPageChange }) {
//   const [form, setForm] = useState(() =>
//     prepareForm(page, null)
//   );

//   const [revision, setRevision] = useState(0);
//   const [publishedAt, setPublishedAt] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [loaded, setLoaded] = useState(false);
//   const [saving, setSaving] = useState("");
//   const [error, setError] = useState("");
//   const [conflict, setConflict] = useState(false);
//   const [notice, setNotice] = useState("");
//   const [dirty, setDirty] = useState(false);
//   const [reload, setReload] = useState(0);

//   const savingRef = useRef(false);

//   useEffect(() => {
//     let cancelled = false;

//     async function load() {
//       setLoading(true);
//       setLoaded(false);
//       setError("");
//       setNotice("");
//       setConflict(false);

//       try {
//         const { data } = await api.get(
//           `/page-content/manage/${page.key}`
//         );

//         if (
//           !data?.success ||
//           data.data?.pageKey !== page.key ||
//           !Number.isInteger(data.data.revision)
//         ) {
//           throw new Error("Editor data ka response sahi nahi mila.");
//         }

//         if (!cancelled) {
//           setForm(
//             prepareForm(
//               page,
//               data.data.draft || data.data.published
//             )
//           );
//           setRevision(data.data.revision);
//           setPublishedAt(data.data.publishedAt);
//           setDirty(false);
//           setLoaded(true);
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setError(
//             err.response?.data?.error ||
//               err.response?.data?.message ||
//               err.message ||
//               "Editor load nahi hua."
//           );
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     load();

//     return () => {
//       cancelled = true;
//     };
//   }, [page.key, reload]);

//   useEffect(() => {
//     if (!dirty) return;

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = "";
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener(
//         "beforeunload",
//         handleBeforeUnload
//       );
//     };
//   }, [dirty]);

//   const update = (section, key, value) => {
//     setForm((previous) => ({
//       ...previous,
//       [section]: {
//         ...previous[section],
//         [key]: value,
//       },
//     }));

//     setDirty(true);
//     setNotice("");
//   };

//   const updateSlide = (id, key, value) => {
//     setForm((previous) => ({
//       ...previous,
//       content: {
//         ...previous.content,
//         heroSlides: previous.content.heroSlides.map((slide) =>
//           slide.id === id ? { ...slide, [key]: value } : slide
//         ),
//       },
//     }));

//     setDirty(true);
//     setNotice("");
//   };

//   const changePage = (nextKey) => {
//     if (nextKey === page.key || savingRef.current) return;

//     if (
//       dirty &&
//       !window.confirm(
//         "Page badalne par unsaved changes hat jayenge. Continue?"
//       )
//     ) {
//       return;
//     }

//     onPageChange(nextKey);
//   };

//   const reloadSaved = () => {
//     if (
//       dirty &&
//       !window.confirm(
//         "Reload karne par unsaved changes hat jayenge. Continue?"
//       )
//     ) {
//       return;
//     }

//     setReload((value) => value + 1);
//   };

//   const save = async (action) => {
//     if (
//       savingRef.current ||
//       !loaded ||
//       loading ||
//       conflict
//     ) {
//       return;
//     }

//     savingRef.current = true;
//     setSaving(action);
//     setError("");
//     setNotice("");

//     try {
//       const { data } = await api.put(
//         `/page-content/manage/${page.key}/${action}`,
//         {
//           seo: form.seo,
//           content: form.content,
//           revision,
//         }
//       );

//       if (
//         !data?.success ||
//         data.data?.pageKey !== page.key ||
//         !Number.isInteger(data.data.revision)
//       ) {
//         throw new Error("Changes save confirm nahi hue.");
//       }

//       setForm(prepareForm(page, data.data.draft));
//       setRevision(data.data.revision);
//       setPublishedAt(data.data.publishedAt);
//       setDirty(false);

//       setNotice(
//         action === "publish"
//           ? `${page.label} ka published version save ho gaya.`
//           : `${page.label} ka draft save ho gaya. Published version nahi badla.`
//       );
//     } catch (err) {
//       if (err.response?.status === 409) {
//         setConflict(true);
//       }

//       setError(
//         err.response?.data?.error ||
//           err.response?.data?.message ||
//           err.message ||
//           "Save failed."
//       );
//     } finally {
//       savingRef.current = false;
//       setSaving("");
//     }
//   };

//   const cannotSave =
//     loading || !loaded || Boolean(saving) || conflict;

//   return (
//     <div className="space-y-6 text-slate-900">
//       <title>SEO & Content | Truee Super Admin</title>
//       <meta name="robots" content="noindex,nofollow" />

//       <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67D2D]">
//             Website management
//           </p>
//           <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
//             SEO & Content
//           </h1>
//           <p className="mt-2 text-sm text-slate-500">
//             {page.label} ·{" "}
//             {loading
//               ? "Loading..."
//               : !loaded
//                 ? "Not loaded"
//                 : dirty
//                   ? "Unsaved changes"
//                   : "No unsaved changes"}
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <button
//             type="button"
//             onClick={() => save("draft")}
//             disabled={cannotSave}
//             className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold disabled:opacity-50"
//           >
//             {saving === "draft" ? (
//               <Loader2 size={16} className="animate-spin" />
//             ) : (
//               <Save size={16} />
//             )}
//             Save Draft
//           </button>

//           <button
//             type="button"
//             onClick={() => save("publish")}
//             disabled={cannotSave}
//             className="inline-flex items-center gap-2 rounded-xl bg-[#C8A253] px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50"
//           >
//             {saving === "publish" ? (
//               <Loader2 size={16} className="animate-spin" />
//             ) : (
//               <Send size={16} />
//             )}
//             Publish
//           </button>
//         </div>
//       </header>

//       <div className="rounded-2xl border border-slate-200 bg-white p-5">
//         <label
//           htmlFor="seo-page-selector"
//           className="mb-2 block text-sm font-semibold"
//         >
//           Kaunsa page edit karna hai?
//         </label>

//         <select
//           id="seo-page-selector"
//           value={page.key}
//           onChange={(event) => changePage(event.target.value)}
//           disabled={Boolean(saving)}
//           className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#C8A253] sm:max-w-md"
//         >
//           {PAGES.map((item) => (
//             <option key={item.key} value={item.key}>
//               {item.label} — {item.path}
//             </option>
//           ))}
//         </select>

//         <p className="mt-3 text-xs leading-5 text-slate-500">
//           Har page ka draft aur published version alag save hota hai.
//         </p>
//       </div>

//       {error && (
//         <div
//           role="alert"
//           className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
//         >
//           <p className="flex items-start gap-2">
//             <AlertCircle size={18} className="shrink-0" />
//             {error}
//           </p>
//           <button
//             type="button"
//             onClick={reloadSaved}
//             disabled={Boolean(saving)}
//             className="mt-3 font-semibold underline"
//           >
//             Reload saved content
//           </button>
//         </div>
//       )}

//       {notice && (
//         <p
//           role="status"
//           className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
//         >
//           <CheckCircle2 size={18} className="shrink-0" />
//           {notice}
//         </p>
//       )}

//       {loading ? (
//         <div
//           role="status"
//           className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500"
//         >
//           <Loader2 size={20} className="animate-spin" />
//           Loading {page.label}...
//         </div>
//       ) : loaded ? (
//         <>
//           <fieldset
//             disabled={Boolean(saving) || conflict}
//             className="min-w-0 space-y-6"
//           >
//             <Panel
//               title={`${page.label} SEO`}
//               description="Search title aur description. Ye fields visible page paragraphs nahi badalti hain."
//             >
//               <Field
//                 label="SEO title"
//                 value={form.seo.title}
//                 onChange={(value) => update("seo", "title", value)}
//                 maxLength={200}
//               />

//               <Field
//                 label="Meta description"
//                 value={form.seo.description}
//                 onChange={(value) =>
//                   update("seo", "description", value)
//                 }
//                 multiline
//                 maxLength={500}
//               />

//               <Field
//                 label="Canonical URL"
//                 value={form.seo.canonicalUrl}
//                 onChange={(value) =>
//                   update("seo", "canonicalUrl", value)
//                 }
//                 hint={`Is page ka URL: https://truee.in${page.path}`}
//               />

//               <label className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
//                 <input
//                   type="checkbox"
//                   checked={Boolean(form.seo.noIndex)}
//                   onChange={(event) =>
//                     update("seo", "noIndex", event.target.checked)
//                   }
//                   className="mt-1 accent-[#A67D2D]"
//                 />
//                 <span>
//                   <strong>Hide from search results (noindex)</strong>
//                   <span className="mt-1 block text-xs leading-5">
//                     Page ko search results mein allow karna hai to
//                     unchecked rakho. Ye password protection nahi hai.
//                   </span>
//                 </span>
//               </label>

//               <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
//                 <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
//                   <Search size={15} />
//                   Search preview — example
//                 </p>
//                 <p className="break-all text-xs text-emerald-700">
//                   {form.seo.canonicalUrl ||
//                     `https://truee.in${page.path}`}
//                 </p>
//                 <p className="mt-2 break-words text-xl text-blue-700">
//                   {form.seo.title || "SEO title yahan dikhega"}
//                 </p>
//                 <p className="mt-2 text-sm leading-6 text-slate-600">
//                   {form.seo.description ||
//                     "Meta description yahan dikhegi."}
//                 </p>
//                 <p className="mt-3 text-xs text-slate-400">
//                   Google displayed title/description badal sakta hai.
//                 </p>
//               </div>
//             </Panel>

//             <Panel
//               title="Social Sharing"
//               description="Social title/description blank ho to page ke SEO title/description use honge."
//             >
//               {[
//                 ["socialTitle", "Social title", 200, false],
//                 [
//                   "socialDescription",
//                   "Social description",
//                   500,
//                   true,
//                 ],
//                 [
//                   "socialImage",
//                   "Social image URL / path",
//                   2000,
//                   false,
//                 ],
//                 [
//                   "socialImageAlt",
//                   "Social image alt text",
//                   250,
//                   false,
//                 ],
//               ].map(([key, label, maxLength, multiline]) => (
//                 <Field
//                   key={key}
//                   label={label}
//                   value={form.seo[key]}
//                   onChange={(value) => update("seo", key, value)}
//                   maxLength={maxLength}
//                   multiline={multiline}
//                   hint={
//                     key === "socialImage"
//                       ? "HTTPS image URL ya /image.jpg path."
//                       : undefined
//                   }
//                 />
//               ))}

//               <ImagePreview
//                 key={form.seo.socialImage}
//                 value={form.seo.socialImage}
//                 alt={form.seo.socialImageAlt}
//               />
//             </Panel>

//             {page.key === "home" && (
//               <>
//                 <Panel title="Home Page Heading & Description">
//                   <Field
//                     label="Main heading (H1)"
//                     value={form.content.mainHeading}
//                     onChange={(value) =>
//                       update("content", "mainHeading", value)
//                     }
//                     maxLength={250}
//                   />
//                   <Field
//                     label="Main description"
//                     value={form.content.mainDescription}
//                     onChange={(value) =>
//                       update("content", "mainDescription", value)
//                     }
//                     multiline
//                     maxLength={3000}
//                   />
//                 </Panel>

//                 <Panel
//                   title="Hero Banners"
//                   description="Banner text/images edit honge. Existing product matching aur links same rahenge."
//                 >
//                   {form.content.heroSlides.map((slide) => (
//                     <details
//                       key={slide.id}
//                       className="rounded-xl border border-slate-200"
//                     >
//                       <summary className="cursor-pointer px-4 py-4 text-sm font-semibold">
//                         Banner {slide.id}: {slide.title || "Untitled"}
//                       </summary>

//                       <div className="space-y-4 border-t border-slate-100 p-4">
//                         {[
//                           ["title", "Title", 200, false],
//                           ["subtitle", "Description", 1000, true],
//                           ["image", "Image URL / path", 2000, false],
//                           ["alt", "Image alt text", 250, false],
//                           [
//                             "shopButtonText",
//                             "Matched product button",
//                             80,
//                             false,
//                           ],
//                           [
//                             "browseButtonText",
//                             "Browse fallback button",
//                             80,
//                             false,
//                           ],
//                         ].map(
//                           ([key, label, maxLength, multiline]) => (
//                             <Field
//                               key={key}
//                               label={label}
//                               value={slide[key]}
//                               onChange={(value) =>
//                                 updateSlide(slide.id, key, value)
//                               }
//                               maxLength={maxLength}
//                               multiline={multiline}
//                             />
//                           )
//                         )}

//                         <ImagePreview
//                           key={slide.image}
//                           value={slide.image}
//                           alt={slide.alt}
//                         />
//                       </div>
//                     </details>
//                   ))}
//                 </Panel>

//                 <Panel
//                   title="Journal Section"
//                   description="Articles aur cover images Blogs page se manage honge."
//                 >
//                   {[
//                     ["journalEyebrow", "Small heading", 100],
//                     ["journalHeading", "Section heading", 250],
//                     [
//                       "journalDescription",
//                       "Section description",
//                       1000,
//                     ],
//                     [
//                       "journalButtonText",
//                       "View articles button",
//                       80,
//                     ],
//                     ["articleButtonText", "Read article button", 80],
//                   ].map(([key, label, maxLength]) => (
//                     <Field
//                       key={key}
//                       label={label}
//                       value={form.content[key]}
//                       onChange={(value) =>
//                         update("content", key, value)
//                       }
//                       maxLength={maxLength}
//                       multiline={key === "journalDescription"}
//                     />
//                   ))}
//                 </Panel>
//               </>
//             )}
//           </fieldset>

//           <div className="flex items-start gap-2 rounded-xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
//             <FileText size={17} className="mt-1 shrink-0" />
//             <p>
//               {publishedAt
//                 ? `Last published: ${new Date(
//                     publishedAt
//                   ).toLocaleString("en-IN")}.`
//                 : "Is page ka koi version abhi publish nahi hua hai."}
//             </p>
//           </div>
//         </>
//       ) : null}
//     </div>
//   );
// }

// export default function SeoContentEditor() {
//   const [pageKey, setPageKey] = useState("home");

//   const page = PAGES.find((item) => item.key === pageKey);

//   return (
//     <PageEditor
//       key={page.key}
//       page={page}
//       onPageChange={setPageKey}
//     />
//   );
// }

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  Search,
  Save,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

import api from "../../utils/axiosInstance";
import { mergeHomeContent } from "../../utils/homeContentDefaults";

const PAGES = [
  { key: "home", label: "Home", path: "/" },
  { key: "shop", label: "Shop", path: "/shop" },
  { key: "products", label: "Products", path: "/products" },
  { key: "brands", label: "Brands", path: "/brands" },
  { key: "about", label: "About Us", path: "/about" },
  { key: "contact", label: "Contact Us", path: "/contact" },
  {
    key: "privacy-policy",
    label: "Privacy Policy",
    path: "/privacy-policy",
  },
  { key: "terms", label: "Terms", path: "/terms" },
  {
    key: "refund-policy",
    label: "Refund Policy",
    path: "/refund-policy",
  },
  {
    key: "shipping-policy",
    label: "Shipping Policy",
    path: "/ShippingPolicy",
  },
  { key: "blog", label: "Blog Entry Page", path: "/blog" },
];

const PRODUCT_SEO_API = "/products/superadmin/seo/products";

const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8A253] px-4 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50";

const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50";

function errorMessage(error, fallback) {
  return (
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message ||
    fallback
  );
}

function useUnsavedWarning(dirty) {
  useEffect(() => {
    if (!dirty) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [dirty]);
}

function prepareForm(page, saved) {
  if (page.key === "home") {
    return mergeHomeContent(saved);
  }

  return {
    seo: {
      title: "",
      description: "",
      canonicalUrl: `https://truee.in${page.path}`,
      noIndex: false,
      socialTitle: "",
      socialDescription: "",
      socialImage: "",
      socialImageAlt: "",
      ...(saved?.seo || {}),
    },
    content: saved?.content || {},
  };
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  maxLength,
  hint,
}) {
  const id = useId();

  const props = {
    id,
    value: value ?? "",
    onChange: (event) => onChange(event.target.value),
    maxLength,
    className:
      "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C8A253] focus:ring-4 focus:ring-[#C8A253]/10",
  };

  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      {multiline ? (
        <textarea {...props} rows={4} />
      ) : (
        <input {...props} type="text" />
      )}

      {(hint || maxLength) && (
        <div className="mt-2 flex justify-between gap-4 text-xs text-slate-400">
          <span>{hint}</span>

          {maxLength && (
            <span className="shrink-0">
              {(value || "").length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function Panel({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

function safeImage(value) {
  if (typeof value !== "string") return "";

  const url = value.trim();

  if (
    url.startsWith("/") &&
    !url.startsWith("//") &&
    !/[\\\s]/.test(url)
  ) {
    return url;
  }

  try {
    const parsed = new URL(url);

    return parsed.protocol === "https:" &&
      !parsed.username &&
      !parsed.password
      ? url
      : "";
  } catch {
    return "";
  }
}

function ImagePreview({ value, alt }) {
  const [failed, setFailed] = useState(false);
  const url = safeImage(value);

  if (!url || failed) {
    return (
      <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
        <ImageIcon size={20} className="mr-2" />
        {failed ? "Image load nahi hui" : "Image preview"}
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt || "Image preview"}
      onError={() => setFailed(true)}
      className="h-44 w-full rounded-xl border border-slate-200 bg-slate-50 object-contain"
    />
  );
}

function Notice({ message }) {
  if (!message) return null;

  return (
    <p
      role="status"
      className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
    >
      <CheckCircle2 size={18} className="shrink-0" />
      {message}
    </p>
  );
}

function ErrorNotice({ message, onRetry, disabled }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      <p className="flex items-start gap-2">
        <AlertCircle size={18} className="shrink-0" />
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          disabled={disabled}
          className="mt-3 font-semibold underline disabled:opacity-50"
        >
          Reload saved content
        </button>
      )}
    </div>
  );
}

// Website page editor: existing Draft/Publish workflow.
function PageEditor({
  page,
  onPageChange,
  onStatusChange,
}) {
  const [form, setForm] = useState(() =>
    prepareForm(page, null)
  );

  const [revision, setRevision] = useState(0);
  const [publishedAt, setPublishedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState("");
  const [error, setError] = useState("");
  const [conflict, setConflict] = useState(false);
  const [notice, setNotice] = useState("");
  const [dirty, setDirty] = useState(false);
  const [reload, setReload] = useState(0);

  const savingRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useUnsavedWarning(dirty);

  useEffect(() => {
    onStatusChange({
      dirty,
      busy: Boolean(saving),
    });
  }, [dirty, saving, onStatusChange]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoaded(false);
      setError("");
      setNotice("");
      setConflict(false);

      try {
        const { data } = await api.get(
          `/page-content/manage/${page.key}`
        );

        if (
          !data?.success ||
          data.data?.pageKey !== page.key ||
          !Number.isInteger(data.data.revision)
        ) {
          throw new Error("Editor data ka response sahi nahi mila.");
        }

        if (!cancelled) {
          setForm(
            prepareForm(
              page,
              data.data.draft || data.data.published
            )
          );

          setRevision(data.data.revision);
          setPublishedAt(data.data.publishedAt);
          setDirty(false);
          setLoaded(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(errorMessage(err, "Editor load nahi hua."));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [page.key, reload]);

  const update = (section, key, value) => {
    setForm((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [key]: value,
      },
    }));

    setDirty(true);
    setNotice("");
  };

  const updateSlide = (id, key, value) => {
    setForm((previous) => ({
      ...previous,
      content: {
        ...previous.content,
        heroSlides: previous.content.heroSlides.map((slide) =>
          slide.id === id ? { ...slide, [key]: value } : slide
        ),
      },
    }));

    setDirty(true);
    setNotice("");
  };

  const changePage = (nextKey) => {
    if (nextKey === page.key || savingRef.current) return;

    if (
      dirty &&
      !window.confirm(
        "Page badalne par unsaved changes hat jayenge. Continue?"
      )
    ) {
      return;
    }

    onPageChange(nextKey);
  };

  const reloadSaved = () => {
    if (savingRef.current) return;

    if (
      dirty &&
      !window.confirm(
        "Reload karne par unsaved changes hat jayenge. Continue?"
      )
    ) {
      return;
    }

    setReload((value) => value + 1);
  };

  const save = async (action) => {
    if (
      savingRef.current ||
      !loaded ||
      loading ||
      conflict
    ) {
      return;
    }

    savingRef.current = true;
    setSaving(action);
    setError("");
    setNotice("");

    try {
      const { data } = await api.put(
        `/page-content/manage/${page.key}/${action}`,
        {
          seo: form.seo,
          content: form.content,
          revision,
        }
      );

      if (
        !data?.success ||
        data.data?.pageKey !== page.key ||
        !Number.isInteger(data.data.revision)
      ) {
        throw new Error("Changes save confirm nahi hue.");
      }

      if (!mountedRef.current) return;

      setForm(prepareForm(page, data.data.draft));
      setRevision(data.data.revision);
      setPublishedAt(data.data.publishedAt);
      setDirty(false);

      setNotice(
        action === "publish"
          ? `${page.label} ka published version save ho gaya.`
          : `${page.label} ka draft save ho gaya. Published version nahi badla.`
      );
    } catch (err) {
      if (!mountedRef.current) return;

      if (err.response?.status === 409) {
        setConflict(true);
      }

      setError(errorMessage(err, "Save failed."));
    } finally {
      savingRef.current = false;

      if (mountedRef.current) {
        setSaving("");
      }
    }
  };

  const cannotSave =
    loading || !loaded || Boolean(saving) || conflict;

  return (
    <div className="space-y-6 text-slate-900">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67D2D]">
            Website management
          </p>

          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
            SEO & Content
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {page.label} ·{" "}
            {loading
              ? "Loading..."
              : !loaded
                ? "Not loaded"
                : dirty
                  ? "Unsaved changes"
                  : "No unsaved changes"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => save("draft")}
            disabled={cannotSave}
            className={buttonSecondary}
          >
            {saving === "draft" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}

            Save Draft
          </button>

          <button
            type="button"
            onClick={() => save("publish")}
            disabled={cannotSave}
            className={buttonPrimary}
          >
            {saving === "publish" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}

            Publish
          </button>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <label
          htmlFor="seo-page-selector"
          className="mb-2 block text-sm font-semibold"
        >
          Kaunsa page edit karna hai?
        </label>

        <select
          id="seo-page-selector"
          value={page.key}
          onChange={(event) => changePage(event.target.value)}
          disabled={Boolean(saving)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#C8A253] sm:max-w-md"
        >
          {PAGES.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label} — {item.path}
            </option>
          ))}
        </select>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          Har page ka draft aur published version alag save hota hai.
        </p>

        {page.key === "blog" && (
          <p className="mt-2 text-xs leading-5 text-amber-700">
            Individual articles ka SEO Blogs section se manage hota
            hai. /blog abhi article par redirect hota hai.
          </p>
        )}
      </div>

      <ErrorNotice
        message={error}
        onRetry={reloadSaved}
        disabled={Boolean(saving)}
      />

      <Notice message={notice} />

      {loading ? (
        <div
          role="status"
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500"
        >
          <Loader2 size={20} className="animate-spin" />
          Loading {page.label}...
        </div>
      ) : loaded ? (
        <>
          <fieldset
            disabled={Boolean(saving) || conflict}
            className="min-w-0 space-y-6"
          >
            <Panel
              title={`${page.label} SEO`}
              description="Search title aur description. Ye fields visible page paragraphs nahi badalti hain."
            >
              <Field
                label="SEO title"
                value={form.seo.title}
                onChange={(value) => update("seo", "title", value)}
                maxLength={200}
              />

              <Field
                label="Meta description"
                value={form.seo.description}
                onChange={(value) =>
                  update("seo", "description", value)
                }
                multiline
                maxLength={500}
              />

              <Field
                label="Canonical URL"
                value={form.seo.canonicalUrl}
                onChange={(value) =>
                  update("seo", "canonicalUrl", value)
                }
                hint={`Is page ka URL: https://truee.in${page.path}`}
              />

              <label className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <input
                  type="checkbox"
                  checked={Boolean(form.seo.noIndex)}
                  onChange={(event) =>
                    update("seo", "noIndex", event.target.checked)
                  }
                  className="mt-1 accent-[#A67D2D]"
                />

                <span>
                  <strong>Hide from search results (noindex)</strong>

                  <span className="mt-1 block text-xs leading-5">
                    Page ko search results mein allow karna hai to
                    unchecked rakho. Ye password protection nahi hai.
                  </span>
                </span>
              </label>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Search size={15} />
                  Search preview — example
                </p>

                <p className="break-all text-xs text-emerald-700">
                  {form.seo.canonicalUrl ||
                    `https://truee.in${page.path}`}
                </p>

                <p className="mt-2 break-words text-xl text-blue-700">
                  {form.seo.title || "SEO title yahan dikhega"}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {form.seo.description ||
                    "Meta description yahan dikhegi."}
                </p>

                <p className="mt-3 text-xs text-slate-400">
                  Google displayed title/description badal sakta hai.
                </p>
              </div>
            </Panel>

            <Panel
              title="Social Sharing"
              description="Social title/description blank ho to page ke SEO title/description use honge."
            >
              {[
                ["socialTitle", "Social title", 200, false],
                [
                  "socialDescription",
                  "Social description",
                  500,
                  true,
                ],
                [
                  "socialImage",
                  "Social image URL / path",
                  2000,
                  false,
                ],
                [
                  "socialImageAlt",
                  "Social image alt text",
                  250,
                  false,
                ],
              ].map(([key, label, maxLength, multiline]) => (
                <Field
                  key={key}
                  label={label}
                  value={form.seo[key]}
                  onChange={(value) => update("seo", key, value)}
                  maxLength={maxLength}
                  multiline={multiline}
                  hint={
                    key === "socialImage"
                      ? "HTTPS image URL ya /image.jpg path."
                      : undefined
                  }
                />
              ))}

              <ImagePreview
                key={form.seo.socialImage}
                value={form.seo.socialImage}
                alt={form.seo.socialImageAlt}
              />
            </Panel>

            {page.key === "home" && (
              <>
                <Panel title="Home Page Heading & Description">
                  <Field
                    label="Main heading (H1)"
                    value={form.content.mainHeading}
                    onChange={(value) =>
                      update("content", "mainHeading", value)
                    }
                    maxLength={250}
                  />

                  <Field
                    label="Main description"
                    value={form.content.mainDescription}
                    onChange={(value) =>
                      update("content", "mainDescription", value)
                    }
                    multiline
                    maxLength={3000}
                  />
                </Panel>

                <Panel
                  title="Hero Banners"
                  description="Banner text/images edit honge. Existing product matching aur links same rahenge."
                >
                  {form.content.heroSlides.map((slide) => (
                    <details
                      key={slide.id}
                      className="rounded-xl border border-slate-200"
                    >
                      <summary className="cursor-pointer px-4 py-4 text-sm font-semibold">
                        Banner {slide.id}: {slide.title || "Untitled"}
                      </summary>

                      <div className="space-y-4 border-t border-slate-100 p-4">
                        {[
                          ["title", "Title", 200, false],
                          ["subtitle", "Description", 1000, true],
                          ["image", "Image URL / path", 2000, false],
                          ["alt", "Image alt text", 250, false],
                          [
                            "shopButtonText",
                            "Matched product button",
                            80,
                            false,
                          ],
                          [
                            "browseButtonText",
                            "Browse fallback button",
                            80,
                            false,
                          ],
                        ].map(
                          ([key, label, maxLength, multiline]) => (
                            <Field
                              key={key}
                              label={label}
                              value={slide[key]}
                              onChange={(value) =>
                                updateSlide(slide.id, key, value)
                              }
                              maxLength={maxLength}
                              multiline={multiline}
                            />
                          )
                        )}

                        <ImagePreview
                          key={slide.image}
                          value={slide.image}
                          alt={slide.alt}
                        />
                      </div>
                    </details>
                  ))}
                </Panel>

                <Panel
                  title="Journal Section"
                  description="Articles aur cover images Blogs page se manage honge."
                >
                  {[
                    ["journalEyebrow", "Small heading", 100],
                    ["journalHeading", "Section heading", 250],
                    [
                      "journalDescription",
                      "Section description",
                      1000,
                    ],
                    [
                      "journalButtonText",
                      "View articles button",
                      80,
                    ],
                    ["articleButtonText", "Read article button", 80],
                  ].map(([key, label, maxLength]) => (
                    <Field
                      key={key}
                      label={label}
                      value={form.content[key]}
                      onChange={(value) =>
                        update("content", key, value)
                      }
                      maxLength={maxLength}
                      multiline={key === "journalDescription"}
                    />
                  ))}
                </Panel>
              </>
            )}
          </fieldset>

          <div className="flex items-start gap-2 rounded-xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
            <FileText size={17} className="mt-1 shrink-0" />

            <p>
              {publishedAt
                ? `Last published: ${new Date(
                    publishedAt
                  ).toLocaleString("en-IN")}.`
                : "Is page ka koi version abhi publish nahi hua hai."}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

// One product gets an independent form and load state.
function ProductSeoForm({ productId, onStatusChange }) {
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    seoTitle: "",
    seoDescription: "",
  });

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [reload, setReload] = useState(0);

  const savingRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useUnsavedWarning(dirty);

  useEffect(() => {
    onStatusChange({ dirty, busy: saving });
  }, [dirty, saving, onStatusChange]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoaded(false);
      setError("");
      setNotice("");

      try {
        const { data } = await api.get(
          `${PRODUCT_SEO_API}/${encodeURIComponent(productId)}`
        );

        if (
          !data?.success ||
          data.product?._id !== productId
        ) {
          throw new Error("Product SEO ka response sahi nahi mila.");
        }

        if (!cancelled) {
          setProduct(data.product);

          setForm({
            seoTitle: data.product.seoTitle || "",
            seoDescription: data.product.seoDescription || "",
          });

          setDirty(false);
          setLoaded(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(errorMessage(err, "Product SEO load nahi hua."));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [productId, reload]);

  const update = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));

    setDirty(true);
    setNotice("");
  };

  const reloadSaved = () => {
    if (savingRef.current) return;

    if (
      dirty &&
      !window.confirm(
        "Reload karne par unsaved changes hat jayenge. Continue?"
      )
    ) {
      return;
    }

    setReload((value) => value + 1);
  };

  const save = async (event) => {
    event.preventDefault();

    if (
      savingRef.current ||
      loading ||
      !loaded ||
      !dirty
    ) {
      return;
    }

    savingRef.current = true;
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const { data } = await api.put(
        `${PRODUCT_SEO_API}/${encodeURIComponent(productId)}`,
        {
          seoTitle: form.seoTitle,
          seoDescription: form.seoDescription,
        }
      );

      if (
        !data?.success ||
        data.product?._id !== productId
      ) {
        throw new Error("Product SEO save confirm nahi hua.");
      }

      if (!mountedRef.current) return;

      setProduct(data.product);

      setForm({
        seoTitle: data.product.seoTitle || "",
        seoDescription: data.product.seoDescription || "",
      });

      setDirty(false);

      setNotice(
        "Product SEO save ho gaya. Product page refresh karke check karo."
      );
    } catch (err) {
      if (mountedRef.current) {
        setError(errorMessage(err, "Product SEO save nahi hua."));
      }
    } finally {
      savingRef.current = false;

      if (mountedRef.current) {
        setSaving(false);
      }
    }
  };

  return (
    <Panel
      title={product?.name || "Product SEO"}
      description="Yahan save karne par SEO turant live update hota hai. Product SEO mein Draft/Publish nahi hai."
    >
      <ErrorNotice
        message={error}
        onRetry={reloadSaved}
        disabled={saving}
      />

      <Notice message={notice} />

      {loading ? (
        <p
          role="status"
          className="flex items-center gap-2 text-sm text-slate-500"
        >
          <Loader2 size={18} className="animate-spin" />
          Loading product SEO...
        </p>
      ) : loaded ? (
        <form onSubmit={save} className="space-y-5">
          <fieldset
            disabled={saving}
            className="min-w-0 space-y-5"
          >
            <div className="rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">
              <p>
                {[product.brand, product.category]
                  .filter(Boolean)
                  .join(" · ") || "Product"}
              </p>

              <p className="mt-1">
                {product.isActive
                  ? "Active product"
                  : "Inactive product"}
              </p>
            </div>

            <Field
              label="Product SEO title"
              value={form.seoTitle}
              onChange={(value) => update("seoTitle", value)}
              maxLength={200}
              hint="Blank rakho to product name se automatic title banega."
            />

            <Field
              label="Product meta description"
              value={form.seoDescription}
              onChange={(value) =>
                update("seoDescription", value)
              }
              multiline
              maxLength={500}
              hint="Blank rakho to product description se automatic SEO banega."
            />

            <div>
              <label
                htmlFor={`canonical-${productId}`}
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Product canonical URL
              </label>

              <input
                id={`canonical-${productId}`}
                type="text"
                readOnly
                value={`https://truee.in/product/${productId}`}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-600"
              />

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Har product ka apna URL automatically banta hai.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Search size={15} />
                Search preview — example
              </p>

              <p className="break-all text-xs text-emerald-700">
                https://truee.in/product/{productId}
              </p>

              <p className="mt-2 break-words text-xl text-blue-700">
                {form.seoTitle.trim() ||
                  `${product.name} | Truee`}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {form.seoDescription.trim() ||
                  "Product page existing product description se meta description automatically banayega."}
              </p>

              <p className="mt-3 text-xs text-slate-400">
                Google displayed title/description badal sakta hai.
              </p>
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={saving || !loaded || !dirty}
              className={buttonPrimary}
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}

              {saving ? "Saving..." : "Save Changes"}
            </button>

            <a
              href={`/product/${encodeURIComponent(productId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#987129] underline underline-offset-4"
            >
              Open product page
            </a>

            <span className="text-xs text-slate-400">
              {dirty ? "Unsaved changes" : "No unsaved changes"}
            </span>
          </div>
        </form>
      ) : null}
    </Panel>
  );
}

function ProductSeoManager({ status, onStatusChange }) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get(PRODUCT_SEO_API, {
          params: {
            page,
            search,
          },
        });

        if (
          !data?.success ||
          !Array.isArray(data.products) ||
          !Number.isInteger(data.pagination?.totalPages) ||
          !Number.isInteger(data.pagination?.total)
        ) {
          throw new Error("Product list ka response sahi nahi mila.");
        }

        if (!cancelled) {
          setProducts(data.products);
          setPagination(data.pagination);
        }
      } catch (err) {
        if (!cancelled) {
          setProducts([]);
          setError(errorMessage(err, "Products load nahi hue."));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [page, search, reload]);

  const searchProducts = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
    setReload((value) => value + 1);
  };

  const selectProduct = (id) => {
    if (id === selectedId || status.busy) return;

    if (
      status.dirty &&
      !window.confirm(
        "Product badalne par unsaved SEO changes hat jayenge. Continue?"
      )
    ) {
      return;
    }

    onStatusChange({ dirty: false, busy: false });
    setSelectedId(id);
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67D2D]">
          Website management
        </p>

        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
          Product SEO
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Product search karo, select karo aur uska SEO title aur
          description edit karo.
        </p>
      </header>

      <div className="grid items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Select product</h2>

          <form
            onSubmit={searchProducts}
            className="mt-4 space-y-3"
          >
            <label
              htmlFor="product-seo-search"
              className="sr-only"
            >
              Search products by name, brand or category
            </label>

            <input
              id="product-seo-search"
              type="search"
              value={searchInput}
              maxLength={200}
              onChange={(event) =>
                setSearchInput(event.target.value)
              }
              placeholder="Name, brand or category..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#C8A253]"
            />

            <button
              type="submit"
              className={`${buttonSecondary} w-full`}
            >
              <Search size={16} />
              Search
            </button>
          </form>

          <div className="mt-5">
            {loading ? (
              <p
                role="status"
                className="flex items-center gap-2 py-6 text-sm text-slate-500"
              >
                <Loader2 size={18} className="animate-spin" />
                Loading products...
              </p>
            ) : error ? (
              <ErrorNotice
                message={error}
                onRetry={() => setReload((value) => value + 1)}
              />
            ) : products.length === 0 ? (
              <p className="py-6 text-sm text-slate-500">
                Koi product nahi mila.
              </p>
            ) : (
              <>
                <p className="mb-3 text-xs text-slate-400">
                  {pagination.total} products
                </p>

                <div className="max-h-[560px] space-y-2 overflow-y-auto pr-1">
                  {products.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      disabled={status.busy}
                      onClick={() => selectProduct(product._id)}
                      aria-pressed={selectedId === product._id}
                      className={`w-full rounded-xl border p-3 text-left transition disabled:opacity-50 ${
                        selectedId === product._id
                          ? "border-[#C8A253] bg-[#FCF8EE]"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span className="block break-words text-sm font-semibold text-slate-800">
                        {product.name}
                      </span>

                      <span className="mt-1 block text-xs leading-5 text-slate-400">
                        {[product.brand, product.category]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </button>
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() =>
                        setPage((value) => Math.max(1, value - 1))
                      }
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <span className="text-xs text-slate-400">
                      {page} / {pagination.totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={page >= pagination.totalPages}
                      onClick={() => setPage((value) => value + 1)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <div className="min-w-0">
          {selectedId ? (
            <ProductSeoForm
              key={selectedId}
              productId={selectedId}
              onStatusChange={onStatusChange}
            />
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <FileText size={32} className="text-[#C8A253]" />

              <p className="text-sm text-slate-500">
                List se product select karo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SeoContentEditor() {
  const [mode, setMode] = useState("pages");
  const [pageKey, setPageKey] = useState("home");

  const [status, setStatus] = useState({
    dirty: false,
    busy: false,
  });

  const page =
    PAGES.find((item) => item.key === pageKey) || PAGES[0];

  const changeMode = (nextMode) => {
    if (nextMode === mode || status.busy) return;

    if (
      status.dirty &&
      !window.confirm(
        "Section badalne par unsaved changes hat jayenge. Continue?"
      )
    ) {
      return;
    }

    setStatus({ dirty: false, busy: false });
    setMode(nextMode);
  };

  const changePage = (nextKey) => {
    setStatus({ dirty: false, busy: false });
    setPageKey(nextKey);
  };

  return (
    <div className="space-y-6 text-slate-900">
      <title>SEO & Content | Truee Super Admin</title>
      <meta name="robots" content="noindex,nofollow" />

      <div
        role="group"
        aria-label="SEO editor section"
        className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 sm:w-fit"
      >
        {[
          ["pages", "Website Pages"],
          ["product-seo", "Product SEO"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => changeMode(key)}
            disabled={status.busy}
            aria-pressed={mode === key}
            className={`rounded-xl px-5 py-3 text-sm font-semibold transition disabled:opacity-50 ${
              mode === key
                ? "bg-[#F8F1E2] text-[#886524]"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "pages" ? (
        <PageEditor
          key={page.key}
          page={page}
          onPageChange={changePage}
          onStatusChange={setStatus}
        />
      ) : (
        <ProductSeoManager
          status={status}
          onStatusChange={setStatus}
        />
      )}
    </div>
  );
}