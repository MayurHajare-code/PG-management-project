package com.cdac.Controller;

import com.cdac.dto.BookingRequest;
import com.cdac.dto.BookingUpdateRequest;
import com.cdac.model.Booking;
import com.cdac.model.BookingResponseDTO;
import com.cdac.service.BookingService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
public class BookingController {

	private final BookingService bookingService;

	public BookingController(BookingService bookingService) {
		this.bookingService = bookingService;
	}

	@Secured("ROLE_USER")
	@GetMapping("/users/bookings")
	public ResponseEntity<List<Booking>> getBookings(Principal principal) {
		String email = principal.getName();
		List<Booking> bookings = bookingService.getBookingsByUserEmail(email);
		return ResponseEntity.ok(bookings);
	}

	@PostMapping("/user/book/{pgId}")
	@Secured("ROLE_USER")
	public ResponseEntity<String> bookPG(@PathVariable Long pgId, @RequestBody BookingRequest request,
			Principal principal) {
		String email = principal.getName();
		Booking booking = bookingService.bookPG(email, pgId, request.getCheckinDate(), request.getComment());
		return ResponseEntity.ok("Booking successful with ID: " + booking.getId());
	}

	@PutMapping("/owner/bookings/{id}")
	@Secured("ROLE_OWNER")
	public ResponseEntity<String> updateBooking(@PathVariable Long id, @RequestBody BookingUpdateRequest request) {
		bookingService.updateBooking(id, request.getStatus(), request.getRemark());
		return ResponseEntity.ok("Booking updated successfully");
	}

	@Secured("ROLE_OWNER")
	@GetMapping("/owner/bookings")
	public ResponseEntity<List<BookingResponseDTO>> getBookingsForOwner(Principal principal) {
		String email = principal.getName();
		List<BookingResponseDTO> bookings = bookingService.getBookingsForOwner(email);
		return ResponseEntity.ok(bookings);
	}

}

//@Secured("ROLE_USER")
//@PostMapping("user/book/{pgId}")
//public ResponseEntity<String> bookPGController(@PathVariable Long pgId, Principal principal) {
//  String email = principal.getName();
//  Booking booking = bookingService.bookPG(email, pgId);
//  return ResponseEntity.ok("Booking successful with ID: " + booking.getId());
//}

//
//// ✅ Admin (optional): Get all bookings
//@Secured("ROLE_ADMIN")
//@GetMapping("/all")
//public ResponseEntity<List<Booking>> getAllBookings() {
//  return ResponseEntity.ok(bookingService.getAllBookings());
//}