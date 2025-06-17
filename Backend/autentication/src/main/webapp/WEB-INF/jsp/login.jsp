<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h2>Iniciar sesión</h2>
    <form id="loginForm">
        <label>Email:</label><br>
        <input type="email" id="email"><br>
        <label>Contraseña:</label><br>
        <input type="password" id="password"><br><br>
        <button type="submit">Iniciar sesión</button>
    </form>

    <script>
        document.getElementById("loginForm").addEventListener("submit", async function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });

            const data = await res.json();
            if (data.token) {
                alert("Login exitoso");
                window.location.href = "user";
            } else {
                alert(data.error);
            }
        });
    </script>
</body>
</html>
