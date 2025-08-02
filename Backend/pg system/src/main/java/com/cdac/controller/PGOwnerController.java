package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.Model.BookingRequest;
import com.cdac.Model.PG;
import com.cdac.Model.PGOwner;
import com.cdac.services.PGOwnerService;

@RestController
@RequestMapping("/pg-owner")
public class PGOwnerController {

    @Autowired
    private PGOwnerService pgOwnerService;



    @PostMapping("/registerOwner")
    public ResponseEntity<PGOwner> registerOwner(@RequestBody PGOwner owner) {
        return ResponseEntity.ok(pgOwnerService.registerPGOwner(owner));
    }
    
    @PostMapping("/{ownerId}/add-pg")
    public ResponseEntity<PG> addPG(@RequestBody PG pg, @PathVariable Long ownerId) {
        return ResponseEntity.ok(pgOwnerService.addPG(pg, ownerId));
    }

    // error owner not found, not update directly add it.
    @PutMapping("/update-pg")
    public ResponseEntity<PG> updatePG(@RequestBody PG pg) {
        return ResponseEntity.ok(pgOwnerService.updatePG(pg));
    }

    @GetMapping("/{ownerId}/booking-requests")
    public ResponseEntity<List<BookingRequest>> getBookingRequests(@PathVariable Long ownerId) {
        return ResponseEntity.ok(pgOwnerService.getBookingRequests(ownerId));
    }

    @PostMapping("/approve-request/{requestId}")
    public ResponseEntity<BookingRequest> approveRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(pgOwnerService.approveRequest(requestId));
    }
}
