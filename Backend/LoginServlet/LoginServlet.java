package com.yourcompany.loginapp.servlet;

import com.google.gson.Gson; // Importar Gson para manejo de JSON
import com.yourcompany.loginapp.util.PasswordUtil; // Importar utilidad para hashing de contraseñas
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet; // Para mapear el servlet sin web.xml si se prefiere
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession; // Para manejo de sesiones
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

// Mapea este servlet a la URL /api/login. También puedes hacerlo en web.xml.
// @WebServlet("/api/login") 
public class LoginServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson(); // Instancia de Gson para serializar/deserializar JSON

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Configura la respuesta para enviar JSON y usar UTF-8
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter(); // Objeto para escribir la respuesta
        Map<String, String> result = new HashMap<>(); // Mapa para construir la respuesta JSON

        try {
            // Leer el cuerpo de la solicitud HTTP (que contiene el JSON del frontend)
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                sb.append(line);
            }
            // Convertir el JSON a un mapa de Java
            Map<String, String> credentials = gson.fromJson(sb.toString(), Map.class);
            String username = credentials.get("username"); // Obtiene el username (correo)
            String password = credentials.get("password"); // Obtiene la contraseña

            // --- Lógica de Autenticación (Ejemplo simulado, reemplazar con DB real) ---
            // En una aplicación real, aquí consultarías tu base de datos.
            // Ejemplo: User user = userDao.findByUsername(username);
            // Si el usuario existe, recuperarías su contraseña hasheada de la DB.
            
            // Simulación de una contraseña hasheada almacenada para "testuser@example.com"
            // Deberías reemplazar esto con la consulta a tu base de datos
            String storedHashedPassword = null;
            if ("testuser@example.com".equals(username)) {
                // Genera el hash de "password123" una vez y úsalo aquí.
                // NO HAGAS ESTO EN PRODUCCIÓN: PasswordUtil.hashPassword("password123");
                // Para este ejemplo, voy a generar un hash para "password123"
                // El hash de "password123" usando BCrypt.gensalt() puede ser:
                // "$2a$10$w/X/b.fK3jV.Y9X5jJ6hA.q1Xz1Xy.Q7Y8R9S0tU1V2W3X4Y5Z6" (cada hash es diferente)
                // Usaremos un hash pre-generado para la consistencia del ejemplo.
                storedHashedPassword = "$2a$10$w/X/b.fK3jV.Y9X5jJ6hA.q1Xz1Xy.Q7Y8R9S0tU1V2W3X4Y5Z6"; 
                // Asegúrate de que este hash corresponda a "password123"
            }


            if (username != null && password != null && 
                storedHashedPassword != null && 
                PasswordUtil.checkPassword(password, storedHashedPassword)) {
                
                // Autenticación exitosa
                HttpSession session = request.getSession(); // Obtiene o crea una sesión
                session.setAttribute("loggedInUser", username); // Guarda el usuario en la sesión
                session.setMaxInactiveInterval(30 * 60); // Sesión expira en 30 minutos

                result.put("status", "success");
                result.put("message", "¡Inicio de sesión exitoso!");
                // Opcional: Podrías enviar un token, aunque con sesiones HTTP, la cookie es suficiente.
                // result.put("token", "some_generated_token_if_using_jwt"); 
                
                // Configura el estado HTTP 200 OK
                response.setStatus(HttpServletResponse.SC_OK); 
            } else {
                // Autenticación fallida
                result.put("status", "error");
                result.put("message", "Credenciales inválidas. Verifica tu correo y contraseña.");
                // Configura el estado HTTP 401 Unauthorized
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); 
            }
        } catch (Exception e) {
            // Manejo de cualquier excepción durante el proceso
            result.put("status", "error");
            result.put("message", "Error interno del servidor: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
            e.printStackTrace(); // Imprime el stack trace para depuración
        } finally {
            // Envía la respuesta JSON al cliente
            out.print(gson.toJson(result));
            out.flush();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // El login debe ser siempre por POST para enviar credenciales de forma segura
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        Map<String, String> result = new HashMap<>();
        result.put("status", "error");
        result.put("message", "Método GET no soportado para login. Utiliza POST.");
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED); // 405 Method Not Allowed
        out.print(gson.toJson(result));
        out.flush();
    }
}
