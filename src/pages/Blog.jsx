// import { useEffect, useState } from "react";
// import { Link, Navigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   BookOpen,
//   CalendarDays,
//   Clock3,
// } from "lucide-react";

// import axiosInstance from "../utils/axiosInstance";

// const SITE_URL = "https://truee.in";

// function imageUrl(value) {
//   if (typeof value !== "string") return "";

//   const url = value.trim();

//   if (url.startsWith("/") && !url.startsWith("//")) {
//     return url;
//   }

//   try {
//     return new URL(url).protocol === "https:" ? url : "";
//   } catch {
//     return "";
//   }
// }

// function formatDate(value) {
//   if (!value) return "";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "";

//   return date.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }

// function BlogImage({ src, alt, logo = false }) {
//   const [failed, setFailed] = useState(false);
//   const url = imageUrl(src);

//   if (!url || failed) {
//     if (logo) return null;

//     return (
//       <div className="flex aspect-[4/3] items-center justify-center bg-[#F1EDE5]">
//         <BookOpen
//           size={40}
//           strokeWidth={1}
//           className="text-[#A77D35]"
//           aria-hidden="true"
//         />
//       </div>
//     );
//   }

//   return (
//     <img
//       src={url}
//       alt={alt || ""}
//       loading="eager"
//       decoding="async"
//       onError={() => setFailed(true)}
//       className={
//         logo
//           ? "block h-auto w-[180px] max-w-full object-contain object-left sm:w-[200px]"
//           : "aspect-[4/3] h-full w-full object-cover"
//       }
//     />
//   );
// }

// function getBlocks(content) {
//   return String(content || "")
//     .split(/\r?\n\s*\r?\n/)
//     .map((text) => text.trim())
//     .filter(Boolean)
//     .map((text, index, all) => ({
//       text,
//       id: `article-section-${index}`,
//       heading:
//         text.length <= 100 &&
//         !text.includes("\n") &&
//         !/[.!?:;]$/.test(text) &&
//         !/^https?:\/\//i.test(text) &&
//         index < all.length - 1,
//     }));
// }

// function ArticleBody({ blocks }) {
//   if (!blocks.length) {
//     return (
//       <p className="text-base leading-8 text-gray-600">
//         Article content is currently unavailable.
//       </p>
//     );
//   }

//   return blocks.map((block) => {
//     if (block.heading) {
//       return (
//         <h2
//           key={block.id}
//           id={block.id}
//           className="mb-4 mt-10 scroll-mt-32 font-serif text-[25px] leading-snug tracking-tight text-[#191919] first:mt-0 sm:text-[29px]"
//         >
//           {block.text}
//         </h2>
//       );
//     }

//     const website = block.text.match(
//       /^Official website:\s*(https:\/\/[^\s]+)\s*$/i
//     );

//     if (website) {
//       return (
//         <p
//           key={block.id}
//           className="my-7 break-words border-l-2 border-[#C8A253] bg-[#FAF8F3] p-5 text-sm leading-7 text-gray-600"
//         >
//           Official website:{" "}
//           <a
//             href={website[1]}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="font-semibold text-[#987129] underline underline-offset-4"
//           >
//             {website[1]}
//           </a>
//         </p>
//       );
//     }

//     return (
//       <p
//         key={block.id}
//         className="mb-6 whitespace-pre-line break-words text-[16px] leading-8 text-[#606873] sm:text-[17px]"
//       >
//         {block.text}
//       </p>
//     );
//   });
// }

// export default function Blog() {
//   const { slug } = useParams();
//   const [retry, setRetry] = useState(0);

//   const [result, setResult] = useState({
//     slug: "",
//     loading: true,
//     blog: null,
//     error: "",
//     notFound: false,
//   });

//   useEffect(() => {
//     if (!slug) return;

//     let cancelled = false;

//     setResult({
//       slug,
//       loading: true,
//       blog: null,
//       error: "",
//       notFound: false,
//     });

//     const fetchArticle = async () => {
//       try {
//         const { data } = await axiosInstance.get(
//           `/blogs/${encodeURIComponent(slug)}`
//         );

//         if (!data?.success || !data.blog) {
//           throw new Error("Unexpected article response.");
//         }

//         if (!cancelled) {
//           setResult({
//             slug,
//             loading: false,
//             blog: data.blog,
//             error: "",
//             notFound: false,
//           });
//         }
//       } catch (error) {
//         if (cancelled) return;

//         const notFound = error.response?.status === 404;

//         setResult({
//           slug,
//           loading: false,
//           blog: null,
//           notFound,
//           error: notFound
//             ? "This article is unavailable or has not been published."
//             : "Unable to load the article. Please try again.",
//         });
//       }
//     };

