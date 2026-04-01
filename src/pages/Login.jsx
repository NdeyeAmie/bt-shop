import React, { useState } from "react";
import "../composants/Auth.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Header from "../composants/Header";
import Footer from "../composants/Footer";
import Register from "./Register";
   import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "", api: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis.";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Le nom doit contenir au moins 3 caractères.";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
      username: formData.username.trim(),
      password: formData.password,
    });

    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    if (formData.remember) {
      localStorage.setItem("remember_user", formData.username);
    } else {
      localStorage.removeItem("remember_user");
    }

    toast.success("Connexion réussie ! Bienvenue ");
    navigate("/");

  } catch (err) {
    if (err.response?.data?.error) {
      toast.error(err.response.data.error);
    } else if (err.response?.status === 403) {
      toast.error("Compte désactivé. Contactez l'administrateur.");
    } else {
      toast.error("Une erreur est survenue. Réessayez.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Header />

      <div className="auth-page">
        <div className="auth-right">
          <div className="auth-containerlogin">
            <div className="flex items-center h-10 w-40 mx-auto">
              <img src={logo} alt="AK Parfumerie" />
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">Connexion</h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              Bienvenue ! Connectez-vous à votre compte.
            </p>

            {/* Erreur API */}
            {errors.api && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm text-center flex items-center justify-center gap-2">
                <AlertCircle size={16} />
                {errors.api}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Nom d'utilisateur */}
              <div className="form-group">
                <label>Nom d'utilisateur</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className={errors.username ? "border-red-500 bg-red-50" : ""}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Mot de passe */}
              <div className="form-group">
                <label>Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pr-10 ${errors.password ? "border-red-500 bg-red-50" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="form-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <span>Se souvenir de moi</span>
                </label>
                <a href="#forgot" className="link">
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Bouton Connexion */}
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </button>

              {/* Séparateur */}
              <div className="flex items-center gap-3 my-2">
                <hr className="flex-1 border-gray-200" />
                <span className="text-gray-400 text-sm">ou</span>
                <hr className="flex-1 border-gray-200" />
              </div>

              {/* Bouton Google */}
              <button type="button" className="btn-google">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path
                    fill="#4285F4"
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                  />
                  <path
                    fill="#34A853"
                    d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"
                  />
                  <path
                    fill="#EA4335"
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  />
                </svg>
                Connecte-toi avec Google
              </button>
            </form>

            <p className="auth-footer">
              Pas encore membre ?{" "}
              <button
                onClick={() => setShowRegisterModal(true)}
                className="link-bold cursor-pointer hover:underline"
              >
                Inscris-toi ici
              </button>
            </p>
          </div>
        </div>
      </div>

      <Register
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => setShowRegisterModal(false)}
      />

      <Footer />
    </>
  );
}

export default Login;
