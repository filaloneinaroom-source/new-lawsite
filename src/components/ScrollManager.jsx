import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// При смене страницы: к нужной секции (если запрошена) или наверх
export default function ScrollManager(){
  const { key, state } = useLocation();
  useEffect(() => {
    if (state?.scrollTo) document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }, [key]);
  return null;
}
