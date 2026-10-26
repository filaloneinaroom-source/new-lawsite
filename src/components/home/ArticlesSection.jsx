import { useState } from "react";
import SectionHead from "../SectionHead";
import { ARTICLES_TOTAL, PER_PAGE } from "../../config";
import { useLang } from "../../context/LangContext";
import { useArticles } from "../../hooks/useArticles";
import { getLocalizedArticle } from "../../i18n/articleTranslations";

const ArticleCard = ({ article, number }) => (
  <div className="card"><small>#{number}</small><h3>{article.title.slice(0, 48)}</h3><p>{article.body.slice(0, 90)}…</p></div>
);

export default function ArticlesSection(){
  const { t, lang } = useLang();
  const [page, setPage] = useState(1);
  const { status, items, loaded, reload } = useArticles(page);
  const pages = Math.ceil(ARTICLES_TOTAL / PER_PAGE);

  return (
    <section id="articles" className="wrap section">
      <SectionHead title={t("articles")} sub={t("articlesSub")} />
      <div className="grid">
        {status === "loading" && Array.from({ length: PER_PAGE }, (_, i) => <div key={i} className="skeleton" />)}
        {status === "error" && (
          <div className="error">{t("loadError")} <button className="linkbtn" onClick={reload}>{t("retry")}</button></div>
        )}
        {status === "ok" && items.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={getLocalizedArticle(article, lang)}
            number={(page - 1) * PER_PAGE + index + 1}
          />
        ))}
      </div>
      {loaded && (
        <div className="pager" aria-label={t("articlePages")}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={"chip" + (i + 1 === page ? " on" : "")}
              aria-current={i + 1 === page ? "page" : undefined}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
