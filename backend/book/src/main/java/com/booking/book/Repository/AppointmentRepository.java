package com.booking.book.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.book.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUserId(Long userId);
    
}
