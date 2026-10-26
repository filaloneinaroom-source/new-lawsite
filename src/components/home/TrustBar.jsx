import { useLang } from "../../context/LangContext";

export default function TrustBar(){
  const { t } = useLang();
  return (
    <div className="trust">
      <ul className="wrap">
        <li>Конфиденциальность</li>
        <li>Честная оценка перспектив</li>
        <li>Понятный язык</li>
        <li>{t("onsite")} / {t("online")}</li>
      </ul>
    </div>
  );
}
