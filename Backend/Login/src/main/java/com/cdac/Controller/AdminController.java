package com.cdac.Controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.AdminStatsDTO;
import com.cdac.dto.PGDetailsResponse;
import com.cdac.model.Booking;
import com.cdac.model.PG;
import com.cdac.model.User;
import com.cdac.repository.BookingRepository;
import com.cdac.repository.PgRepository;
import com.cdac.repository.UserRepository;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*") // allow cross-origin if needed
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PgRepository pgRepository;

    @Autowired
    private BookingRepository bookingRepository;
    
    // Get all users
//    @GetMapping("/users")
//    public ResponseEntity<List<User>> getAllUsers() {
//        List<User> users = userRepository.findAll();
//        return ResponseEntity.ok(users);
//    }
//
//    // Get all owners
//    @GetMapping("/owners")
//    public ResponseEntity<List<User>> getAllOwners() {
//        List<User> owners = userRepository.findByRole("OWNER"); // Assuming role is stored in User
//        return ResponseEntity.ok(owners);
//    }
    
    
 // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findByRole("ROLE_USER"));
    }

    // Get all owners
    @GetMapping("/owners")
    public ResponseEntity<List<User>> getAllOwners() {
        return ResponseEntity.ok(userRepository.findByRole("ROLE_OWNER"));
    }

    @GetMapping("/users/{id}/bookings")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Long id) {
        List<Booking> bookings = bookingRepository.findByUserId(id);
        return ResponseEntity.ok(bookings);
    }
    
    
    @GetMapping("/pgs/{id}")
    public ResponseEntity<PGDetailsResponse> getPGDetails(@PathVariable Long id) {
        PG pg = pgRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PG not found"));

        PGDetailsResponse dto = new PGDetailsResponse();
        dto.setPgId(pg.getId());
        dto.setName(pg.getName());
        dto.setLocation(pg.getLocation());
        dto.setRent(pg.getRent());

        dto.setOwnerId(pg.getOwner().getId());
        dto.setOwnerName(pg.getOwner().getName());
        dto.setOwnerEmail(pg.getOwner().getEmail());
        dto.setOwnerPhone(pg.getOwner().getPhone());

        return ResponseEntity.ok(dto);
    }

    

    // Get all PGs
    @GetMapping("/pgs")
    public ResponseEntity<List<PG>> getAllPGs() {
        List<PG> pgs = pgRepository.findAll();
        return ResponseEntity.ok(pgs);
    }

    // Delete a user by ID
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an owner by ID
    @DeleteMapping("/owners/{id}")
    public ResponseEntity<String> deleteOwner(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("Owner deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a PG by ID
    @DeleteMapping("/pgs/{id}")
    public ResponseEntity<String> deletePG(@PathVariable Long id) {
        if (pgRepository.existsById(id)) {
            pgRepository.deleteById(id);
            return ResponseEntity.ok("PG deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/stats")
    public AdminStatsDTO getStats() {
        long totalUsers = userRepository.countByRole("ROLE_USER");
        long totalOwners = userRepository.countByRole("ROLE_OWNER");
        long totalPGs = pgRepository.count();

        return new AdminStatsDTO(totalUsers, totalOwners, totalPGs);
    }
    
    
}