//     fetchArticle();

//     return () => {
//       cancelled = true;
//     };
//   }, [slug, retry]);

//   // Old /blog links return visitors to the homepage blog section.
//   if (!slug) {
//     return <Navigate to="/#home-blog-heading" replace />;
//   }

//   if (result.loading || result.slug !== slug) {
//     return (
//       <div
//         role="status"
//         className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#FCFBF8] px-6"
//       >
//         <title>Loading Article | Truee</title>

//         <BookOpen
//           size={32}
//           strokeWidth={1.3}
//           className="animate-pulse text-[#A77D35]"
//           aria-hidden="true"
//         />

//         <p className="text-sm text-gray-500">
//           Loading article...
//         </p>
//       </div>
//     );
//   }

//   if (result.error || !result.blog) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-[#FCFBF8] px-6 text-center text-[#171717]">
//         <title>Article Unavailable | Truee</title>

//         {result.notFound && (
//           <meta name="robots" content="noindex" />
//         )}

//         <h1 className="font-serif text-3xl">
//           {result.notFound
//             ? "Article unavailable"
//             : "Unable to load article"}
//         </h1>

//         <p role="alert" className="max-w-md text-sm leading-7 text-gray-500">
//           {result.error || "Article content is unavailable."}
//         </p>

//         {!result.notFound && (
//           <button
//             type="button"
//             onClick={() => setRetry((value) => value + 1)}
//             className="rounded-full bg-black px-6 py-3 text-sm text-white"
//           >
//             Try again
//           </button>
//         )}

//         <Link
//           to="/#home-blog-heading"
//           className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
//         >
//           <ArrowLeft size={15} aria-hidden="true" />
//           Back to home
//         </Link>
//       </div>
//     );
//   }

//   const blog = result.blog;
//   const blocks = getBlocks(blog.content);
//   const headings = blocks.filter((block) => block.heading);
//   const date = formatDate(blog.publishedAt);

//   const words = String(blog.content || "")
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean).length;

//   const minutes = Math.max(1, Math.ceil(words / 200));

//   const canonical =
//     `${SITE_URL}/blog/${encodeURIComponent(slug)}`;

//   const cover = imageUrl(blog.coverImage);
//   const socialImage = cover
//     ? new URL(cover, SITE_URL).href
//     : "";

//   const title = blog.seoTitle || `${blog.title} | Truee`;
//   const description = blog.seoDescription || blog.excerpt;

//   return (
//     <article className="bg-white font-sans text-[#171717]">
//       <title>{title}</title>

//       <meta name="description" content={description} />
//       <link rel="canonical" href={canonical} />

//       <meta property="og:type" content="article" />
//       <meta property="og:site_name" content="Truee" />
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:url" content={canonical} />

//       {socialImage && (
//         <meta property="og:image" content={socialImage} />
//       )}

//       <meta
//         name="twitter:card"
//         content={socialImage ? "summary_large_image" : "summary"}
//       />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />

//       {socialImage && (
//         <meta name="twitter:image" content={socialImage} />
//       )}

//       <div className="border-b border-[#EEEAE3] bg-white px-5 sm:px-8">
//         <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 py-5">
//           <Link
//             to="/#home-blog-heading"
//             className="inline-flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-[#987129]"
//           >
//             <ArrowLeft size={15} aria-hidden="true" />
//             Back to home
//           </Link>

//           <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#987129]">
//             Truee Journal
//           </span>
//         </div>
//       </div>

//       <header className="border-b border-[#EAE5DC] bg-[#FCFBF8] px-5 py-8 sm:px-8 md:py-12">
//         <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-2 lg:gap-12">
//           <div className="min-w-0">
//             {imageUrl(blog.logoImage) && (
//               <div className="mb-6">
//                 <BlogImage
//                   key={blog.logoImage}
//                   src={blog.logoImage}
//                   alt={blog.logoAlt || "Article brand logo"}
//                   logo
//                 />
//               </div>
//             )}

//             <p className="mb-4 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#987129]">
//               <span
//                 aria-hidden="true"
//                 className="h-px w-6 bg-[#C8A253]"
//               />
//               {blog.category || "Truee Journal"}
//             </p>

//             <h1 className="max-w-xl font-serif text-[30px] leading-[1.2] tracking-tight text-[#171717] sm:text-[36px] xl:text-[42px]">
//               {blog.title}
//             </h1>

//             <p className="mt-5 max-w-xl text-[14px] leading-7 text-[#68707B] sm:text-[15px]">
//               {blog.excerpt}
//             </p>

