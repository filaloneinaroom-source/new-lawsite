// Обёртка над localStorage: значения хранятся как JSON
export const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(_){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(_){} },
  remove(k){ try{ localStorage.removeItem(k); }catch(_){} }
};

export const getBookings = () => store.get("bookings", []);
export const addBooking = b => store.set("bookings", [...getBookings(), b]);
