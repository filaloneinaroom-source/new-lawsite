import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { store } from "../utils/storage";
import { getUsers, isAdminEmail, parseToken, saveUsers, signToken } from "../utils/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => store.get("token", null));
  const [, refresh] = useReducer(n => n + 1, 0);
  const parsedSession = parseToken(token);
  const session = parsedSession && isAdminEmail(parsedSession.sub)
    ? { ...parsedSession, role: "admin" }
    : parsedSession;

  // когда срок токена истекает — перерисовываем, session станет null
  useEffect(() => {
    if (!session) return;
    const id = setTimeout(refresh, Math.max(0, session.exp - Date.now()));
    return () => clearTimeout(id);
  }, [session?.exp]);

  const startSession = u => { const tk = signToken(u); store.set("token", tk); setToken(tk); };

  const login = (email, pass) => {
    const normalizedEmail = email.trim().toLowerCase();
    const list = getUsers();
    const existingUser = list.find(x => x.email.trim().toLowerCase() === normalizedEmail && x.pass === pass);
    if (!existingUser) return false;
    const u = { ...existingUser, email: normalizedEmail, role: isAdminEmail(normalizedEmail) ? "admin" : existingUser.role };
    if (u.role !== existingUser.role || u.email !== existingUser.email) {
      saveUsers(list.map(user => user === existingUser ? u : user));
    }
    startSession(u); return true;
  };
  const register = (name, email, pass) => {
    const normalizedEmail = email.trim().toLowerCase();
    const list = getUsers(); if (list.some(x => x.email.trim().toLowerCase() === normalizedEmail)) return false;
    const u = { name, email: normalizedEmail, pass, role: isAdminEmail(normalizedEmail) ? "admin" : "user" };
    saveUsers([...list, u]); startSession(u); return true;
  };
  const logout = () => { store.remove("token"); setToken(null); };

  return <AuthContext.Provider value={{ token, session, login, register, logout }}>{children}</AuthContext.Provider>;
}
