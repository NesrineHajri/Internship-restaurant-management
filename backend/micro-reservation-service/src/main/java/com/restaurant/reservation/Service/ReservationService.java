package com.restaurant.reservation.Service;

import com.restaurant.reservation.Model.Reservation;

public interface ReservationService {

    Iterable<Reservation> getAllReservations();

    Reservation getReservationById(Long reservationId);

    Reservation createReservation(Reservation reservation);

    Reservation updateReservation(Long reservationId, Reservation reservation);

    boolean deleteReservationById(Long reservationId);

}
