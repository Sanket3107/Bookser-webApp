package com.booking.book.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.book.DTO.AppointmentRequest;
import com.booking.book.Service.AppointmentService;
import com.booking.book.entity.Appointment;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("/book/{userId}")
    public ResponseEntity<Appointment> bookAppointment(@PathVariable Long userId, @RequestBody AppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.bookAppointment(userId, request.getTime()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> getUserAppointments(@PathVariable Long userId) {
        return ResponseEntity.ok(appointmentService.getUserAppointments(userId));
    }
}
