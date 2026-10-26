import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLang } from "./LangContext";

const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }){
  const { t } = useLang();
  const [state, setState] = useState({ text: "", show: false });
  const timer = useRef();

  const toast = useCallback(text => {
    setState({ text, show: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState(s => ({ ...s, show: false })), 2800);
  }, []);

  // ошибки вне React (async, обработчики) тоже показываем уведомлением
  useEffect(() => {
    const onError = () => toast(t("wrong"));
    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  });

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={"toast" + (state.show ? " show" : "")} role="status">{state.text}</div>
    </ToastContext.Provider>
  );
}
