package com.booking.book.DTO;

import java.time.LocalDateTime;

public class AppointmentRequest {
    private LocalDateTime time;

    // Default constructor (important for JSON deserialization)
    public AppointmentRequest() {}

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
