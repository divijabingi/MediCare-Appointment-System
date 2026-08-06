package mwcd.lhm.backend.security;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jwt")
@CrossOrigin
public class JwtAuthenticationController {

    @GetMapping("/test")
    public String test() {
        return "JWT Working";
    }

}