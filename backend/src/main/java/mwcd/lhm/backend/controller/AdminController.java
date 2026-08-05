package mwcd.lhm.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestParam String username,
            @RequestParam String password
    ) {

        Map<String, Object> response = new HashMap<>();

        if (username.equals("admin") && password.equals("admin123")) {

            response.put("success", true);
            response.put("message", "Login Successful");

        } else {

            response.put("success", false);
            response.put("message", "Invalid Username or Password");

        }

        return response;
    }

}