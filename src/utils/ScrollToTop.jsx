import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);

      if (element) {
        gsap.to(window, {
          scrollTo: { y: element, offsetY: 100 },
          duration: 1,
          ease: "power2.out",
          onComplete: () => ScrollTrigger.refresh(),
        });
      }
    } else {
      gsap.to(window, {
        scrollTo: 0,
        duration: 0.5,
      });
    }
  }, [pathname, state]);

  return null;
}

export default ScrollToTop;