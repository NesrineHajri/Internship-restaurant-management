package com.restaurant.reservation.Service;

import com.restaurant.reservation.Model.FullReservationResponse;
import com.restaurant.reservation.Model.Reservation;
import com.restaurant.reservation.Model.User;
import com.restaurant.reservation.Repository.ReservationRepository;
import com.restaurant.reservation.client.UserClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository repository;
    private final UserClient client;

    public void saveReservation(Reservation reservation) {
        repository.save(reservation);
    }

    public List<Reservation> findAllReservations() {
        return repository.findAll();
    }

    public FullReservationResponse findReservationsWithUsers(Integer reservationId) {
        var reservation = repository.findById(reservationId)
                .orElse(
                        Reservation.builder()
                                .date(null)  // Assuming date is required, set a default or null.
                                .reservationTime(null)  // Assuming reservationTime is required, set a default or null.
                                .numberOfGuests(0)  // Set a default value.
                                .build()
                );
        var users = client.findAllUsersByReservation(reservationId);
        return FullReservationResponse.builder()
                .date(reservation.getDate())
                .reservationTime(reservation.getReservationTime())
                .numberOfGuests(reservation.getNumberOfGuests())
                .users(users)
                .build();
    }
}
