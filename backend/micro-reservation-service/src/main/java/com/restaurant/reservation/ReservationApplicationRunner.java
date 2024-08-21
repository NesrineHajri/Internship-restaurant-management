package com.restaurant.reservation;

import com.restaurant.reservation.Model.Reservation;
import com.restaurant.reservation.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.LocalTime;

@SpringBootApplication
public class ReservationApplicationRunner {

    @Autowired
    private ReservationService reservationService;

    public static void main(String[] args) {
        SpringApplication.run(ReservationApplicationRunner.class, args);
    }

    @Bean
    public CommandLineRunner run() {
        return args -> {
            // Create a new Reservation
            Reservation reservation = new Reservation();
            reservation.setDate(LocalDate.of(2024, 8, 18)); // Example date
            reservation.setReservation_time(LocalTime.of(19, 0)); // Example time
            reservation.setNumber_of_guests(4); // Example number of guests

            // Save the reservation using ReservationService
            Reservation savedReservation = reservationService.createReservation(reservation);

            // Print the created reservation ID
            System.out.println("Created Reservation ID: " + savedReservation.getReservationId());
        };
    }
}
