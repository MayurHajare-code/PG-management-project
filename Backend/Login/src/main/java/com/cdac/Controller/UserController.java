package com.cdac.Controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.cdac.dto.ChangePasswordRequest;
import com.cdac.model.Booking;
import com.cdac.model.PG;
import com.cdac.model.User;
import com.cdac.repository.BookingRepository;
import com.cdac.repository.UserRepository;
import com.cdac.service.BookingService;
import com.cdac.service.PgService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping()
public class UserController {

    private final PgService pgService;

    @Autowired
    private BookingService bookingService;
    
    UserController(PgService pgService) {
        this.pgService = pgService;
    }
	
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserRepository userRepo;

	@GetMapping("/pgs")
	public List<PG> getAllPGs() {
	    return pgService.getAllPGs();  
	}

	@GetMapping("/pgs/{id}")
	public ResponseEntity<PG> getPGById(@PathVariable Long id) {
	    Optional<PG> pg = pgService.getPGByIdForUser(id);
	    return pg.map(ResponseEntity::ok)
	             .orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PostMapping("user/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Authentication authentication) {
        String email = authentication.getName(); // current logged-in user
        User user = userRepo.findByEmail(email).orElse(null);

        if (user == null || !passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid old password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepo.save(user);
        return ResponseEntity.ok("Password updated successfully");
    }
	
//	 @Secured("ROLE_USER")
//	    @PostMapping("user/book/{pgId}")
//	    public ResponseEntity<String> bookPG(@PathVariable Long pgId, Principal principal) {
//	        bookingService.bookPG(principal.getName(), pgId);
//	        return ResponseEntity.ok("Booking successful");
//	    }
	 
//	 @GetMapping("/users/bookings")
//	 public ResponseEntity<List<Booking>> getBookings(Principal principal) {
//	     String email = principal.getName();
//	     User user = UserRepository.findByEmail(email).orElseThrow();
//	     List<Booking> bookings = BookingRepository.findByUser(user);
//	     return ResponseEntity.ok(bookings);
//	 }

}




