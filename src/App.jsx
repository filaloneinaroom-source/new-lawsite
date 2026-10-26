import { HashRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ScrollManager from "./components/ScrollManager";
import { AuthProvider } from "./context/AuthContext";
import { LangProvider } from "./context/LangContext";
import { ServicesProvider } from "./context/ServicesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

export default function App(){
  return (
    <ThemeProvider>
      <LangProvider>
        <ToastProvider>
          <AuthProvider>
            <ServicesProvider>
              <HashRouter>
                <ScrollManager />
                <Navbar />
                <main>
                  <ErrorBoundary>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<AuthPage key="login" mode="login" />} />
                      <Route path="/register" element={<AuthPage key="register" mode="register" />} />
                      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                      <Route path="/admin" element={<PrivateRoute role="admin"><AdminPage /></PrivateRoute>} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ErrorBoundary>
                </main>
                <Footer />
              </HashRouter>
            </ServicesProvider>
          </AuthProvider>
        </ToastProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
