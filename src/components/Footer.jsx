import { useScrollTo } from "../hooks/useScrollTo";
import { useLang } from "../context/LangContext";

export default function Footer(){
  const scrollTo = useScrollTo();
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap">
        <span>© 2026 Сыдыгалиева М. Ч., {t("attorney")}</span>
        <a href="#/" onClick={e => { e.preventDefault(); scrollTo("home"); }}>↑</a>
      </div>
    </footer>
  );
}
