import { useEffect, useRef } from "react";

// Модальное окно на нативном <dialog>: закрытие по ×, по клику на фон и по Esc
export default function Modal({ open, onClose, children }){
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog ref={ref} onClose={onClose} onClick={e => e.target === e.currentTarget && onClose()}>
      <button className="x" aria-label="Закрыть" onClick={onClose}>×</button>
      <div>{open && children}</div>
    </dialog>
  );
}
