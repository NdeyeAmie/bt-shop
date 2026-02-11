import React, { useState } from "react";
import "../composants/Auth.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../composants/Header";
import Footer from "../composants/Footer";
import Register from "./Register";

function Login() {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Votre logique de connexion ici
  };

  return (
    <>
      <Header />
      
      <div className="auth-page">
        <div className="auth-right">
          <div className="auth-containerlogin">
            <div className="flex items-center h-10 w-40 mx-auto">
              <img src={logo} alt="AK Parfumerie" className="" />
            </div>
            
            <div className="auth-form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" />
              </div>

              <div className="form-group">
                <label>Mot de passe</label>
                <input type="password" />
              </div>

              <div className="form-row">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Se souvenir de moi</span>
                </label>
                <a href="#forgot" className="link">Mot de passe oublié?</a>
              </div>

              <button className="btn-primary" onClick={handleSubmit}>
                Se connecter
              </button>

              <button className="btn-google">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Connecte toi avec Google
              </button>
            </div>

            <p className="auth-footer">
              Pas encore membre?{" "}
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

      {/* Modal d'inscription */}
      <Register 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
      />

      <Footer />
    </>
  );
}

export default Login;