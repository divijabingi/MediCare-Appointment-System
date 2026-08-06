package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.MedicalRecord;
import mwcd.lhm.backend.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/medical-record")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    // Admin Only - Add Medical Record
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public MedicalRecord addMedicalRecord(
            @RequestBody MedicalRecord medicalRecord
    ) {

        return medicalRecordRepository.save(medicalRecord);

    }

    // Admin & Client - View Medical Record by Appointment
    @GetMapping("/appointment/{appointmentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_CLIENT')")
    public MedicalRecord getMedicalRecordByAppointment(
            @PathVariable Integer appointmentId
    ) {

        return medicalRecordRepository.findByAppointmentId(appointmentId);

    }

    // Admin Only - Check if Medical Record Exists
    @GetMapping("/exists/{appointmentId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public boolean medicalRecordExists(
            @PathVariable Integer appointmentId
    ) {

        return medicalRecordRepository.findByAppointmentId(appointmentId) != null;

    }

    // Admin & Client - View Patient Medical Records
    @GetMapping("/client/{clientId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_CLIENT')")
    public Iterable<MedicalRecord> getMedicalRecordsByClient(
            @PathVariable Integer clientId
    ) {

        return medicalRecordRepository.findByClientId(clientId);

    }

    // Admin Only - Update Medical Record
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public MedicalRecord updateMedicalRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecord updatedRecord
    ) {

        MedicalRecord record =
                medicalRecordRepository.findById(id).orElseThrow();

        record.setDiagnosis(updatedRecord.getDiagnosis());
        record.setPrescription(updatedRecord.getPrescription());
        record.setMedicines(updatedRecord.getMedicines());
        record.setDoctorNotes(updatedRecord.getDoctorNotes());
        record.setCreatedDate(updatedRecord.getCreatedDate());

        return medicalRecordRepository.save(record);

    }

}