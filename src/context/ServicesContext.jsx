import { createContext, useContext, useState } from "react";
import { SEED_SERVICES } from "../data/services";
import { store } from "../utils/storage";

const ServicesContext = createContext(null);
export const useServices = () => useContext(ServicesContext);

export function ServicesProvider({ children }){
  const [services, setServices] = useState(() =>
    store.get("services", SEED_SERVICES.map((s, i) => ({ ...s, id: i + 1 }))));

  return <ServicesContext.Provider value={{ services }}>{children}</ServicesContext.Provider>;
}
