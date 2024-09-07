package com.restaurant.reservation.Model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullReservationResponse {

    private Integer id;
    private LocalDate date;
    private LocalTime reservationTime;
    private int numberOfGuests;

    private List<User> users;
}
