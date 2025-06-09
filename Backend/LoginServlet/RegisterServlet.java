package com.yourcompany.loginapp.servlet;

import com.google.gson.Gson;
import com.yourcompany.loginapp.util.PasswordUtil; // Para el hashing de contraseñas
// Importa tu DAO de usuario si lo tienes para interactuar con la DB
// import com.yourcompany.loginapp.dao.UserDao;
// import com.yourcompany.loginapp.model.User;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

// Mapea este servlet a la URL /api/register
@WebServlet("/api/register") 
public class RegisterServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();
    // private UserDao userDao = new UserDao(); // Descomenta y usa si implementas la capa DAO

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        Map<String, String> result = new HashMap<>();

        try {
            // Leer el cuerpo de la solicitud JSON
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                sb.append(line);
            }
            // Convertir el JSON de registro a un mapa
            Map<String, String> registerData = gson.fromJson(sb.toString(), Map.class);

            String username = registerData.get("username");
            String email = registerData.get("email");
            String plainPassword = registerData.get("password");

            // --- Validación y Lógica de Registro (Simulado, integrar con DB real) ---
            if (username == null || username.trim().isEmpty() ||
                email == null || email.trim().isEmpty() ||
                plainPassword == null || plainPassword.trim().isEmpty()) {
                result.put("status", "error");
                result.put("message", "Todos los campos (usuario, correo, contraseña) son obligatorios.");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 Bad Request
                return; // Termina la ejecución si hay campos vacíos
            }

            // Aquí deberías realizar validaciones más robustas:
            // 1. Validar el formato del email (ej. con una expresión regular).
            // 2. **MUY IMPORTANTE**: Verificar si el nombre de usuario o el correo electrónico 
            //    ya existen en tu base de datos para evitar duplicados.
            /*
            if (userDao.isUsernameTaken(username)) {
                result.put("status", "error");
                result.put("message", "El nombre de usuario ya está en uso.");
                response.setStatus(HttpServletResponse.SC_CONFLICT); // 409 Conflict
                return;
            }
            if (userDao.isEmailTaken(email)) {
                result.put("status", "error");
                result.put("message", "El correo electrónico ya está registrado.");
                response.setStatus(HttpServletResponse.SC_CONFLICT); // 409 Conflict
                return;
            }
            */

            // Hashear la contraseña antes de guardarla en la base de datos
            String hashedPassword = PasswordUtil.hashPassword(plainPassword);

            // 3. **Guardar el nuevo usuario en la base de datos.**
            //    Esto implica usar tu capa DAO para persistir el objeto de usuario.
            /*
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setEmail(email);
            newUser.setPassword(hashedPassword);
            userDao.saveUser(newUser); // Llama a tu método para guardar en la DB
            */

            // Simulación: Si todo va bien en la lógica, el registro es exitoso.
            System.out.println("Usuario registrado simulado: " + username + " (" + email + ")");
            result.put("status", "success");
            result.put("message", "Registro exitoso. ¡Bienvenido!");
            response.setStatus(HttpServletResponse.SC_CREATED); // 201 Created para recursos creados

        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "Error interno del servidor durante el registro: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
            e.printStackTrace(); // Imprime el stack trace para depuración
        } finally {
            out.print(gson.toJson(result));
            out.flush();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Las solicitudes de registro deben ser POST
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED); // 405 Method Not Allowed
        response.getWriter().write(gson.toJson(Map.of("status", "error", "message", "Método GET no soportado para registro.")));
    }
}
