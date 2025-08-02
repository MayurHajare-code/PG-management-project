package com.cdac.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.Model.BookingRequest;
import com.cdac.Model.PG;
import com.cdac.Model.PGOwner;
import com.cdac.Model.User;
import com.cdac.Repository.BookingRequestRepository;
import com.cdac.Repository.PGOwnerRepository;
import com.cdac.Repository.PGRepository;

@Service
public class PGOwnerService {
    @Autowired
    private PGOwnerRepository pgOwnerRepository;

    @Autowired
    private PGRepository pgRepository;

    @Autowired
    private BookingRequestRepository bookingRequestRepository;

    public PGOwner registerPGOwner(PGOwner pgOwner) {
        return pgOwnerRepository.save(pgOwner);
    }
    
    public PG addPG(PG pg, Long ownerId) {
        PGOwner owner = pgOwnerRepository.findById(ownerId).orElseThrow();
        pg.setOwner(owner);
        return pgRepository.save(pg);
    }

    public PG updatePG(PG updatedPG) {
        return pgRepository.save(updatedPG); // assuming ID is already set
    }

    public List<BookingRequest> getBookingRequests(Long ownerId) {
        return bookingRequestRepository.findByPgOwnerId(ownerId);
    }

    public BookingRequest approveRequest(Long requestId) {
        BookingRequest request = bookingRequestRepository.findById(requestId).orElseThrow();
        request.setStatus("APPROVED");
        return bookingRequestRepository.save(request);
    }
}