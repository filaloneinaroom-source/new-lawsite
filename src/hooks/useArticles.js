import { useEffect, useState } from "react";
import { API_URL, PER_PAGE } from "../config";

// Загрузка статей из API: статусы loading / ok / error, повтор через reload()
export function useArticles(page){
  const [state, setState] = useState({ status: "loading", items: [], loaded: false });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setState(s => ({ ...s, status: "loading" }));
    fetch(`${API_URL}?_page=${page}&_limit=${PER_PAGE}`, { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(items => setState({ status: "ok", items, loaded: true }))
      .catch(e => { if (e.name !== "AbortError") setState(s => ({ ...s, status: "error" })); });
    return () => ctrl.abort();
  }, [page, attempt]);

  return { ...state, reload: () => setAttempt(n => n + 1) };
}
