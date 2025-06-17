<%@ page import="javax.servlet.http.HttpSession" %>
<%
    HttpSession session = request.getSession(false);
    String user = (session != null) ? (String) session.getAttribute("user") : null;

    if (user == null) {
        response.sendRedirect("login.jsp");
    }
%>
<!DOCTYPE html>
<html>
<head><title>Usuario</title></head>
<body>
<h2>Bienvenido, <%= user %></h2>
<a href="logout.jsp">Cerrar sesión</a>
</body>
</html>
