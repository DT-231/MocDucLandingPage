import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 📌 Custom hook: Tự động scroll lên top khi pathname thay đổi
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
};
