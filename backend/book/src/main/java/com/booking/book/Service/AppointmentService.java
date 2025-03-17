package com.booking.book.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.booking.book.Repository.AppointmentRepository;
import com.booking.book.Repository.UserRepository;
import com.booking.book.entity.Appointment;
import com.booking.book.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    private final Logger logger = LoggerFactory.getLogger(AppointmentService.class);

    public Appointment bookAppointment(Long userId, LocalDateTime time) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("user not found"));

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setAppointmentTime(time);
        logger.info("Appointment booked for time: {}", time);
        appointment.setStatus("PENDING");
        logger.info("Appointment booked for user: {}", user.getEmail());
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getUserAppointments(Long useId) {
        logger.info("Fetching all appointments for user: {}", useId);
        return appointmentRepository.findByUserId(useId);
    }
}