//             <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#E9E3D8] pt-5 text-[11px] text-gray-500">
//               <span className="font-medium text-[#353535]">
//                 By {blog.authorName || "Truee"}
//               </span>

//               {date && (
//                 <span className="inline-flex items-center gap-1.5">
//                   <CalendarDays size={13} aria-hidden="true" />
//                   <time dateTime={blog.publishedAt}>{date}</time>
//                 </span>
//               )}

//               <span className="inline-flex items-center gap-1.5">
//                 <Clock3 size={13} aria-hidden="true" />
//                 {minutes} min read
//               </span>
//             </div>
//           </div>

//           <div className="min-w-0 overflow-hidden rounded-[20px] bg-[#EEEAE2] shadow-[0_15px_45px_rgba(0,0,0,0.07)]">
//             <BlogImage
//               key={blog.coverImage}
//               src={blog.coverImage}
//               alt={blog.coverImageAlt || blog.title}
//             />
//           </div>
//         </div>
//       </header>

//       <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-10 sm:px-8 md:py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
//         <aside className="min-w-0">
//           <div className="border-t-2 border-[#C8A253] pt-5 lg:sticky lg:top-32">
//             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#987129]">
//               {headings.length
//                 ? "Inside this story"
//                 : "The Truee Journal"}
//             </p>

//             {headings.length > 0 && (
//               <nav
//                 aria-label="Article contents"
//                 className="mt-5 flex flex-col gap-3"
//               >
//                 {headings.map((heading) => (
//                   <a
//                     key={heading.id}
//                     href={`#${heading.id}`}
//                     className="border-l border-[#E6E0D5] pl-3 text-xs leading-5 text-gray-500 transition-colors hover:border-[#C8A253] hover:text-[#987129]"
//                   >
//                     {heading.text}
//                   </a>
//                 ))}
//               </nav>
//             )}
//           </div>
//         </aside>

//         <div className="min-w-0 max-w-[760px]">
//           <ArticleBody blocks={blocks} />

//           <div className="mt-12 border-t border-[#E8E2D6] pt-7">
//             <Link
//               to="/#home-blog-heading"
//               className="inline-flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#987129]"
//             >
//               <ArrowLeft size={15} aria-hidden="true" />
//               Back to home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  Link2,
  Sparkles,
} from "lucide-react";

import axiosInstance from "../utils/axiosInstance";

const SITE_URL = "https://truee.in";

