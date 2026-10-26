import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordField = (name, value, autoComplete, visible, setVisible) => (
    <div className="password-field">
      <input
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        required
        minLength={4}
        placeholder={t(value)}
      />
      <button
        type="button"
        className="password-toggle"
        aria-label={t(visible ? "hidePassword" : "showPassword")}
        title={t(visible ? "hidePassword" : "showPassword")}
        onClick={() => setVisible(current => !current)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
          {visible && <path d="m4 4 16 16" />}
        </svg>
      </button>
    </div>
  );

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
        {passwordField("pass", "password", isLogin ? "current-password" : "new-password", showPassword, setShowPassword)}
        {!isLogin && passwordField("confirmPass", "confirmPassword", "new-password", showConfirmPassword, setShowConfirmPassword)}
        <button className="btn">{isLogin ? t("login") : t("register")}</button>
      </form>
      {isLogin && <p className="hint">{t("googleSuggestion")}</p>}
      <p className="hint">
        {isLogin ? t("noAccount") : t("haveAccount")}{" "}
        <button type="button" className="linkbtn" onClick={() => navigate(isLogin ? "/register" : "/login")}>
          {isLogin ? t("register") : t("login")}
        </button>
      </p>
    </section>
  );
}
