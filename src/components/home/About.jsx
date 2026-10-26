import Photo from "../Photo";
import { useLang } from "../../context/LangContext";
import { useScrollTo } from "../../hooks/useScrollTo";

export default function About(){
  const { t } = useLang();
  const scrollTo = useScrollTo();
  return (
    <section id="about" className="about section">
      <div className="wrap">
        <Photo src="/assets/lawphoto.jpg" />
        <div>
          <h2>{t("about")}</h2>
          <p>{t("aboutText")}</p>
          <p className="about-slogan">{t("aboutSlogan")}</p>
          <ul className="facts">
            <li><span>{t("status")}</span>{t("attorney")}</li>
            <li><span>{t("experience")}</span>{t("experienceYears")}</li>
            <li><span>{t("format")}</span>{t("onsite")} / {t("online")}</li>
          </ul>
          <button className="btn gold" onClick={() => scrollTo("booking")}>{t("book")}</button>
        </div>
      </div>
    </section>
  );
}
