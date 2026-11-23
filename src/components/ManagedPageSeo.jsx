import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";

function textOrDefault(value, fallback = "") {
  return typeof value === "string" && value.trim()
    ? value.trim()
    : fallback;
}

function canonicalOrDefault(value, fallback) {
  if (!value) return fallback;

  try {
    const url = new URL(value);

    if (
      url.protocol === "https:" &&
      ["truee.in", "www.truee.in"].includes(url.hostname) &&
      !url.username &&
      !url.password &&
      !url.hash
    ) {
      return url.href;
    }
  } catch {
    // Keep the existing page canonical.
  }

  return fallback;
}

function absoluteImage(value) {
  if (typeof value !== "string" || !value.trim()) return "";

  const source = value.trim();

  try {
    if (
      source.startsWith("/") &&
      !source.startsWith("//") &&
      !/[\\\s]/.test(source)
    ) {
      return new URL(source, "https://truee.in/").href;
    }

    const url = new URL(source);

    if (
      url.protocol === "https:" &&
      !url.username &&
      !url.password
    ) {
      return url.href;
    }
  } catch {
    // Do not render an invalid image URL.
  }

  return "";
}

export default function ManagedPageSeo({
  pageKey,
  defaultTitle,
  defaultDescription,
  defaultCanonical,
}) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPublishedSeo() {
      try {
        const { data } = await api.get(
          `/page-content/${encodeURIComponent(pageKey)}`
        );

        if (!cancelled) {
          setResult({
            pageKey,
            seo: data?.success ? data.data?.seo || null : null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setResult({ pageKey, seo: null });
        }

        console.error(
          `Published SEO could not be loaded for ${pageKey}:`,
          error
        );
      }
    }

    loadPublishedSeo();

    return () => {
      cancelled = true;
    };
  }, [pageKey]);

  const seo =
    result?.pageKey === pageKey ? result.seo || {} : {};

  const title = textOrDefault(seo.title, defaultTitle);
  const description = textOrDefault(
    seo.description,
    defaultDescription
  );

  const canonical = canonicalOrDefault(
    seo.canonicalUrl,
    defaultCanonical
  );

  const socialTitle = textOrDefault(seo.socialTitle, title);
  const socialDescription = textOrDefault(
    seo.socialDescription,
    description
  );

  const image = absoluteImage(seo.socialImage);
  const imageAlt = textOrDefault(
    seo.socialImageAlt,
    socialTitle
  );

  return (
    <>
      <title>{title}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonical} />

      {typeof seo.noIndex === "boolean" && (
        <meta
          name="robots"
          content={
            seo.noIndex ? "noindex,follow" : "index,follow"
          }
        />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Truee" />
      <meta property="og:title" content={socialTitle} />
      <meta
        property="og:description"
        content={socialDescription}
      />
      <meta property="og:url" content={canonical} />

      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={socialTitle} />
      <meta
        name="twitter:description"
        content={socialDescription}
      />

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={imageAlt} />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:image:alt" content={imageAlt} />
        </>
      )}
    </>
  );
}