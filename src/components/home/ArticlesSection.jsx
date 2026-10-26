import { useState } from "react";
import SectionHead from "../SectionHead";
import { ARTICLES_TOTAL, PER_PAGE } from "../../config";
import { useLang } from "../../context/LangContext";
import { useArticles } from "../../hooks/useArticles";

const ArticleCard = ({ a }) => (
  <div className="card"><small>#{a.id}</small><h3>{a.title.slice(0, 48)}</h3><p>{a.body.slice(0, 90)}…</p></div>
);

export default function ArticlesSection(){
  const { t } = useLang();
  const [page, setPage] = useState(1);
  const { status, items, loaded, reload } = useArticles(page);
  const pages = ARTICLES_TOTAL / PER_PAGE;

  return (
    <section id="articles" className="wrap section">
      <SectionHead title={t("articles")} sub={t("articlesSub")} />
      <div className="grid">
        {status === "loading" && Array.from({ length: PER_PAGE }, (_, i) => <div key={i} className="skeleton" />)}
        {status === "error" && (
          <div className="error">{t("loadError")} <button className="linkbtn" onClick={reload}>{t("retry")}</button></div>
        )}
        {status === "ok" && items.map(a => <ArticleCard key={a.id} a={a} />)}
      </div>
      {loaded && (
        <div className="pager">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} className={"chip" + (i + 1 === page ? " on" : "")} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
        </div>
      )}
    </section>
  );
}
