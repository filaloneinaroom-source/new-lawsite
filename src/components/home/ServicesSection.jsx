import { useState } from "react";
import Modal from "../Modal";
import SectionHead from "../SectionHead";
import { useAvailability } from "../../context/AvailabilityContext";
import { useLang } from "../../context/LangContext";
import { useServices } from "../../context/ServicesContext";
import { getLocalizedService } from "../../i18n/translations";

function ServiceCard({ s, localized, onOpen }){
  const { t } = useLang();
  return (
    <button className="card" onClick={() => onOpen(s)}>
      <small>{localized.cat}</small><h3>{localized.title}</h3><p>{localized.short}</p><b>{t("details")}</b>
    </button>
  );
}

// onBook(title) — «Запись на консультацию» из модалки: прокрутка к форме и выбор услуги
export default function ServicesSection({ onBook }){
  const { t, lang } = useLang();
  const { available } = useAvailability();
  const { services } = useServices();
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const cats = ["all", ...new Set(services.map(s => s.cat))];
  const localizedSelected = selected && getLocalizedService(selected, lang);

  return (
    <section id="services" className="wrap section">
      <SectionHead title={t("services")} sub={t("servicesSub")} />
      <div className="chips">
        {cats.map(c => (
          <button key={c} className={"chip" + (c === category ? " on" : "")} onClick={() => setCategory(c)}>
            {c === "all" ? t("all") : getLocalizedService(services.find(s => s.cat === c), lang).cat}
          </button>
        ))}
      </div>
      <div className="grid">
        {services.filter(s => category === "all" || s.cat === category)
          .map(s => <ServiceCard key={s.id} s={s} localized={getLocalizedService(s, lang)} onOpen={setSelected} />)}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {localizedSelected && <>
          <small style={{ color: "var(--accent)" }}>{localizedSelected.cat}</small>
          <h3>{localizedSelected.title}</h3>
          <p>{localizedSelected.text}</p>
          <ul>{localizedSelected.points.map(p => <li key={p}>{p}</li>)}</ul>
          {available && (
            <button className="btn gold" onClick={() => { const title = selected.title; setSelected(null); onBook(title); }}>
              {t("book")}
            </button>
          )}
        </>}
      </Modal>
    </section>
  );
}
