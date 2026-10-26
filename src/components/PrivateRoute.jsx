import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Защищённый маршрут: без токена — на /login, при неподходящей роли — «нет доступа»
export default function PrivateRoute({ role, children }){
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  if (role && session.role !== role) return <Navigate to="/" replace />;
  return children;
}
