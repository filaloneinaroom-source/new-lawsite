import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { store } from "../utils/storage";
import { getUsers, parseToken, saveUsers, signToken } from "../utils/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => store.get("token", null));
  const [, refresh] = useReducer(n => n + 1, 0);
  const session = parseToken(token);            // данные токена или null

  // когда срок токена истекает — перерисовываем, session станет null
  useEffect(() => {
    if (!session) return;
    const id = setTimeout(refresh, Math.max(0, session.exp - Date.now()));
    return () => clearTimeout(id);
  }, [session?.exp]);

  const startSession = u => { const tk = signToken(u); store.set("token", tk); setToken(tk); };

  const login = (email, pass) => {
    const u = getUsers().find(x => x.email === email && x.pass === pass);
    if (!u) return false;
    startSession(u); return true;
  };
  const register = (email, pass) => {
    const list = getUsers(); if (list.some(x => x.email === email)) return false;
    const u = { email, pass, role: "user" };
    saveUsers([...list, u]); startSession(u); return true;
  };
  const logout = () => { store.remove("token"); setToken(null); };

  return <AuthContext.Provider value={{ token, session, login, register, logout }}>{children}</AuthContext.Provider>;
}
