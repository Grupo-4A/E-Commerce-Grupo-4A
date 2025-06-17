package com.login.autentication.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET = "clave_secreta";
    private static final long EXPIRATION = 3600000; // 1 hora

    public static String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION))
                .sign(Algorithm.HMAC256(SECRET));
    }
}
