package com.yourcompany.loginapp.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter; // Para mapear el filtro sin web.xml si se prefiere
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// Aplica este filtro a todas las rutas de tu aplicación
// @WebFilter("/*") 
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // Permite solicitudes desde el origen de tu aplicación React (durante desarrollo)
        httpResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); 
        // Permite los métodos HTTP que usas
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        // Permite las cabeceras HTTP que envías en tus solicitudes
        httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        // **IMPORTANTE**: Permite el envío de credenciales (cookies, encabezados de autorización)
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true"); 
        // Tiempo que el navegador puede almacenar en caché los resultados de la solicitud preflight
        httpResponse.setHeader("Access-Control-Max-Age", "3600"); 

        // Maneja las solicitudes preflight (OPTIONS) que los navegadores envían antes de las solicitudes reales
        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
            httpResponse.setStatus(HttpServletResponse.SC_OK); // Responde 200 OK para preflight
        } else {
            chain.doFilter(request, response); // Continúa con la cadena de filtros para la solicitud real
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Método de inicialización del filtro (puedes dejarlo vacío si no necesitas inicialización)
    }

    @Override
    public void destroy() {
        // Método de limpieza del filtro (puedes dejarlo vacío si no necesitas limpieza)
    }
}
