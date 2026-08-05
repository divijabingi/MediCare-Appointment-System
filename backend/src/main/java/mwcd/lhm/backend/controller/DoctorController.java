package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Doctor;
import mwcd.lhm.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    // Add Doctor
    @PostMapping
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Get All Doctors
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Get Doctor By Id
    @GetMapping("/{id}")
    public Optional<Doctor> getDoctorById(@PathVariable Long id) {
        return doctorRepository.findById(id);
    }

    // Update Doctor
    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id,
                               @RequestBody Doctor updatedDoctor) {

        Doctor doctor = doctorRepository.findById(id).orElseThrow();

        doctor.setName(updatedDoctor.getName());
        doctor.setQualification(updatedDoctor.getQualification());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setExperience(updatedDoctor.getExperience());
        doctor.setConsultationFee(updatedDoctor.getConsultationFee());
        doctor.setAvailability(updatedDoctor.getAvailability());

        return doctorRepository.save(doctor);
    }

    // Delete Doctor
    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable Long id) {

        doctorRepository.deleteById(id);

        return "Doctor deleted successfully";
    }
}