package mwcd.lhm.backend.repository;

import mwcd.lhm.backend.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    List<MedicalRecord> findByClientId(Integer clientId);

    List<MedicalRecord> findByDoctorId(Long doctorId);

    MedicalRecord findByAppointmentId(Integer appointmentId);

}