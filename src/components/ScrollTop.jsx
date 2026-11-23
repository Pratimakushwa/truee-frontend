// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function ScrollToTop() {
//   // Ye hook track karta hai ki user kis page/URL par hai
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // Jaise hi URL change hoga (page badlega), page ekdum top (0,0) par chala jayega
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   // Ye component UI mein kuch render nahi karega, bas background mein kaam karega
//   return null; 
// }

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let targetId;

    try {
      targetId = decodeURIComponent(hash.slice(1));
    } catch {
      window.scrollTo(0, 0);
      return;
    }

    let observer;
    let frameId;
    let timeoutId;

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);

      if (!element) return false;

      element.scrollIntoView({
        behavior: "auto",
        block: "start",
      });

      return true;
    };

    frameId = window.requestAnimationFrame(() => {
      if (scrollToTarget()) return;

      // Article render hone ke baad us tak scroll karega.
      observer = new MutationObserver(() => {
        if (scrollToTarget()) {
          observer.disconnect();
          window.clearTimeout(timeoutId);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      timeoutId = window.setTimeout(() => {
        observer.disconnect();
      }, 5000);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [pathname, hash]);

  return null;
}