import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./inicio.module.css";

export const Inicio = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUpClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRegistering(true);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSignInClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRegistering(false);
      setIsTransitioning(false);
    }, 300);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (
      credentials.email === "usuario@ejemplo.com" &&
      credentials.password === "password123"
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de registro:", registerData);
    alert("Función de registro pendiente de implementar");
  };

  return (
    <div className={`${styles.page_container} ${isTransitioning ? styles.transitioning : ""}`}>
      {!isRegistering ? (
        // Login Screen - 50/50 Split Layout
        <div className={styles.full_page_layout}>
          <div className={styles.left_section}>
            <div className={styles.left_content}>
              <h1>Bienvenido</h1>
              <p>
                Hacemos que la tecnología avanzada sea accesible para todos, 
                sin límites ni fronteras.
              </p>
              <button 
                onClick={handleSignUpClick} 
                className={styles.white_button}
              >
                Registrarse
              </button>
            </div>
          </div>
          
          <div className={styles.right_section}>
            <div className={styles.form_container}>
              <h1>Iniciar sesión</h1>
              <p className={styles.subtitle}>Ingresar correo y contraseña</p>
              
              <form onSubmit={handleLoginSubmit}>
                <div className={styles.form_group}>
                  <label>Usuario</label>
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleLoginChange}
                    placeholder=""
                  />
                </div>
                
                <div className={styles.form_group}>
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleLoginChange}
                    placeholder=""
                  />
                </div>
                
                <button type="submit" className={styles.blue_button}>
                  INICIAR
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        // Register Screen - 50/50 Split Layout (reversed)
        <div className={styles.full_page_layout}>
          <div className={styles.left_section_register}>
            <div className={styles.form_container}>
              <h1>Registro</h1>
              <p className={styles.subtitle}>Ingresa los datos solicitados</p>
              
              <form onSubmit={handleRegisterSubmit}>
                <div className={styles.form_group}>
                  <label>Usuario</label>
                  <input
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    placeholder=""
                  />
                </div>
                
                <div className={styles.form_group}>
                  <label>Correo</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder=""
                  />
                </div>
                
                <div className={styles.form_group}>
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder=""
                  />
                </div>
                
                <div className={styles.form_group}>
                  <label>Confirmar contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder=""
                  />
                </div>
                
                <button type="submit" className={styles.blue_button}>
                  REGISTRAR
                </button>
              </form>
            </div>
          </div>
          
          <div className={styles.right_section_register}>
            <div className={styles.right_content}>
              <h1>Bienvenido</h1>
              <p>
                Hacemos que la tecnología avanzada sea accesible para todos, 
                sin límites ni fronteras.
              </p>
              <button
                onClick={handleSignInClick}
                className={styles.white_button}
              >
                Inicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};