import Photo from "../Photo";
import { HERO_PHOTO } from "../../config";
import { useLang } from "../../context/LangContext";
import { useAvailability } from "../../context/AvailabilityContext";
import { useScrollTo } from "../../hooks/useScrollTo";

export default function Hero(){
  const { t } = useLang();
  const { available } = useAvailability();
  const scrollTo = useScrollTo();
  return (
    <section id="home" className="wrap hero">
      <div>
        <h1>Сыдыгалиева <em>Мээрим</em> Чатыркуловна</h1>
        <p>{t("heroText")}</p>
        <div className="actions">
          {available && <button className="btn" onClick={() => scrollTo("booking")}>{t("book")}</button>}
          <button className="btn ghost" onClick={() => scrollTo("services")}>{t("services")}</button>
        </div>
      </div>
      <Photo src={HERO_PHOTO} />
    </section>
  );
}
