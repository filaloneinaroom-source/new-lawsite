import { createContext, useContext, useState } from "react";
import { SEED_SERVICES } from "../data/services";
import { store } from "../utils/storage";

const ServicesContext = createContext(null);
export const useServices = () => useContext(ServicesContext);

export function ServicesProvider({ children }){
  const [services, setServices] = useState(() =>
    store.get("services", SEED_SERVICES.map((s, i) => ({ ...s, id: i + 1 }))));

  const persist = list => { setServices(list); store.set("services", list); };

  // d — данные формы: points приходит строкой через запятую
  const saveService = d => {
    const item = { ...d, points: d.points.split(",").map(p => p.trim()).filter(Boolean) };
    if (d.id) persist(services.map(s => (s.id == d.id ? { ...s, ...item, id: +d.id } : s)));
    else persist([...services, { ...item, id: Date.now() }]);
  };
  const removeService = id => persist(services.filter(s => s.id != id));

  return <ServicesContext.Provider value={{ services, saveService, removeService }}>{children}</ServicesContext.Provider>;
}
