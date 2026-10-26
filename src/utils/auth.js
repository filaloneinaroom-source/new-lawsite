import { SECRET } from "../config";
import { store } from "./storage";

export const ADMIN_EMAIL = "sydygalievameerim48@gmail.com";
export const isAdminEmail = email => email?.trim().toLowerCase() === ADMIN_EMAIL;

/* Демо JWT: header.payload.signature. Подпись здесь учебная, настоящую подпись делает сервер. */
const hash = s => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return h.toString(36); };
const enc = o => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/=+$/, "");
const dec = s => JSON.parse(decodeURIComponent(escape(atob(s))));

export function signToken(u){
  const h = enc({alg:"HS256", typ:"JWT"}), p = enc({sub:u.email, name:u.name, role:u.role, exp:Date.now() + 3600e3});
  return `${h}.${p}.${hash(h + "." + p + SECRET)}`;
}

// вернёт данные токена или null (неверная подпись / истёк срок)
export function parseToken(tk){
  if (!tk) return null;
  try{
    const [h, p, s] = tk.split(".");
    if (s !== hash(h + "." + p + SECRET)) return null;
    const d = dec(p); return d.exp > Date.now() ? d : null;
  }catch(_){ return null; }
}

export const getUsers = () => store.get("users", [{email:"admin@law.kg", pass:"admin123", role:"admin"}]);
export const saveUsers = list => store.set("users", list);
