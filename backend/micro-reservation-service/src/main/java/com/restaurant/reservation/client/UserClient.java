package com.restaurant.reservation.client;
import com.restaurant.reservation.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "microservice1-user", url = "${application.config.users-url}")

public interface UserClient {
    @GetMapping("/reservation/{reservationId}")
    List<User> findAllUsersByReservation(@PathVariable("reservationId") Integer reservationId);
}


