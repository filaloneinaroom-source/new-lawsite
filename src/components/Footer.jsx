import { useScrollTo } from "../hooks/useScrollTo";

export default function Footer(){
  const scrollTo = useScrollTo();
  return (
    <footer>
      <div className="wrap">
        <span>© 2026 Сыдыгалиева М. Ч., адвокат</span>
        <a href="#/" onClick={e => { e.preventDefault(); scrollTo("home"); }}>↑</a>
      </div>
    </footer>
  );
}
