package com.cdac.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.Model.BookingRequest;
import com.cdac.Model.PG;
import com.cdac.Model.User;
import com.cdac.Repository.BookingRequestRepository;
import com.cdac.Repository.PGRepository;
import com.cdac.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PGRepository pgRepository;

    @Autowired
    private BookingRequestRepository bookingRequestRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public List<PG> viewAllPGs() {
        return pgRepository.findAll();
    }

    public BookingRequest bookPG(Long userId, Long pgId) {
        User user = userRepository.findById(userId).orElseThrow();
        PG pg = pgRepository.findById(pgId).orElseThrow();

        BookingRequest request = new BookingRequest();
        request.setUser(user);
        request.setPg(pg);
        request.setStatus("PENDING");
        return bookingRequestRepository.save(request);
    }

    public List<BookingRequest> getUserBookings(Long userId) {
        return bookingRequestRepository.findByUserId(userId);
    }
}
