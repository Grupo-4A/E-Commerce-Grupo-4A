package com.login.autentication.controller;

import com.login.autentication.model.User;
import com.login.autentication.repository.UserRepository;
import com.login.autentication.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public HashMap<String, String> register(@RequestBody User user) {
        HashMap<String, String> response = new HashMap<>();
        Optional<User> existing = userRepository.findByEmail(user.getEmail());

        if (existing.isPresent()) {
            response.put("error", "usuario ya existe");
            return response;
        }

        userRepository.save(user);
        response.put("message", "registro exitoso");
        return response;
    }

    @PostMapping("/login")
    public HashMap<String, String> login(@RequestBody User user, HttpSession session) {
        HashMap<String, String> response = new HashMap<>();
        Optional<User> existing = userRepository.findByEmail(user.getEmail());

        if (existing.isEmpty() || !existing.get().getPassword().equals(user.getPassword())) {
            response.put("error", "credenciales inválidas");
            return response;
        }

        session.setAttribute("user", user.getEmail());
        String token = JwtUtil.generateToken(user.getEmail());
        response.put("token", token);
        return response;
    }

    @GetMapping("/user")
    public HashMap<String, String> getUser(HttpSession session) {
        HashMap<String, String> response = new HashMap<>();
        String user = (String) session.getAttribute("user");

        if (user == null) {
            response.put("error", "no autenticado");
        } else {
            response.put("email", user);
        }

        return response;
    }
}
