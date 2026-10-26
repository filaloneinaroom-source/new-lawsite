import { createContext, useContext, useEffect, useState } from "react";
import { TEXT } from "../i18n/translations";
import { store } from "../utils/storage";

const LangContext = createContext(null);
export const useLang = () => useContext(LangContext);

export function LangProvider({ children }){
  const [lang, setLang] = useState(() => {
    const saved = store.get("lang", "ru");
    return TEXT[saved] ? saved : "ru";
  });
  useEffect(() => store.set("lang", lang), [lang]);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = TEXT[lang].pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", TEXT[lang].pageDescription);
  }, [lang]);
  const t = k => TEXT[lang][k] || TEXT.ru[k] || k;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}
