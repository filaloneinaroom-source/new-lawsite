import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Плавная прокрутка к секции главной. С другой страницы — сначала переход на "/".
export function useScrollTo(){
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return useCallback(id => {
    if (pathname !== "/") navigate("/", { state: { scrollTo: id } });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, [pathname, navigate]);
}
