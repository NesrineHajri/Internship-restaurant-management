package com.restaurant.reservation.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;


@Data
@Entity
@Table(name = "\"reservations\"")
public class Reservation {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    private LocalDate date;
    private LocalTime reservation_time;
    private int number_of_guests;



    public Reservation() {}


    public Reservation(LocalDate date, LocalTime reservation_time, int  number_of_guests) {
        this.date = date;
        this.reservation_time = reservation_time;
        this. number_of_guests =  number_of_guests;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getReservation_time() {
        return reservation_time;
    }

    public int getNumber_of_guests() {
        return number_of_guests;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setReservation_time(LocalTime reservation_time) {
        this.reservation_time = reservation_time;
    }

    public void setNumber_of_guests(int number_of_guests) {
        this.number_of_guests = number_of_guests;
    }
}
