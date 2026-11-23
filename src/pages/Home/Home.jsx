import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

import axiosInstance from "../../utils/axiosInstance";
import { mergeHomeContent } from "../../utils/homeContentDefaults";
import { useAuth } from "../../context/AuthContext";

import Header1 from "./Header1";
import BrandsMarquee from "./BrandsMarquee";
import Footer from "./Footer";
import Cursor from "./Cursor";
import Newsletter2 from "../../components/Newsletter2";
import Hero1 from "./Hero1";
import HomeProductBlocks from "./HomeProductBlocks";
import CuratedPrivileges from "./CuratedPrivileges";
import RecentlyViewed from "./RecentlyViewed";
import TrendingSection from "./TrendingSection";
import CategoryShowcase from "./Category";
import Deals from "./Deal";
import MarshallDesign from "./Views";
import MarshallWideLayout from "./MarshalWideLayout";
import TestimonialSlider from "./TestimonialSlider";
import HomeCouponDisplay from "./HomeCouponDisplay";
import BrandCouponDisplay from "./BrandCouponDisplay";
import TrustSection from "../../components/trust/TrustSection";
import MobileStickyBar from "../../components/navigation/MobileStickyBar";
import { SkeletonCard } from "../../components/ui/Skeleton";

const EMPTY_HOME_DATA = {
  flashDeals: [],
  trending: [],
  recommended: [],
  recentlyViewed: [],
  featured: [],
  newArrivals: [],
};

