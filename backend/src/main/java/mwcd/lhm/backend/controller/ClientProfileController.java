package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Client;
import mwcd.lhm.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("/client/profile")
public class ClientProfileController {

    @Autowired
    private ClientRepository clientRepository;

    // Admin Only - View All Clients
    @GetMapping("/list")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Iterable<Client> getClients() {

        return clientRepository.findAll();

    }

    // Admin & Client - View Client Profile
    @GetMapping("/view/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_CLIENT')")
    public Client findClientById(@PathVariable Integer id) {

        return clientRepository.findClientById(id);

    }

    // Client Only - Update Profile
    @PatchMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public Client updateClientById(

            @PathVariable Integer id,

            @RequestParam(required = false) String name,

            @RequestParam(required = false) String phone,

            @RequestParam(required = false) Integer age,

            @RequestParam(required = false) String gender,

            @RequestParam(required = false) String bloodGroup,

            @RequestParam(required = false) String address,

            @RequestParam(required = false) String emergencyContact

    ) {

        Client client = clientRepository.findClientById(id);

        client.setName(Objects.requireNonNullElse(name, client.getName()));

        client.setPhone(Objects.requireNonNullElse(phone, client.getPhone()));

        client.setAge(Objects.requireNonNullElse(age, client.getAge()));

        client.setGender(Objects.requireNonNullElse(gender, client.getGender()));

        client.setBloodGroup(
                Objects.requireNonNullElse(
                        bloodGroup,
                        client.getBloodGroup()
                )
        );

        client.setAddress(
                Objects.requireNonNullElse(
                        address,
                        client.getAddress()
                )
        );

        client.setEmergencyContact(
                Objects.requireNonNullElse(
                        emergencyContact,
                        client.getEmergencyContact()
                )
        );

        clientRepository.save(client);

        return client;

    }

}