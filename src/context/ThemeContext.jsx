import { createContext, useContext, useLayoutEffect, useState } from "react";
import { store } from "../utils/storage";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }){
  const [theme, setTheme] = useState(() =>
    store.get("theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  // тема применяется через data-theme на <html>, переменные описаны в styles.css
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    store.set("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
