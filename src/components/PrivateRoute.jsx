import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";

// Защищённый маршрут: без токена — на /login, при неподходящей роли — «нет доступа»
export default function PrivateRoute({ role, children }){
  const { session } = useAuth();
  const { t } = useLang();
  if (!session) return <Navigate to="/login" replace />;
  if (role && session.role !== role)
    return <section className="wrap section"><div className="error">{t("forbidden")}</div></section>;
  return children;
}
