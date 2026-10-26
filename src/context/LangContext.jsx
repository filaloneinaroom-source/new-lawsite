import { createContext, useContext, useEffect, useState } from "react";
import { TEXT } from "../i18n/translations";
import { store } from "../utils/storage";

const LangContext = createContext(null);
export const useLang = () => useContext(LangContext);

export function LangProvider({ children }){
  const [lang, setLang] = useState(() => store.get("lang", "ru"));
  useEffect(() => store.set("lang", lang), [lang]);
  const t = k => TEXT[lang][k] || TEXT.ru[k] || k;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}
