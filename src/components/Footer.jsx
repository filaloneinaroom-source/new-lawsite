import { useScrollTo } from "../hooks/useScrollTo";
import { useLang } from "../context/LangContext";

export default function Footer(){
  const scrollTo = useScrollTo();
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap">
        <span>© 2026 Сыдыгалиева М. Ч., {t("attorney")}</span>
        <div className="footer-details">
          <div className="footer-column">
            <strong>{t("contacts")}</strong>
            <a href="tel:+996508200216">+996 508 200 216</a>
          </div>
          <div className="footer-column">
            <strong>{t("locations")}</strong>
            <span>Бишкек</span>
            <span>Ош</span>
          </div>
        </div>
        <nav className="footer-links" aria-label={t("contacts")}>
          <a href="https://www.instagram.com/advokat_sydygalieva?rpxt=YmcxbHlrcmhndDdv&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle className="icon-fill" cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&to=sydygalievameerim48%40gmail.com" target="_blank" rel="noreferrer" aria-label="Email" title="sydygalievameerim48@gmail.com">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </a>
        </nav>
        <a className="footer-back" href="#/" onClick={e => { e.preventDefault(); scrollTo("home"); }}>{t("back")}</a>
      </div>
    </footer>
  );
}
