<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
<h2>Iniciar Sesión</h2>
<form id="loginForm">
    Email: <input type="text" id="email" required><br>
    Contraseña: <input type="password" id="password" required><br>
    <button type="submit">Entrar</button>
</form>

<script>
    document.getElementById("loginForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (data.token) {
            window.location.href = "user.jsp";
        } else {
            alert(data.error);
        }
    });
</script>
</body>
</html>
