import { useNavigate } from "react-router-dom";
import SectionHead from "../components/SectionHead";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";

export default function Profile(){
  const { t } = useLang();
  const { session, token, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="wrap section narrow">
      <SectionHead title={t("profile")} />
      <ul className="facts">
        {session.name && <li><span>{t("fullName")}</span>{session.name}</li>}
        <li><span>{t("emailLabel")}</span>{session.sub}</li>
        <li><span>{t("role")}</span>{t(session.role === "admin" ? "adminRole" : "userRole")}</li>
        <li><span>{t("token")}</span>{new Date(session.exp).toLocaleTimeString()}</li>
      </ul>
      <code>{token}</code><br />
      <button className="btn ghost" onClick={() => { logout(); navigate("/"); }}>{t("logout")}</button>
    </section>
  );
}
