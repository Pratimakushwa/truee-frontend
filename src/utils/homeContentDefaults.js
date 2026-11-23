export const HOME_CONTENT_DEFAULTS = {
  seo: {
    title: "Premium Speakers & Audio Products | Truee",
    description:
      "Explore premium speakers at Truee. Browse speaker models, compare features and prices, and discover headphones, home theater and lifestyle products.",
    canonicalUrl: "https://truee.in/",
    noIndex: false,
    socialTitle: "",
    socialDescription: "",
    socialImage: "",
    socialImageAlt: "",
  },

  content: {
    mainHeading: "Explore Premium Speakers at Truee",
    mainDescription:
      "Find a speaker for your home, workspace or listening on the go. Explore product specifications, connectivity options and prices to choose a model that suits your needs. Discover headphones, home theater systems, smartwatches, and beauty and wellness products alongside our speaker collection.",

    journalEyebrow: "The Truee Journal",
    journalHeading: "Ideas Worth Exploring",
    journalDescription:
      "Discover stories on learning, technology and everyday inspiration.",
    journalButtonText: "View all articles",
    articleButtonText: "Read article",

    heroSlides: [
      {
        id: 1,
        image: "/img4.jpg",
        title: "MONITOR III A.N.C.",
        alt: "Marshall Monitor III A.N.C. headphones",
        subtitle:
          "Iconic sound. Active Noise Cancellation. Up to 70 hours of wireless playtime.",
        shopButtonText: "Shop Now",
        browseButtonText: "Browse Products",
      },
      {
        id: 2,
        image: "/B_Content_Mode_USE-C_3.webp",
        title: "MARSHALL MODE C",
        alt: "Marshall Mode USB-C earphones",
        subtitle: "USB-C connectivity. Pure analog soul.",
        shopButtonText: "Shop Now",
        browseButtonText: "Browse Products",
      },
      {
        id: 3,
        image:
          "/marshall_acton-III_midnight-blue_lifestyle-product_1.jpg",
        title: "ACTON III",
        alt: "Marshall Acton III speaker in midnight blue",
        subtitle: "Compact footprint. Massive soundscape.",
        shopButtonText: "Shop Now",
        browseButtonText: "Browse Products",
      },
      {
        id: 4,
        image: "/eRAfpPgkCXYDy5vrBRPXEE.png",
        title: "SONOS MOVE II",
        alt: "Sonos Move portable speaker",
        subtitle: "Portable brilliance. Smart connectivity.",
        shopButtonText: "Shop Now",
        browseButtonText: "Browse Products",
      },
      {
        id: 5,
        image:
          "https://www.robbreport.com.sg/wp-content/uploads/2025/07/Visual_Mania_150-Years_1_16-9.jpg",
        title: "DEVIALET MANIA",
        alt: "Devialet Mania portable speaker",
        subtitle: "Metamorphic sound. Adapts to your space.",
        shopButtonText: "Shop Now",
        browseButtonText: "Browse Products",
      },
    ],
  },
};

// Fill missing saved fields with the existing website content.
export function mergeHomeContent(saved) {
  const defaults = HOME_CONTENT_DEFAULTS;

  return {
    seo: {
      ...defaults.seo,
      ...(saved?.seo || {}),
    },
    content: {
      ...defaults.content,
      ...(saved?.content || {}),
      heroSlides: defaults.content.heroSlides.map((slide) => ({
        ...slide,
        ...(saved?.content?.heroSlides?.find(
          (item) => item.id === slide.id
        ) || {}),
      })),
    },
  };
}