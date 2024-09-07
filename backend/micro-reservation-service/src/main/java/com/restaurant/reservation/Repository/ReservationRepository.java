package com.restaurant.reservation.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.restaurant.reservation.Model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
}
