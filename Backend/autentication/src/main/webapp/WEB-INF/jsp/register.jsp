<!DOCTYPE html>
<html>
<head>
    <title>Registro</title>
</head>
<body>
    <h2>Registrarse</h2>
    <form id="registerForm">
        <label>Email:</label><br>
        <input type="email" id="email"><br>
        <label>Contraseña:</label><br>
        <input type="password" id="password"><br><br>
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
            if (data.message) {
                alert("Registro exitoso. Inicie sesión.");
                window.location.href = "login";
            } else {
                alert(data.error);
            }
        });
    </script>
</body>
</html>
