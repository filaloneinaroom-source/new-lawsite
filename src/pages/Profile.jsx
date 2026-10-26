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
        <li><span>Email</span>{session.sub}</li>
        <li><span>Role</span>{session.role}</li>
        <li><span>JWT</span>{new Date(session.exp).toLocaleTimeString()}</li>
      </ul>
      <code>{token}</code><br />
      <button className="btn ghost" onClick={() => { logout(); navigate("/"); }}>{t("logout")}</button>
    </section>
  );
}