function imageUrl(value) {
  if (typeof value !== "string") return "";

  const url = value.trim();

  if (url.startsWith("/") && !url.startsWith("//")) {
    return url;
  }

  try {
    return new URL(url).protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatHeadingText(text) {
  if (text === text.toUpperCase() && text.length > 4) {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
  return text;
}

function BlogImage({ src, alt, logo = false }) {
  const [failed, setFailed] = useState(false);
  const url = imageUrl(src);

  if (!url || failed) {
    if (logo) return null;

    return (
      <div className="flex aspect-[4/3] items-center justify-center bg-[#F1EDE5]">
        <BookOpen
          size={40}
          strokeWidth={1}
          className="text-[#A77D35]"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt || ""}
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      className={
        logo
          ? "block h-auto max-h-12 w-auto max-w-[200px] object-contain object-left"
          : "aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
      }
    />
  );
}

function getBlocks(content) {
  return String(content || "")
    .split(/\r?\n\s*\r?\n/)
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text, index, all) => ({
      text,
      id: `article-section-${index}`,
      heading:
        text.length <= 100 &&
        !text.includes("\n") &&
        !/[.!?:;]$/.test(text) &&
        !/^(?:Official website:\s*)?https?:\/\//i.test(text) &&
        index < all.length - 1,
    }));
}

function ArticleBody({ blocks, blog }) {
  if (!blocks.length) {
    return (
      <p className="text-base leading-8 text-gray-600">
        Article content is currently unavailable.
      </p>
    );
  }

  let firstParagraphRendered = false;

  return blocks.map((block) => {
    if (block.heading) {
      return (
        <h2
          key={block.id}
          id={block.id}
          className="mb-4 mt-12 scroll-mt-32 border-l-2 border-[#C8A253] pl-4 font-serif text-[24px] leading-snug tracking-tight text-[#171717] first:mt-0 sm:text-[28px]"
        >
          {formatHeadingText(block.text)}
        </h2>
      );
    }

    const rawUrl = block.text.match(
      /^(?:Official website:\s*)?(https:\/\/[^\s]+)\s*$/i
    );

    if (rawUrl) {
      return (
        <div
          key={block.id}
          className="my-10 overflow-hidden rounded-2xl border border-[#E5DEC9] bg-gradient-to-br from-[#FCFBF8] via-[#FAF6EE] to-[#F4EDE0] p-6 shadow-[0_10px_30px_rgba(167,125,53,0.08)] sm:p-8"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DFD3B8] bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#987129]">
                <Sparkles size={12} aria-hidden="true" />
                Official Platform
              </div>

              {imageUrl(blog.logoImage) ? (
                <div className="pt-1">
                  <BlogImage
                    src={blog.logoImage}
                    alt={blog.logoAlt || "Brand logo"}
                    logo
                  />
                </div>
              ) : (
                <h3 className="font-serif text-2xl text-[#171717]">
                  Explore Official Website
                </h3>
              )}

              <p className="max-w-md text-sm leading-relaxed text-[#5F6672]">
                Explore guided lessons, student dashboards, and hands-on AI
                learning directly on the official portal.
              </p>
            </div>

            <a
              href={rawUrl[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#987129] hover:shadow-lg"
            >
              Visit Website
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      );
    }

    const isLead = !firstParagraphRendered;
    if (isLead) firstParagraphRendered = true;

    return (
      <p
        key={block.id}
        className={`mb-6 whitespace-pre-line break-words text-[16px] leading-[1.85] text-[#525A65] sm:text-[17px] ${
          isLead
            ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-normal first-letter:leading-none first-letter:text-[#987129]"
            : ""
        }`}
      >
        {block.text}
      </p>
    );
  });
}

export default function Blog() {
  const { slug } = useParams();
  const [retry, setRetry] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const [copied, setCopied] = useState(false);

  const [result, setResult] = useState({
    slug: "",
    loading: true,
    blog: null,
    error: "",
    notFound: false,
  });

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    setResult({
      slug,
      loading: true,
      blog: null,
      error: "",
      notFound: false,
    });

    const fetchArticle = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/blogs/${encodeURIComponent(slug)}`
        );

        if (!data?.success || !data.blog) {
          throw new Error("Unexpected article response.");
        }

        if (!cancelled) {
          setResult({
            slug,
            loading: false,
            blog: data.blog,
            error: "",
            notFound: false,
          });
        }
      } catch (error) {
        if (cancelled) return;

        const notFound = error.response?.status === 404;

        setResult({
          slug,
          loading: false,
          blog: null,
          notFound,
          error: notFound
            ? "This article is unavailable or has not been published."
            : "Unable to load the article. Please try again.",
        });
      }
    };

    fetchArticle();

    return () => {
      cancelled = true;
    };
  }, [slug, retry]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        setScrollProgress(
          Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
        );
      }

      const sectionElements = document.querySelectorAll(
        "[id^='article-section-']"
      );
      let current = "";
      sectionElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 180) {
          current = el.id;
        }
      });
      if (current) setActiveHeading(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [result.blog]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!slug) {
    return <Navigate to="/#home-blog-heading" replace />;
  }

  if (result.loading || result.slug !== slug) {
    return (
      <div
        role="status"
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#FCFBF8] px-6"
      >
        <title>Loading Article | Truee</title>

        <BookOpen
          size={32}
          strokeWidth={1.3}
          className="animate-pulse text-[#A77D35]"
          aria-hidden="true"
        />

        <p className="text-sm text-gray-500">Loading article...</p>
      </div>
    );
  }

  if (result.error || !result.blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-[#FCFBF8] px-6 text-center text-[#171717]">
        <title>Article Unavailable | Truee</title>

        {result.notFound && <meta name="robots" content="noindex" />}

        <h1 className="font-serif text-3xl">
          {result.notFound ? "Article unavailable" : "Unable to load article"}
        </h1>

        <p role="alert" className="max-w-md text-sm leading-7 text-gray-500">
          {result.error || "Article content is unavailable."}
        </p>

        {!result.notFound && (
          <button
            type="button"
            onClick={() => setRetry((value) => value + 1)}
            className="rounded-full bg-black px-6 py-3 text-sm text-white"
          >
            Try again
          </button>
        )}

        <Link
          to="/#home-blog-heading"
          className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to home
        </Link>
      </div>
    );
  }

  const blog = result.blog;
  const blocks = getBlocks(blog.content);
  const headings = blocks.filter((block) => block.heading);
  const date = formatDate(blog.publishedAt);

  const words = String(blog.content || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));

  const canonical = `${SITE_URL}/blog/${encodeURIComponent(slug)}`;

  const cover = imageUrl(blog.coverImage);
  const socialImage = cover ? new URL(cover, SITE_URL).href : "";

  const title = blog.seoTitle || `${blog.title} | Truee`;
  const description = blog.seoDescription || blog.excerpt;

  return (
    <article className="relative bg-white font-sans text-[#171717]">
      <title>{title}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Truee" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      {socialImage && <meta property="og:image" content={socialImage} />}

      <meta
        name="twitter:card"
        content={socialImage ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {socialImage && <meta name="twitter:image" content={socialImage} />}

      {/* Gold Reading Progress Bar */}
      <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#C8A253] to-[#987129] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Navigation Strip */}
      <div className="border-b border-[#EEEAE3] bg-white/90 px-5 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 py-4">
          <Link
            to="/#home-blog-heading"
            className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition-colors hover:text-[#987129]"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Journal
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.24em] text-[#987129] sm:inline">
              The Truee Journal
            </span>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E6DFD3] bg-[#FCFBF8] px-3.5 py-1.5 text-[11px] font-medium text-[#353535] transition hover:border-[#C8A253] hover:text-[#987129]"
            >
              {copied ? (
                <Check size={13} className="text-green-700" />
              ) : (
                <Link2 size={13} />
              )}
              {copied ? "Copied" : "Share"}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="border-b border-[#EAE5DC] bg-gradient-to-b from-[#FCFBF8] to-[#F7F4EC] px-5 py-10 sm:px-8 md:py-14">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            {imageUrl(blog.logoImage) && (
              <div className="mb-6 inline-flex items-center rounded-xl border border-[#EAE3D5] bg-white px-4 py-2.5 shadow-sm">
                <BlogImage
                  key={blog.logoImage}
                  src={blog.logoImage}
                  alt={blog.logoAlt || "Article brand logo"}
                  logo
                />
              </div>
            )}

            <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#987129]">
              <span aria-hidden="true" className="h-px w-7 bg-[#C8A253]" />
              {blog.category || "Truee Journal"}
            </p>

            <h1 className="max-w-xl font-serif text-[32px] leading-[1.18] tracking-tight text-[#171717] sm:text-[38px] xl:text-[44px]">
              {blog.title}
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#5E6672] sm:text-[16px]">
              {blog.excerpt}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#E6DFD2] pt-5 text-xs text-gray-500">
              <span className="inline-flex items-center gap-2 font-semibold text-[#171717]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#171717] font-serif text-[10px] text-[#C8A253]">
                  T
                </span>
                {blog.authorName || "Truee"}
              </span>

              {date && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays
                    size={13}
                    className="text-[#987129]"
                    aria-hidden="true"
                  />
                  <time dateTime={blog.publishedAt}>{date}</time>
                </span>
              )}

              <span className="inline-flex items-center gap-1.5">
                <Clock3
                  size={13}
                  className="text-[#987129]"
                  aria-hidden="true"
                />
                {minutes} min read
              </span>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[22px] border border-[#E8E1D3] bg-[#EEEAE2] shadow-[0_20px_50px_rgba(23,23,23,0.08)]">
            <BlogImage
              key={blog.coverImage}
              src={blog.coverImage}
              alt={blog.coverImageAlt || blog.title}
            />
          </div>
        </div>
      </header>

      {/* Main Content & Sticky Table of Contents */}
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <aside className="min-w-0">
          <div className="rounded-2xl border border-[#ECE6DA] bg-[#FCFBF8] p-5 lg:sticky lg:top-28">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#987129]">
              {headings.length ? "Inside This Story" : "The Truee Journal"}
            </p>

            {headings.length > 0 && (
              <nav
                aria-label="Article contents"
                className="mt-4 flex flex-col gap-2.5"
              >
                {headings.map((heading) => {
                  const isActive = activeHeading === heading.id;
                  return (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`border-l-2 py-1 pl-3 text-xs leading-5 transition-all ${
                        isActive
                          ? "border-[#C8A253] font-semibold text-[#171717]"
                          : "border-[#E6E0D5] text-gray-500 hover:border-[#C8A253]/60 hover:text-[#987129]"
                      }`}
                    >
                      {formatHeadingText(heading.text)}
                    </a>
                  );
                })}
              </nav>
            )}
          </div>
        </aside>

        <div className="min-w-0 max-w-[740px]">
          <ArticleBody blocks={blocks} blog={blog} />

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#E8E2D6] pt-8">
            <Link
              to="/#home-blog-heading"
              className="inline-flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#987129]"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to Home
            </Link>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full border border-[#DFD7C8] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#353535] transition hover:border-[#C8A253] hover:text-[#987129]"
            >
              {copied ? (
                <Check size={14} className="text-green-700" />
              ) : (
                <Link2 size={14} />
              )}
              {copied ? "Link Copied" : "Share Article"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}