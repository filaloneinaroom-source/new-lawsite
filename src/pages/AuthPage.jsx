import { useNavigate } from "react-router-dom";
import SectionHead from "../components/SectionHead";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { useToast } from "../context/ToastContext";

// Одна страница для входа (mode="login") и регистрации (mode="register")
export default function AuthPage({ mode }){
  const { t } = useLang();
  const { login, register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const isLogin = mode === "login";

  const submit = e => {
    e.preventDefault();
    const { email, pass } = Object.fromEntries(new FormData(e.currentTarget));
    const ok = isLogin ? login(email, pass) : register(email, pass);
    if (ok) navigate("/profile"); else toast(t(isLogin ? "badLogin" : "exists"));
  };

  return (
    <section className="wrap section narrow">
      <SectionHead title={isLogin ? t("login") : t("register")} />
      <form className="stack" onSubmit={submit}>
        <input name="email" type="email" required placeholder={t("email")} />
        <input name="pass" type="password" required minLength={4} placeholder={t("password")} />
        <button className="btn">{isLogin ? t("login") : t("register")}</button>
      </form>
      <p className="hint">
        {isLogin ? t("noAccount") : t("haveAccount")}{" "}
        <button type="button" className="linkbtn" onClick={() => navigate(isLogin ? "/register" : "/login")}>
          {isLogin ? t("register") : t("login")}
        </button>
      </p>
      {isLogin && <p className="hint">Demo admin: admin@law.kg / admin123</p>}
    </section>
  );
}
