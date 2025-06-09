// src/services/auth.service.js
import axios from "axios"; 

// La URL base de tu backend Tomcat. 
// Reemplaza 'my-login-app' con el nombre de tu archivo .war desplegado en Tomcat.
// Si tu aplicación se despliega directamente en la raíz de Tomcat, podrías usar "/api/"
const API_BASE_URL = "http://localhost:8080/my-login-app/api/";

/**
 * Función para iniciar sesión.
 * @param {string} email El correo electrónico del usuario (se mapea a 'username' en el backend).
 * @param {string} password La contraseña del usuario.
 * @returns {Promise<Object>} La respuesta del servidor (status, message).
 */
const login = (email, password) => {
    // Envía los datos de login como JSON en el cuerpo de la solicitud POST.
    // El servlet espera un campo 'username' para el login.
    return axios.post(API_BASE_URL + "login", {
        username: email, // El servlet espera 'username', mapeamos el 'email' del frontend aquí
        password,
    }, {
        // Es crucial para que el navegador envíe automáticamente las cookies de sesión (JSESSIONID)
        withCredentials: true 
    })
    .then((response) => {
        // El backend de Servlets, al usar sesiones, no suele devolver tokens JWT para el manejo de sesión en el cliente.
        // El navegador maneja la cookie de sesión automáticamente.
        // Aquí simplemente retornamos los datos de la respuesta del servidor.
        return response.data;
    })
    .catch((error) => {
        // Registra el error en la consola para depuración
        console.error("Error en login (AuthService):", error.response ? error.response.data : error.message);
        throw error; // Propaga el error para que el componente React lo maneje
    });
};

/**
 * Función para registrar un nuevo usuario.
 * @param {string} username El nombre de usuario.
 * @param {string} email El correo electrónico.
 * @param {string} password La contraseña.
 * @returns {Promise<Object>} La respuesta del servidor (status, message).
 */
const register = (username, email, password) => {
    // Envía los datos de registro como JSON en el cuerpo de la solicitud POST.
    return axios.post(API_BASE_URL + "register", {
        username,
        email,
        password,
    }, {
        withCredentials: true
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error("Error en registro (AuthService):", error.response ? error.response.data : error.message);
        throw error;
    });
};

/**
 * Función para cerrar la sesión del usuario.
 * @returns {Promise<Object>} La respuesta del servidor (status, message).
 */
const logout = () => {
    // Envía una solicitud POST para invalidar la sesión en el servidor.
    return axios.post(API_BASE_URL + "logout", {}, { // El cuerpo de la solicitud puede estar vacío
        withCredentials: true
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error("Error en logout (AuthService):", error.response ? error.response.data : error.message);
        throw error;
    });
};

// Exporta todas las funciones relacionadas con la autenticación
const AuthService = {
    login,
    register,
    logout,
};

export default AuthService;
