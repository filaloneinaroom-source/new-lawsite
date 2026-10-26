import { useLang } from "../../context/LangContext";

export default function TrustBar(){
  const { t } = useLang();
  return (
    <div className="trust">
      <ul className="wrap">
        <li>{t("confidentiality")}</li>
        <li>{t("honestAssessment")}</li>
        <li>{t("plainLanguage")}</li>
        <li>{t("onsite")} / {t("online")}</li>
      </ul>
    </div>
  );
}
