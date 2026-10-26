import { useEffect, useState } from "react";
import SectionHead from "../SectionHead";
import { WHATSAPP } from "../../config";
import { useAvailability } from "../../context/AvailabilityContext";
import { useLang } from "../../context/LangContext";
import { getLocalizedService } from "../../i18n/translations";
import { useServices } from "../../context/ServicesContext";
import { useToast } from "../../context/ToastContext";
import { addBooking } from "../../utils/storage";

const EMPTY = { name: "", phone: "", service: "", type: "onsite", text: "" };
const Field = ({ label, children }) => <label>{label}{children}</label>;

// preset = { title } — услуга, выбранная в модальном окне
export default function BookingSection({ preset }){
  const { t, lang } = useLang();
  const { available } = useAvailability();
  const { services } = useServices();
  const toast = useToast();
  const [form, setForm] = useState(EMPTY);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  useEffect(() => { if (preset) setForm(f => ({ ...f, service: preset.title })); }, [preset]);

  const titles = services.map(s => s.title);
  const service = titles.includes(form.service) ? form.service : titles[0] || "";

  const submit = e => {
    e.preventDefault();
    const type = t(form.type);
    const localizedService = getLocalizedService(services.find(s => s.title === service), lang)?.title || service;
    addBooking({ name: form.name, phone: form.phone, service, type, text: form.text, date: new Date().toISOString() });
    const msg = `${t("greeting")}!\n${t("name")}: ${form.name}\n${t("phone")}: ${form.phone}\n${t("direction")}: ${localizedService}\n${t("format")}: ${type}\n${t("question")}: ${form.text || "—"}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    toast(t("sent"));
    setForm(EMPTY);
  };

  return (
    <section id="booking" className="wrap section">
      <SectionHead title={t("book")} />
      {!available
        ? <p className="error availability-notice" role="status">{t("temporarilyUnavailable")}</p>
        : <form className="form" onSubmit={submit}>
        <div className="fields">
          <Field label={t("name")}>
            <input name="name" required minLength={2} value={form.name} onChange={set("name")} />
          </Field>
          <Field label={t("phone")}>
            <input name="phone" type="tel" required placeholder="+996" value={form.phone} onChange={set("phone")} />
          </Field>
          <Field label={t("direction")}>
            <select name="service" value={service} onChange={set("service")}>
              {services.map(s => <option key={s.id} value={s.title}>{getLocalizedService(s, lang).title}</option>)}
            </select>
          </Field>
          <Field label={t("format")}>
            <select name="type" value={form.type} onChange={set("type")}>
              <option value="onsite">{t("onsite")}</option>
              <option value="online">{t("online")}</option>
            </select>
          </Field>
          <label className="full">{t("question")}
            <textarea name="text" rows={3} value={form.text} onChange={set("text")} />
          </label>
        </div>
        <button className="btn">{t("send")}</button>
      </form>
      }
    </section>
  );
}
