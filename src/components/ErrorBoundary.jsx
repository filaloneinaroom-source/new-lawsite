import { Component } from "react";
import { useLang } from "../context/LangContext";

function Fallback(){
  const { t } = useLang();
  return (
    <section className="wrap section">
      <div className="error">
        {t("wrong")} <button className="linkbtn" onClick={() => location.reload()}>{t("retry")}</button>
      </div>
    </section>
  );
}

// Error Boundary: ошибка рендера одной страницы не роняет всё приложение
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError(){ return { failed: true }; }
  componentDidCatch(err){ console.error(err); }
  render(){ return this.state.failed ? <Fallback /> : this.props.children; }
}
