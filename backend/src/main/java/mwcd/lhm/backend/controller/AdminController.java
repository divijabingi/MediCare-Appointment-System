package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Admin;
import mwcd.lhm.backend.security.JwtUtil;
import mwcd.lhm.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    @GetMapping("/encode/{pwd}")
    public String encode(@PathVariable String pwd) {
        return passwordEncoder.encode(pwd);
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestParam String username,
            @RequestParam String password
    ) {

        Map<String, Object> response = new HashMap<>();

        Optional<Admin> admin = adminRepository.findByUsername(username);
        System.out.println("Username entered: " + username);

        System.out.println("Admin exists: " + admin.isPresent());

        if (admin.isPresent()) {

            System.out.println("DB Password: " + admin.get().getPassword());

            System.out.println("Password Match: " +
                    passwordEncoder.matches(password, admin.get().getPassword()));
        }

        if (admin.isPresent() &&
                passwordEncoder.matches(password, admin.get().getPassword())) {

        	String token = jwtUtil.generateToken(username, "ROLE_ADMIN");

        	response.put("success", true);
        	response.put("message", "Login Successful");
        	response.put("token", token);
        	response.put("role", "ROLE_ADMIN");

        } else {

            response.put("success", false);
            response.put("message", "Invalid Username or Password");

        }

        return response;
    }

}