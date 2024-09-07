package com.restaurant.reservation.Controller;

import com.restaurant.reservation.Model.FullReservationResponse;
import com.restaurant.reservation.Model.Reservation;
import com.restaurant.reservation.Service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(
            @RequestBody Reservation reservation,
            Principal principal
    ) {
        service.saveReservation(reservation);
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> findAllReservations() {
        return ResponseEntity.ok(service.findAllReservations());
    }

    @GetMapping("/with-users/{reservationId}")
    public ResponseEntity<FullReservationResponse> findAllReservations(
            @PathVariable("reservationId") Integer reservationId
    ) {
        return ResponseEntity.ok(service.findReservationsWithUsers(reservationId));
    }

}
