package com.login.autentication.controller;

import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String index() {
        return "index"; // /jsp/index.jsp
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // /jsp/login.jsp
    }

    @GetMapping("/register")
    public String register() {
        return "register"; // /jsp/register.jsp
    }

    @GetMapping("/user")
    public String user() {
        return "user"; // /jsp/user.jsp
    }
}
