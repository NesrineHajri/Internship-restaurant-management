package com.restaurant.reservation.Service;

import com.restaurant.reservation.Model.Reservation;
import com.restaurant.reservation.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Reservation service implementation.
 */
@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public Iterable<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation getReservationById(Long reservationId) {
        return reservationRepository.findById(reservationId).orElse(null);
    }

    @Override
    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation updateReservation(Long reservationId, Reservation reservation) {
        if (reservationRepository.existsById(reservationId)) {
            reservation.setReservationId(reservationId); // Updated method name
            return reservationRepository.save(reservation);
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteReservationById(Long reservationId) {
        if (reservationRepository.existsById(reservationId)) {
            reservationRepository.deleteById(reservationId);
            return true;
        } else {
            return false;
        }
    }
}
