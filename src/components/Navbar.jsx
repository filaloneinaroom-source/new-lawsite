import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";
import { useScrollTo } from "../hooks/useScrollTo";

export default function Navbar(){
  const { t, lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { session } = useAuth();
  const navigate = useNavigate();
  const scrollTo = useScrollTo();
  const jump = id => e => { e.preventDefault(); scrollTo(id); };

  return (
    <header className="header">
      <div className="wrap nav">
        <Link className="brand" to="/"><span className="mark">СМ</span><span>Law Official</span></Link>
        <ul className="links">
          <li><Link className="link" to="/">{t("home")}</Link></li>
          <li><a className="link" href="#/" onClick={jump("about")}>{t("about")}</a></li>
          <li><a className="link" href="#/" onClick={jump("services")}>{t("services")}</a></li>
          {session?.role === "admin" && <li><Link className="link" to="/admin">{t("admin")}</Link></li>}
        </ul>
        <div className="tools">
          <select className="sel" aria-label="Language" value={lang} onChange={e => setLang(e.target.value)}>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
          <button className="icon" aria-label="Theme" onClick={toggleTheme}>{theme === "dark" ? "☀" : "☾"}</button>
          <button className="btn ghost" onClick={() => navigate(session ? "/profile" : "/login")}>
            {session ? t("profile") : t("login")}
          </button>
        </div>
      </div>
    </header>
  );
}
