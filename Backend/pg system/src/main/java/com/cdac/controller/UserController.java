package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.Model.BookingRequest;
import com.cdac.Model.PG;
import com.cdac.Model.User;
import com.cdac.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @GetMapping("/pgs")
    public ResponseEntity<List<PG>> viewAllPGs() {
        return ResponseEntity.ok(userService.viewAllPGs());
    }

    @PostMapping("/{userId}/book/{pgId}")
    public ResponseEntity<BookingRequest> bookPG(@PathVariable Long userId, @PathVariable Long pgId) {
        return ResponseEntity.ok(userService.bookPG(userId, pgId));
    }

    @GetMapping("/{userId}/bookings")
    public ResponseEntity<List<BookingRequest>> viewBookings(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserBookings(userId));
    }
}









