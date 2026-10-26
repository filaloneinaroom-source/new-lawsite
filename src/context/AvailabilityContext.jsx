import { createContext, useContext, useState } from "react";
import { store } from "../utils/storage";

const AvailabilityContext = createContext(null);
export const useAvailability = () => useContext(AvailabilityContext);

export function AvailabilityProvider({ children }){
  const [available, setAvailable] = useState(() => store.get("attorneyAvailable", true) !== false);
  const updateAvailability = value => {
    store.set("attorneyAvailable", value);
    setAvailable(value);
  };

  return (
    <AvailabilityContext.Provider value={{ available, setAvailable: updateAvailability }}>
      {children}
    </AvailabilityContext.Provider>
  );
}
