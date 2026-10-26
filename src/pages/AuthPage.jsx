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
    const form = Object.fromEntries(new FormData(e.currentTarget));
    if (!isLogin && form.pass !== form.confirmPass) {
      toast(t("passwordMismatch"));
      return;
    }
    const ok = isLogin
      ? login(form.email, form.pass)
      : register(form.name.trim(), form.email, form.pass);
    if (ok) navigate("/profile");
    else toast(t(isLogin ? "badLogin" : "exists"));
  };

  return (
    <section className="wrap section narrow">
      <SectionHead title={isLogin ? t("login") : t("register")} />
      <form className="stack" onSubmit={submit}>
        {!isLogin && <input name="name" type="text" autoComplete="name" required minLength={2} placeholder={t("fullName")} />}
        <input name="email" type="email" required placeholder={t("email")} />
        <input name="pass" type="password" autoComplete={isLogin ? "current-password" : "new-password"} required minLength={4} placeholder={t("password")} />
        {!isLogin && <input name="confirmPass" type="password" autoComplete="new-password" required minLength={4} placeholder={t("confirmPassword")} />}
        <button className="btn">{isLogin ? t("login") : t("register")}</button>
      </form>
      {isLogin && <p className="hint">{t("googleSuggestion")}</p>}
      <p className="hint">
        {isLogin ? t("noAccount") : t("haveAccount")}{" "}
        <button type="button" className="linkbtn" onClick={() => navigate(isLogin ? "/register" : "/login")}>
          {isLogin ? t("register") : t("login")}
        </button>
      </p>
      {isLogin && <p className="hint">{t("demoAdmin")}: admin@law.kg / admin123</p>}
    </section>
  );
}
