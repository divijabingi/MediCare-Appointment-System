package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Client;
import mwcd.lhm.backend.repository.ClientRepository;
import mwcd.lhm.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/client/auth")
public class ClientAuthController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public String registerClient(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String record
    ) {

        List<Client> matches = clientRepository.findClientByEmail(email);

        if (matches.size() > 0)
            return "Email already exists. Please login.";

        Client client = new Client();

        client.setName(name);
        client.setEmail(email);
        client.setPassword(passwordEncoder.encode(password));
        client.setRecord(record);

        clientRepository.save(client);

        return "You have been registered. Please login.";
    }

    @PostMapping("/login")
    public Map<String, Object> loginClient(
            @RequestParam String email,
            @RequestParam String password
    ) {
    	System.out.println("NEW CLIENT LOGIN METHOD");
        Map<String, Object> response = new HashMap<>();

        List<Client> matches = clientRepository.findClientByEmail(email);

        if (matches.size() != 1) {

            response.put("success", false);
            response.put("message", "Invalid Email or Password");

            return response;
        }

        Client client = matches.get(0);

        if (!passwordEncoder.matches(password, client.getPassword())) {

            response.put("success", false);
            response.put("message", "Invalid Email or Password");

            return response;
        }

        String token = jwtUtil.generateToken(email, "ROLE_CLIENT");

        response.put("success", true);
        response.put("message", "Login Successful");
        response.put("token", token);
        response.put("role", "ROLE_CLIENT");
        response.put("client", client);

        return response;
    }

}