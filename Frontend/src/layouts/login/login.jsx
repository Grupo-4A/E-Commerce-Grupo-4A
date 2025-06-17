import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import styles from "./inicio.module.css";
// ¡Importa tu servicio de autenticación! Asegúrate de que la ruta sea correcta.
import AuthService from "../../services/auth.service.js"; // Asegúrate de que la ruta sea correcta

export const Inicio = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "", // Este campo se enviará como 'username' al backend de LoginServlet
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(""); // Estado para mostrar mensajes al usuario (éxito/error)

  const handleSignUpClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRegistering(true);
      setIsTransitioning(false);
      setMessage(""); // Limpia cualquier mensaje anterior al cambiar de formulario
    }, 300);
  };

  const handleSignInClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRegistering(false);
      setIsTransitioning(false);
      setMessage(""); // Limpia cualquier mensaje anterior al cambiar de formulario
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpia mensajes de error/éxito anteriores

    try {
      // Llama al servicio de autenticación para intentar el login
      const response = await AuthService.login(
        credentials.email, // Se envía como 'username' al servlet
        credentials.password
      );

      if (response.status === "success") {
        setMessage(response.message);
        // Si el login es exitoso, redirige al usuario al perfil
        navigate("/perfil"); 
      } else {
        // Si el backend devuelve un error, muestra el mensaje
        setMessage(response.message || "Error desconocido al iniciar sesión.");
      }
    } catch (error) {
      // Maneja errores de red o errores de respuesta del servidor (ej. 401 Unauthorized)
      console.error("Error al iniciar sesión:", error);
      setMessage(
        error.response?.data?.message || 
        error.message || 
        "Error de red. Asegúrate de que el servidor esté funcionando."
      );
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpia mensajes de error/éxito anteriores

    // Validación básica en el frontend
    if (registerData.password !== registerData.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }
    if (!registerData.username || !registerData.email || !registerData.password) {
        setMessage("Por favor, rellena todos los campos.");
        return;
    }

    try {
      // Llama al servicio de autenticación para intentar el registro
      const response = await AuthService.register(
        registerData.username,
        registerData.email,
        registerData.password
      );

      if (response.status === "success") {
        setMessage(response.message + " Ahora puedes iniciar sesión.");
        // Opcional: Después de un registro exitoso, puedes redirigir al formulario de login
        setTimeout(() => {
            handleSignInClick(); // Vuelve al formulario de login
            // Limpia el formulario de registro
            setRegisterData({ username: "", email: "", password: "", confirmPassword: "" }); 
        }, 1500); 
      } else {
        // Si el backend devuelve un error de registro
        setMessage(response.message || "Error desconocido al registrar.");
      }
    } catch (error) {
      // Maneja errores de red o errores de respuesta del servidor
      console.error("Error al registrar:", error);
      setMessage(
        error.response?.data?.message || 
        error.message || 
        "Error de red. Asegúrate de que el servidor esté funcionando."
      );
    }
  };

  return (
    <div className={`${styles.page_container} ${isTransitioning ? styles.transitioning : ""}`}>
      {!isRegistering ? (
        // --- SECCIÓN DE LOGIN ---
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
              <h1><FaUserAlt /> Iniciar sesión</h1>
              <p className={styles.subtitle}>Ingresar correo y contraseña</p>

              <form onSubmit={handleLoginSubmit}>
                <div className={styles.form_group}>
                  <label><FaEnvelope /> Correo</label>
                  <input
                    type="email"
                    name="email" // Nombre para el estado local
                    value={credentials.email}
                    onChange={handleLoginChange}
                    placeholder="Correo electrónico"
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label><FaLock /> Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleLoginChange}
                    placeholder="Contraseña"
                    required
                  />
                </div>

                <button type="submit" className={styles.blue_button}>
                  INICIAR
                </button>
                {/* Mostrar mensajes de éxito o error */}
                {message && <p className={styles.formMessage}>{message}</p>}
              </form>
            </div>
          </div>
        </div>
      ) : (
        // --- SECCIÓN DE REGISTRO ---
        <div className={styles.full_page_layout}>
          <div className={styles.left_section_register}>
            <div className={styles.form_container}>
              <h1><FaUserAlt /> Registro</h1>
              <p className={styles.subtitle}>Ingresa los datos solicitados</p>

              <form onSubmit={handleRegisterSubmit}>
                <div className={styles.form_group}>
                  <label><FaUserAlt /> Usuario</label>
                  <input
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    placeholder="Nombre de usuario"
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label><FaEnvelope /> Correo</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Correo electrónico"
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label><FaLock /> Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="Contraseña"
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label><FaLock /> Confirmar contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="Confirmar contraseña"
                    required
                  />
                </div>

                <button type="submit" className={styles.blue_button}>
                  REGISTRAR
                </button>
                {/* Mostrar mensajes de éxito o error */}
                {message && <p className={styles.formMessage}>{message}</p>}
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
