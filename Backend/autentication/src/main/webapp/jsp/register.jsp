<!DOCTYPE html>
<html>
<head><title>Registro</title></head>
<body>
<h2>Registro de Usuario</h2>
<form id="registerForm">
    Email: <input type="text" id="email" required><br>
    Contraseña: <input type="password" id="password" required><br>
    <button type="submit">Registrarse</button>
</form>

<script>
    document.getElementById("registerForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        alert(data.message || data.error);
        if (data.message) window.location.href = "login.jsp";
    });
</script>
</body>
</html>
