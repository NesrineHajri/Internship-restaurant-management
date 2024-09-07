package com.restaurant.reservation.Model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    private Integer id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String mobileNumber;

}

