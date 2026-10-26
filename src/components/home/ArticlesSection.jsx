import { useState } from "react";
import SectionHead from "../SectionHead";
import { ARTICLES_TOTAL, PER_PAGE } from "../../config";
import { useLang } from "../../context/LangContext";
import { useArticles } from "../../hooks/useArticles";
import { getLocalizedArticle } from "../../i18n/articleTranslations";

const ArticleCard = ({ article, number, selected }) => (
  <div id={`article-${number}`} className={`card article-card${selected ? " selected" : ""}`}>
    <small>#{number}</small><h3>{article.title.slice(0, 48)}</h3><p>{article.body.slice(0, 90)}…</p>
  </div>
);

export default function ArticlesSection(){
  const { t, lang } = useLang();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { status, items, loaded, reload } = useArticles(1);

  const selectArticle = number => {
    setSelectedArticle(number);
    document.getElementById(`article-${number}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

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
            number={index + 1}
            selected={selectedArticle === index + 1}
          />
        ))}
      </div>
      {loaded && (
        <div className="pager" aria-label={t("articlePages")}>
          {Array.from({ length: ARTICLES_TOTAL }, (_, i) => (
            <button
              key={i}
              type="button"
              className={"chip" + (i + 1 === selectedArticle ? " on" : "")}
              aria-pressed={i + 1 === selectedArticle}
              onClick={() => selectArticle(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