function getImageUrl(value) {
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

function JournalImage({ src, alt, logo = false }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = getImageUrl(src);

  if (!imageUrl || failed) {
    if (logo) return null;

    return (
      <div className="flex h-full min-h-52 w-full flex-col items-center justify-center gap-3 bg-[#F5F2EC] text-[#A77D35]">
        <BookOpen
          size={32}
          strokeWidth={1.3}
          aria-hidden="true"
        />
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
          Truee Journal
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={
        logo
          ? "block h-auto w-[180px] max-w-full object-contain object-left sm:w-[200px]"
          : "h-full w-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105"
      }
    />
  );
}

function HomeBlogSection({ content }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchBlogs = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/blogs?home=true&limit=3"
        );

        if (!cancelled && data?.success) {
          setBlogs(
            Array.isArray(data.blogs)
              ? data.blogs.filter((blog) => blog?.slug)
              : []
          );
        }
      } catch (error) {
        if (!cancelled) setBlogs([]);

        console.error(
          "Homepage blogs could not be loaded:",
          error
        );
      }
    };

    fetchBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

  if (blogs.length === 0) return null;

  const singleArticle = blogs.length === 1;

  return (
    <section
      aria-labelledby="home-blog-heading"
      className="border-t border-[#EDE9E2] bg-[#FCFBF8] px-5 py-12 sm:px-8 md:px-12 md:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end md:mb-9">
          <div>
            <p className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#A77D35]">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#C8A253]"
              />
              {content.journalEyebrow}
            </p>

            <h2
              id="home-blog-heading"
              className="font-serif text-3xl tracking-tight text-[#161616] md:text-4xl"
            >
              {content.journalHeading}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {content.journalDescription}
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex self-start items-center gap-3 border-b border-[#C8A253] pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#111] transition-colors hover:text-[#A77D35] sm:self-auto"
          >
            {content.journalButtonText}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div
          className={
            singleArticle
              ? ""
              : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {blogs.map((blog) => {
            const articleUrl =
              `/blog/${encodeURIComponent(blog.slug)}`;

            const logoUrl = getImageUrl(blog.logoImage);

            return (
              <article
                key={blog._id || blog.slug}
                className={`group overflow-hidden rounded-[22px] border border-[#E8E4DC] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.025)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] ${
                  singleArticle
                    ? "grid md:grid-cols-[1.05fr_1fr]"
                    : "flex h-full flex-col"
                }`}
              >
                <Link
                  to={articleUrl}
                  aria-label={`Read ${blog.title}`}
                  className={`relative block overflow-hidden bg-[#F1F3F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#C8A253] ${
                    singleArticle
                      ? "aspect-[16/10] md:aspect-auto md:min-h-[320px]"
                      : "aspect-[16/10]"
                  }`}
                >
                  <div className="absolute inset-0">
                    <JournalImage
                      key={blog.coverImage || "cover"}
                      src={blog.coverImage}
                      alt={blog.coverImageAlt || blog.title}
                    />
                  </div>

                  <span className="absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full border border-[#E5D3A8]/80 bg-[#171717]/85 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-[#F4DFAA] shadow-[0_8px_20px_rgba(0,0,0,0.22)] backdrop-blur-md sm:left-2.5 sm:top-2.5 sm:gap-1.5 sm:px-3.5 sm:py-1.5 sm:text-[9px] sm:tracking-[0.18em]">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[#C8A253]"
                    />
                    {blog.category || "Truee Journal"}
                  </span>
                </Link>

                <div
                  className={`flex min-w-0 flex-1 flex-col p-6 ${
                    singleArticle
                      ? "justify-center sm:p-8 lg:px-10"
                      : "sm:p-7"
                  }`}
                >
                  {logoUrl && (
                    <div className="mb-6 flex w-full items-center justify-start">
                      <JournalImage
                        key={logoUrl}
                        src={logoUrl}
                        alt={blog.logoAlt || "Article brand logo"}
                        logo
                      />
                    </div>
                  )}

                  <h3
                    className={`font-serif leading-tight text-[#171717] ${
                      singleArticle
                        ? "text-2xl lg:text-3xl"
                        : "text-2xl"
                    }`}
                  >
                    <Link
                      to={articleUrl}
                      className="transition-colors hover:text-[#A77D35]"
                    >
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-500">
                    {blog.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEEAE3] pt-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                      By {blog.authorName || "Truee"}
                    </span>

                    <Link
                      to={articleUrl}
                      className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#A77D35]"
                    >
                      {content.articleButtonText}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { user } = useAuth();

  const [homeData, setHomeData] = useState(EMPTY_HOME_DATA);
  const [loading, setLoading] = useState(true);

  const [pageContent, setPageContent] = useState(() =>
    mergeHomeContent(null)
  );

  // Fetch only the published version.
  // Existing defaults remain if the API is unavailable.
  useEffect(() => {
    let cancelled = false;

    const fetchContent = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/page-content/home"
        );

        if (!cancelled && data?.success && data.data) {
          setPageContent(mergeHomeContent(data.data));
        }
      } catch (error) {
        console.error(
          "Published homepage content could not be loaded:",
          error
        );
      }
    };

    fetchContent();

    return () => {
      cancelled = true;
    };
  }, []);

  // Existing product loading logic.
  useEffect(() => {
    let cancelled = false;

    const fetchHomeData = async () => {
      setLoading(true);

      try {
        let guestId = localStorage.getItem("guestId");

        if (!guestId) {
          guestId =
            "guest_" +
            Math.random().toString(36).slice(2, 11) +
            Date.now();

          localStorage.setItem("guestId", guestId);
        }

        const { data } = await axiosInstance.get(
          `/home?t=${Date.now()}`,
          {
            headers: {
              "x-guest-id": guestId,
              "Cache-Control": "no-cache",
            },
          }
        );

        if (!cancelled && data?.success && data.data) {
          const nextData = {};

          Object.keys(EMPTY_HOME_DATA).forEach((key) => {
            nextData[key] = Array.isArray(data.data[key])
              ? data.data[key]
              : [];
          });

          setHomeData(nextData);
        }
      } catch (error) {
        console.error("Home API Error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchHomeData();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seenProductIds = new Set();

  const allProducts = [
    ...homeData.featured,
    ...homeData.trending,
    ...homeData.newArrivals,
  ].filter((product) => {
    if (!product?._id || seenProductIds.has(product._id)) {
      return false;
    }

    seenProductIds.add(product._id);
    return true;
  });

  const { seo, content } = pageContent;

  const canonicalUrl =
    seo.canonicalUrl || "https://truee.in/";

  const socialTitle = seo.socialTitle || seo.title;
  const socialDescription =
    seo.socialDescription || seo.description;

  const socialImagePath = getImageUrl(seo.socialImage);

  const socialImageUrl = socialImagePath
    ? new URL(socialImagePath, "https://truee.in/").href
    : "";

  return (
    <div className="bg-[var(--theme-bg-light)] min-h-screen pb-mobile-nav selection:bg-[var(--theme-primary)] selection:text-white transition-colors duration-500">
      <title>{seo.title}</title>

      <meta
        name="description"
        content={seo.description}
      />

      <meta
        name="robots"
        content={seo.noIndex ? "noindex,follow" : "index,follow"}
      />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Truee" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={socialTitle} />
      <meta
        property="og:description"
        content={socialDescription}
      />

      <meta
        name="twitter:card"
        content={socialImageUrl ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={socialTitle} />
      <meta
        name="twitter:description"
        content={socialDescription}
      />

      {socialImageUrl && (
        <>
          <meta property="og:image" content={socialImageUrl} />
          <meta
            property="og:image:alt"
            content={seo.socialImageAlt || socialTitle}
          />
          <meta name="twitter:image" content={socialImageUrl} />
          <meta
            name="twitter:image:alt"
            content={seo.socialImageAlt || socialTitle}
          />
        </>
      )}

      <Cursor />
      <Header1 />

      <HomeCouponDisplay displayLocation="Home Banner" />

      <main id="main-content">
        <div className="bg-white relative z-20">
          <Hero1 heroSlides={content.heroSlides} />
          <BrandsMarquee />
        </div>

        <section
          aria-labelledby="home-main-heading"
          className="bg-white px-6 py-8 text-center"
        >
          <h1
            id="home-main-heading"
            className="text-2xl md:text-3xl font-bold text-gray-900"
          >
            {content.mainHeading}
          </h1>

          <p className="mt-3 whitespace-pre-line text-gray-600 max-w-3xl mx-auto">
            {content.mainDescription}
          </p>
        </section>

        {loading ? (
          <div
            role="status"
            className="px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            <span className="sr-only">
              Loading homepage products...
            </span>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            <Deals />
            <HomeProductBlocks products={allProducts} />
            <MarshallWideLayout />
            <CategoryShowcase />
            <MarshallDesign />
            <TrendingSection products={allProducts} />
            <BrandCouponDisplay />
            <TrustSection />
            <CuratedPrivileges products={allProducts} />
            <TestimonialSlider />
          </>
        )}

        <RecentlyViewed />
        <Newsletter2 />
        <HomeBlogSection content={content} />
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}