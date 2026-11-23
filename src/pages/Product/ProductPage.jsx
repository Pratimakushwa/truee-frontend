

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import ProductDetailModel from "./ProductDetailModel";

// const getPlainText = (value) => {
//   if (typeof value !== "string") return "";

//   const doc = new DOMParser().parseFromString(
//     value,
//     "text/html"
//   );

//   return (doc.body.textContent || "")
//     .replace(/\s+/g, " ")
//     .trim();
// };

// const getProductImage = (product) => {
//   const firstVariantImage =
//     product?.variants?.[0]?.images?.[0];

//   const firstProductImage =
//     product?.images?.[0];

//   const image =
//     (typeof firstVariantImage === "string"
//       ? firstVariantImage
//       : firstVariantImage?.url) ||
//     (typeof firstProductImage === "string"
//       ? firstProductImage
//       : firstProductImage?.url);

//   if (!image) return "";

//   try {
//     const url = new URL(image, "https://truee.in");

//     return ["https:", "http:"].includes(url.protocol)
//       ? url.href
//       : "";
//   } catch {
//     return "";
//   }
// };

// export default function ProductPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;

//     const fetchProduct = async () => {
//       setLoading(true);
//       setError("");
//       setProduct(null);

//       try {
//         const { data } = await axiosInstance.get(
//           `/products/${encodeURIComponent(id)}`
//         );

//         if (cancelled) return;

//         if (data?.success && data?.product) {
//           setProduct(data.product);
//         } else {
//           setError("Product not found.");
//         }
//       } catch (err) {
//         if (cancelled) return;

//         setError(
//           err.response?.status === 404
//             ? "Product not found."
//             : "Unable to load this product. Please refresh and try again."
//         );
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchProduct();

//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   if (loading) {
//     return (
//       <main className="min-h-screen flex items-center justify-center">
//         <title>Loading Product | Truee</title>

//         <p role="status">
//           Loading product...
//         </p>
//       </main>
//     );
//   }

//   if (error || !product) {
//     return (
//       <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
//         <title>Product Unavailable | Truee</title>

//         <meta
//           name="robots"
//           content="noindex"
//         />

//         <h1 className="text-2xl font-bold">
//           Product unavailable
//         </h1>

//         <p>
//           {error || "Product not found."}
//         </p>

//         <Link
//           to="/shop"
//           className="underline"
//         >
//           Browse all products
//         </Link>
//       </main>
//     );
//   }

//   const productName =
//     getPlainText(product.name) || "Product";

//   const productDescription =
//     getPlainText(product.shortDescription) ||
//     getPlainText(product.description);

//   const description = productDescription
//     ? `${productName} at Truee. ${productDescription}`.slice(
//         0,
//         160
//       )
//     : `Explore ${productName} at Truee. View product details, features, pricing and availability.`;

//   const pageTitle = `${productName} | Truee`;

//   const canonicalUrl =
//     `https://truee.in/product/${encodeURIComponent(id)}`;

//   const productImage = getProductImage(product);

//   return (
//     <>
//       <title>{pageTitle}</title>

//       <meta
//         name="description"
//         content={description}
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
//         content={description}
//       />

//       <meta
//         property="og:url"
//         content={canonicalUrl}
//       />

//       {productImage && (
//         <meta
//           property="og:image"
//           content={productImage}
//         />
//       )}

//       {productImage && (
//         <meta
//           property="og:image:alt"
//           content={productName}
//         />
//       )}

//       <meta
//         name="twitter:card"
//         content={
//           productImage
//             ? "summary_large_image"
//             : "summary"
//         }
//       />

//       <meta
//         name="twitter:title"
//         content={pageTitle}
//       />

//       <meta
//         name="twitter:description"
//         content={description}
//       />

//       {productImage && (
//         <meta
//           name="twitter:image"
//           content={productImage}
//         />
//       )}

//       {productImage && (
//         <meta
//           name="twitter:image:alt"
//           content={productName}
//         />
//       )}

//       <ProductDetailModel
//         key={id}
//         product={product}
//         onClose={() => navigate("/shop")}
//       />
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ProductDetailModel from "./ProductDetailModel";

const getPlainText = (value) => {
  if (typeof value !== "string") return "";

  const doc = new DOMParser().parseFromString(
    value,
    "text/html"
  );

  return (doc.body.textContent || "")
    .replace(/\s+/g, " ")
    .trim();
};

const getProductImage = (product) => {
  const firstVariantImage =
    product?.variants?.[0]?.images?.[0];

  const firstProductImage =
    product?.images?.[0];

  const image =
    (typeof firstVariantImage === "string"
      ? firstVariantImage
      : firstVariantImage?.url) ||
    (typeof firstProductImage === "string"
      ? firstProductImage
      : firstProductImage?.url);

  if (!image) return "";

  try {
    const url = new URL(image, "https://truee.in");

    return ["https:", "http:"].includes(url.protocol)
      ? url.href
      : "";
  } catch {
    return "";
  }
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const { data } = await axiosInstance.get(
          `/products/${encodeURIComponent(id)}`
        );

        if (cancelled) return;

        if (data?.success && data?.product) {
          setProduct(data.product);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        if (cancelled) return;

        setError(
          err.response?.status === 404
            ? "Product not found."
            : "Unable to load this product. Please refresh and try again."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <title>Loading Product | Truee</title>

        <p role="status">
          Loading product...
        </p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <title>Product Unavailable | Truee</title>

        <meta
          name="robots"
          content="noindex"
        />

        <h1 className="text-2xl font-bold">
          Product unavailable
        </h1>

        <p>
          {error || "Product not found."}
        </p>

        <Link
          to="/shop"
          className="underline"
        >
          Browse all products
        </Link>
      </main>
    );
  }

  const productName =
    getPlainText(product.name) || "Product";

  const productDescription =
    getPlainText(product.shortDescription) ||
    getPlainText(product.description);

  // Existing automatic SEO remains the fallback.
  const defaultDescription = productDescription
    ? `${productName} at Truee. ${productDescription}`.slice(
        0,
        160
      )
    : `Explore ${productName} at Truee. View product details, features, pricing and availability.`;

  // Optional SEO overrides returned by the product API.
  const pageTitle =
    getPlainText(product.seoTitle) ||
    `${productName} | Truee`;

  const description =
    getPlainText(product.seoDescription) ||
    defaultDescription;

  // Each product retains its own canonical URL.
  const canonicalUrl =
    `https://truee.in/product/${encodeURIComponent(id)}`;

  const productImage = getProductImage(product);

  return (
    <>
      <title>{pageTitle}</title>

      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content="Truee"
      />

      <meta
        property="og:title"
        content={pageTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      {productImage && (
        <meta
          property="og:image"
          content={productImage}
        />
      )}

      {productImage && (
        <meta
          property="og:image:alt"
          content={productName}
        />
      )}

      <meta
        name="twitter:card"
        content={
          productImage
            ? "summary_large_image"
            : "summary"
        }
      />

      <meta
        name="twitter:title"
        content={pageTitle}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      {productImage && (
        <meta
          name="twitter:image"
          content={productImage}
        />
      )}

      {productImage && (
        <meta
          name="twitter:image:alt"
          content={productName}
        />
      )}

      <ProductDetailModel
        key={id}
        product={product}
        onClose={() => navigate("/shop")}
      />
    </>
  );
}