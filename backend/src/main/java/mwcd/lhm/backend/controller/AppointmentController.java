package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Appointment;
import mwcd.lhm.backend.model.Doctor;
import mwcd.lhm.backend.repository.AppointmentRepository;
import mwcd.lhm.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@RestController
@CrossOrigin
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // Admin Only - View All Appointments
    @GetMapping("/list")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Iterable<Appointment> getAppointments() {

        return appointmentRepository.findAll();

    }

    // Admin & Client - View Appointment By Id
    @GetMapping("/view/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_CLIENT')")
    public Appointment findAppointmentById(@PathVariable Integer id) {

        return appointmentRepository.findAppointmentById(id);

    }

    // Check Appointment Availability
    @GetMapping("/availability")
    public boolean checkAppointmentAvailability(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime schedule
    ) {

        LocalDateTime truncatedSchedule =
                schedule.truncatedTo(ChronoUnit.HOURS);

        var matches =
                appointmentRepository.findAppointmentBySchedule(truncatedSchedule);

        return matches.isEmpty();

    }

    // Client Only - Book Appointment
    @PostMapping("/book")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public boolean bookAppointment(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime schedule,

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

    // Admin Only - Conclude Appointment
    @PatchMapping("/conclude/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Appointment concludeAppointment(

            @PathVariable Integer id,

            @RequestParam String notes

    ) {

        Appointment appointment =
                appointmentRepository.findAppointmentById(id);

        appointment.setOccurred(true);
        appointment.setNotes(notes);

        appointmentRepository.save(appointment);

        return appointment;

    }

}