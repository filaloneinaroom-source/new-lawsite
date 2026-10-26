import { useLang } from "../context/LangContext";

export default function NotFound(){
  const { t } = useLang();
  return <section className="wrap section"><div className="error">{t("notFound")}</div></section>;
}
