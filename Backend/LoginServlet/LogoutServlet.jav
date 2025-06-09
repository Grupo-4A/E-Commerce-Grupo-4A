package com.yourcompany.loginapp.servlet;

import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

// Mapea este servlet a la URL /api/logout
@WebServlet("/api/logout")
public class LogoutServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        Map<String, String> result = new HashMap<>();

        try {
            // Intenta obtener la sesión existente sin crear una nueva
            HttpSession session = request.getSession(false); 
            if (session != null) {
                session.invalidate(); // Invalida la sesión actual
                result.put("status", "success");
                result.put("message", "Sesión cerrada exitosamente.");
            } else {
                result.put("status", "info");
                result.put("message", "No hay sesión activa para cerrar.");
            }
            response.setStatus(HttpServletResponse.SC_OK); // 200 OK
        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "Error al cerrar sesión: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
            e.printStackTrace();
        } finally {
            out.print(gson.toJson(result));
            out.flush();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // El logout también debería ser POST
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(gson.toJson(Map.of("status", "error", "message", "Método GET no soportado para logout.")));
    }
}
