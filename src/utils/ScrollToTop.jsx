import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, state]);

  return null;
}

export default ScrollToTop;
