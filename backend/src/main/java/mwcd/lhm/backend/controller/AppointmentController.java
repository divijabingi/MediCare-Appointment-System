package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Appointment;
import mwcd.lhm.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import mwcd.lhm.backend.model.Doctor;
import mwcd.lhm.backend.repository.DoctorRepository;
@RestController
@CrossOrigin
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/list")
    public Iterable<Appointment> getAppointments() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/view/{id}")
    public Appointment findAppointmentById(@PathVariable Integer id) {
        return appointmentRepository.findAppointmentById(id);
    }

    @GetMapping("/availability")
    public boolean checkAppointmentAvailability(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime schedule
    ) {
        // truncated schedule to keep year/month/day and hour
        var truncatedSchedule = schedule.truncatedTo(ChronoUnit.HOURS);

        // get all appointments that match proposed schedule
        var matches = appointmentRepository.findAppointmentBySchedule(truncatedSchedule);

        if (matches.size() > 0)
            return Boolean.FALSE;
        else
            return Boolean.TRUE;
    }

    @PostMapping("/book")
    public boolean bookAppointment(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime schedule,
            @RequestParam Integer clientId,
            @RequestParam Long doctorId
    ) {

        if (!checkAppointmentAvailability(schedule))
            return false;

        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        if (doctor == null)
            return false;

        Appointment appointment = new Appointment();

        appointment.setClientId(clientId);
        appointment.setDoctor(doctor);
        appointment.setSchedule(schedule.truncatedTo(ChronoUnit.HOURS));
        appointment.setOccurred(false);
        appointment.setNotes("");

        appointmentRepository.save(appointment);

        return true;
    }

    @PatchMapping("/conclude/{id}")
    public Appointment concludeAppointment(
        // select appointment to conclude from path var
        @PathVariable Integer id,
        // gather appointment details from query items
        @RequestParam String notes
    ) {
        // getting current appointment object
        var appointment = appointmentRepository.findAppointmentById(id);

        // updating appointment details
        appointment.setOccurred(Boolean.TRUE);
        appointment.setNotes(notes);

        // saving object back into repo (indexed by the immutable id field)
        appointmentRepository.save(appointment);

        return appointment;
    }

}
