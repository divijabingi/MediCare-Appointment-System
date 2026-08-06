package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Doctor;
import mwcd.lhm.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    // Admin Only - Add Doctor
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Doctor addDoctor(@RequestBody Doctor doctor) {

        return doctorRepository.save(doctor);

    }

    // Admin & Client - View All Doctors
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_CLIENT')")
    public List<Doctor> getAllDoctors() {

        return doctorRepository.findAll();

    }

    // Admin & Client - View Doctor By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_CLIENT')")
    public Optional<Doctor> getDoctorById(@PathVariable Long id) {

        return doctorRepository.findById(id);

    }

    // Admin Only - Update Doctor
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Doctor updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor updatedDoctor
    ) {

        Doctor doctor = doctorRepository.findById(id).orElseThrow();

        doctor.setName(updatedDoctor.getName());
        doctor.setEmail(updatedDoctor.getEmail());
        doctor.setPassword(updatedDoctor.getPassword());
        doctor.setQualification(updatedDoctor.getQualification());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setExperience(updatedDoctor.getExperience());
        doctor.setConsultationFee(updatedDoctor.getConsultationFee());
        doctor.setAvailability(updatedDoctor.getAvailability());

        return doctorRepository.save(doctor);

    }

    // Admin Only - Delete Doctor
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String deleteDoctor(@PathVariable Long id) {

        doctorRepository.deleteById(id);

        return "Doctor deleted successfully";

    }

}