import { useState } from "react";
import Modal from "../Modal";
import SectionHead from "../SectionHead";
import { useLang } from "../../context/LangContext";
import { useServices } from "../../context/ServicesContext";

function ServiceCard({ s, onOpen }){
  const { t } = useLang();
  return (
    <button className="card" onClick={() => onOpen(s)}>
      <small>{s.cat}</small><h3>{s.title}</h3><p>{s.short}</p><b>{t("details")}</b>
    </button>
  );
}

// onBook(title) — «Запись на консультацию» из модалки: прокрутка к форме и выбор услуги
export default function ServicesSection({ onBook }){
  const { t } = useLang();
  const { services } = useServices();
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const cats = ["all", ...new Set(services.map(s => s.cat))];

  return (
    <section id="services" className="wrap section">
      <SectionHead title={t("services")} sub={t("servicesSub")} />
      <div className="chips">
        {cats.map(c => (
          <button key={c} className={"chip" + (c === category ? " on" : "")} onClick={() => setCategory(c)}>
            {c === "all" ? t("all") : c}
          </button>
        ))}
      </div>
      <div className="grid">
        {services.filter(s => category === "all" || s.cat === category)
          .map(s => <ServiceCard key={s.id} s={s} onOpen={setSelected} />)}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && <>
          <small style={{ color: "var(--accent)" }}>{selected.cat}</small>
          <h3>{selected.title}</h3>
          <p>{selected.text}</p>
          <ul>{selected.points.map(p => <li key={p}>{p}</li>)}</ul>
          <button className="btn gold" onClick={() => { const title = selected.title; setSelected(null); onBook(title); }}>
            {t("book")}
          </button>
        </>}
      </Modal>
    </section>
  );
}
