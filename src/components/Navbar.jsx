import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const jump = id => e => { e.preventDefault(); scrollTo(id); closeMenu(); };

  return (
    <header className="header">
      <div className={`wrap nav${menuOpen ? " menu-open" : ""}`}>
        <Link className="brand" to="/" onClick={closeMenu}><span className="mark">СМ</span><span>Law Official</span></Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label={t(menuOpen ? "closeMenu" : "openMenu")}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span></span><span></span><span></span>
        </button>
        <div className="nav-content" id="main-navigation">
          <ul className="links">
            <li><Link className="link" to="/" onClick={closeMenu}>{t("home")}</Link></li>
            <li><a className="link" href="#/" onClick={jump("about")}>{t("about")}</a></li>
            <li><a className="link" href="#/" onClick={jump("services")}>{t("services")}</a></li>
          </ul>
        <div className="tools">
          <select className="sel" aria-label={t("language")} value={lang} onChange={e => { setLang(e.target.value); closeMenu(); }}>
            <option value="ru">RU</option>
            <option value="en">EN</option>
            <option value="ky">KY</option>
          </select>
          <button className="icon" aria-label={t("theme")} onClick={() => { toggleTheme(); closeMenu(); }}>{theme === "dark" ? "☀" : "☾"}</button>
          <button className="btn ghost" onClick={() => { navigate(session ? "/profile" : "/login"); closeMenu(); }}>
            {session ? t("profile") : t("login")}
          </button>
        </div>
        </div>
      </div>
    </header>
  );
}
