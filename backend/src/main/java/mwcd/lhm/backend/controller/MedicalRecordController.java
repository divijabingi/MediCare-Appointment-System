package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.MedicalRecord;
import mwcd.lhm.backend.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/medical-record")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    // Add Medical Record
    @PostMapping("/add")
    public MedicalRecord addMedicalRecord(
            @RequestBody MedicalRecord medicalRecord
    ) {

        return medicalRecordRepository.save(medicalRecord);

    }

    // View Medical Record by Appointment
    @GetMapping("/appointment/{appointmentId}")
    public MedicalRecord getMedicalRecordByAppointment(
            @PathVariable Integer appointmentId
    ) {

        return medicalRecordRepository.findByAppointmentId(appointmentId);

    }
    @GetMapping("/exists/{appointmentId}")
    public boolean medicalRecordExists(
            @PathVariable Integer appointmentId
    ) {

        return medicalRecordRepository.findByAppointmentId(appointmentId) != null;

    }

    // View all Medical Records of a Patient
    @GetMapping("/client/{clientId}")
    public Iterable<MedicalRecord> getMedicalRecordsByClient(
            @PathVariable Integer clientId
    ) {

        return medicalRecordRepository.findByClientId(clientId);

    }

    // Update Medical Record
    @PutMapping("/update/{id}")
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