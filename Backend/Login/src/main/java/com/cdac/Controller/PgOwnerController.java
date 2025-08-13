package com.cdac.Controller;



import java.io.IOException;

//package com.cdac.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.cdac.model.PG;
import com.cdac.repository.BookingRepository;
import com.cdac.repository.PgRepository;
import com.cdac.service.PgService;


import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;



@RestController
@RequestMapping("/owner/pgs")
@PreAuthorize("hasRole('OWNER')")
public class PgOwnerController {

    @Autowired
    private PgService pgService;
    
    @Autowired
    private PgRepository pgRepository;
    
    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/add")
    public ResponseEntity<PG> addPg(@RequestBody PG pg, Principal principal) {
        return ResponseEntity.ok(pgService.addPg(pg, principal));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PG> updatePg(@PathVariable Long id, @RequestBody PG pg, Principal principal) {
        return ResponseEntity.ok(pgService.updatePg(id, pg, principal));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePg(@PathVariable Long id, Principal principal) {
        pgService.deletePg(id, principal);
        return ResponseEntity.ok("PG deleted successfully.");
    }

    @GetMapping
    public ResponseEntity<List<PG>> getAllPgsByOwner(Principal principal) {
        return ResponseEntity.ok(pgService.getAllPgsByOwner(principal));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PG> getPgById(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(pgService.getPgById(id, principal));
    }

    
    @GetMapping("/stats")
    public Map<String, Long> getOwnerStats(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername(); // logged-in owner's email
        Long pgCount = pgRepository.countByOwnerEmail(email);
        Long bookingCount = bookingRepository.countByPgOwnerEmail(email);

        Map<String, Long> stats = new HashMap<>();
        stats.put("pgs", pgCount);
        stats.put("bookings", bookingCount);
        return stats;
    }
    
//    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<PG> addPg(
//        @RequestParam("name") String name,
//        @RequestParam("location") String location,
//        @RequestParam("rent") double rent,
//        @RequestParam(value = "image", required = false) MultipartFile image,
//        Principal principal) {
//
//        PG pg = new PG();
//        pg.setName(name);
//        pg.setLocation(location);
//        pg.setRent(rent);
//
//        if (image != null && !image.isEmpty()) {
//            try {
//                pg.setImageData(image.getBytes());
//            } catch (IOException e) {
//                throw new RuntimeException("Failed to upload image");
//            }
//        }
//
//        return ResponseEntity.ok(pgService.addPg(pg, principal));
//    }
//    
//    
//    @GetMapping("/{id}/image")
//    public ResponseEntity<byte[]> getPgImage(@PathVariable Long id) {
//        PG pg = pgService.getPGByIdForUser(id)
//                         .orElseThrow(() -> new RuntimeException("PG not found"));
//
//        return ResponseEntity.ok()
//            .contentType(MediaType.IMAGE_JPEG)
//            .body(pg.getImageData());
//    }
    
}

