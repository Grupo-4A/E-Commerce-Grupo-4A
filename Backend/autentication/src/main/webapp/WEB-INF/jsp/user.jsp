<%
    String user = (String) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("/login");
        return;
    }
%>

<!DOCTYPE html>
<html>
<head><title>Usuario</title></head>
<body>
    <h2>Bienvenido <%= user %></h2>
    <form action="login" method="get">
        <input type="submit" value="Cerrar sesión">
    </form>
</body>
</html>
