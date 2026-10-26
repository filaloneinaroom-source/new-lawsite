import { useState } from "react";
import Modal from "../components/Modal";
import SectionHead from "../components/SectionHead";
import { useLang } from "../context/LangContext";
import { useServices } from "../context/ServicesContext";
import { useToast } from "../context/ToastContext";
import { getUsers } from "../utils/auth";
import { getBookings } from "../utils/storage";

const StatCard = ({ n, label }) => <div className="stat"><b>{n}</b><span>{label}</span></div>;

// столбчатая диаграмма: число заявок по направлениям
function BarChart({ bookings }){
  const { t } = useLang();
  const count = {};
  bookings.forEach(b => { count[b.service] = (count[b.service] || 0) + 1; });
  const rows = Object.entries(count), max = Math.max(1, ...rows.map(r => r[1]));
  if (!rows.length) return <p className="hint">{t("noData")}</p>;
  return rows.map(([name, n]) => (
    <div className="bar" key={name}><span>{name}</span><i style={{ width: `${n / max * 100}%` }}></i><b>{n}</b></div>
  ));
}

function ServiceForm({ service, onSave }){
  const { t } = useLang();
  const { id = "", cat = "", title = "", short = "", text = "", points = [] } = service;
  const submit = e => { e.preventDefault(); onSave(Object.fromEntries(new FormData(e.currentTarget))); };
  return (
    <>
      <h3>{id ? t("edit") : t("add")}</h3>
      <form className="stack" onSubmit={submit}>
        <input type="hidden" name="id" value={id} />
        <input name="cat" required placeholder="Категория" defaultValue={cat} />
        <input name="title" required placeholder="Название" defaultValue={title} />
        <input name="short" placeholder="Кратко" defaultValue={short} />
        <textarea name="text" rows={3} placeholder="Описание" defaultValue={text}></textarea>
        <input name="points" placeholder="Пункты через запятую" defaultValue={points.join(", ")} />
        <button className="btn">{t("save")}</button>
      </form>
    </>
  );
}

export default function AdminPage(){
  const { t } = useLang();
  const { services, saveService, removeService } = useServices();
  const toast = useToast();
  const [editing, setEditing] = useState(null);   // null — закрыто, {} — новая, объект — правка
  const bookings = getBookings();

  const save = d => { saveService(d); setEditing(null); toast(t("saved")); };

  return (
    <section className="wrap section">
      <SectionHead title={t("admin")} />
      <div className="stats">
        <StatCard n={services.length} label={t("services")} />
        <StatCard n={bookings.length} label={t("bookings")} />
        <StatCard n={getUsers().length} label={t("users")} />
      </div>
      <h3>{t("perService")}</h3>
      <BarChart bookings={bookings} />
      <div className="tools-row"><h3>{t("services")}</h3><button className="btn" onClick={() => setEditing({})}>{t("add")}</button></div>
      <table>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td>{s.title}</td><td>{s.cat}</td>
              <td>
                <button className="linkbtn" onClick={() => setEditing(s)}>{t("edit")}</button>
                <button className="linkbtn" onClick={() => confirm("?") && removeService(s.id)}>{t("del")}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={!!editing} onClose={() => setEditing(null)}>
        {editing && <ServiceForm key={editing.id || "new"} service={editing} onSave={save} />}
      </Modal>
    </section>
  );
}
