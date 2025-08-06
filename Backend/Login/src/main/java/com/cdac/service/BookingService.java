package com.cdac.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.model.Booking;
import com.cdac.model.BookingResponseDTO;
import com.cdac.model.PG;
import com.cdac.model.User;
import com.cdac.repository.BookingRepository;
//import com.cdac.repository.PGRepository;
import com.cdac.repository.PgRepository;
import com.cdac.repository.UserRepository;

@Service
public class BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PgRepository pgRepository;

	public BookingService(BookingRepository bookingRepository, UserRepository userRepository) {
		this.bookingRepository = bookingRepository;
		this.userRepository = userRepository;
	}

	public List<Booking> getBookingsByUserEmail(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found with email: " + email));
		return bookingRepository.findByUser(user);
	}

	public Booking bookPG(String email, Long pgId, String checkinDateStr, String comment) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		PG pg = pgRepository.findById(pgId).orElseThrow(() -> new RuntimeException("PG not found"));

		LocalDate checkinDate = LocalDate.parse(checkinDateStr); // added parsing

		Booking booking = new Booking(user, pg, LocalDateTime.now());
		booking.setCheckinDate(checkinDate);
		booking.setComment(comment);
		return bookingRepository.save(booking);
	}

	public Booking updateStatusAndRemark(Long bookingId, String status, String remark) {
		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new RuntimeException("Booking not found"));

		booking.setStatus(status);
		booking.setRemark(remark);
		return bookingRepository.save(booking);
	}

	// Get all bookings
	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}

	// Get all bookings for PGs owned by the current owner
//    public List<Booking> getBookingsForOwner(String ownerEmail) {
//        User owner = userRepository.findByEmail(ownerEmail)
//                .orElseThrow(() -> new RuntimeException("Owner not found"));
//
//        List<PG> ownerPgs = pgRepository.findByOwner(owner);
//        return bookingRepository.findAll().stream()
//                .filter(b -> ownerPgs.contains(b.getPg()))
//                .collect(Collectors.toList());
//    }

    public List<BookingResponseDTO> getBookingsForOwner(String ownerEmail) {
        List<Booking> bookings = bookingRepository.findByPgOwnerEmail(ownerEmail);
        return bookings.stream().map(b -> {
        	BookingResponseDTO dto = new BookingResponseDTO();
            dto.setId(b.getId());
            dto.setComment(b.getComment());
            dto.setStatus(b.getStatus());
            dto.setRemark(b.getRemark());
            dto.setBookingDate(b.getBookingDate());
            dto.setCheckinDate(b.getCheckinDate());

            dto.setUserName(b.getUser().getName());
            dto.setUserEmail(b.getUser().getEmail());
            dto.setUserPhone(b.getUser().getPhone());

            dto.setPgName(b.getPg().getName());
            dto.setPgLocation(b.getPg().getLocation());
            dto.setPgRent(b.getPg().getRent());
            return dto;
        }).collect(Collectors.toList());
    }
    
	public void updateBooking(Long id, String status, String remark) {
		Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));

		booking.setStatus(status);
		booking.setRemark(remark);

		bookingRepository.save(booking);
	}

}

//// Get bookings for a specific user
//public List<Booking> getBookingsByUserEmail(String email) {
//  User user = userRepository.findByEmail(email)
//          .orElseThrow(() -> new RuntimeException("User not found"));
//  return bookingRepository.findByUser(user);
//}

//public Booking bookPG(String email, Long pgId) {
//User user = userRepository.findByEmail(email)
//  .orElseThrow(() -> new RuntimeException("User not found"));
//
//PG pg = pgRepository.findById(pgId)
//  .orElseThrow(() -> new RuntimeException("PG not found"));
//
//Booking booking = new Booking(user, pg, LocalDateTime.now());
//return bookingRepository.save(booking);
//}

//public Booking bookPG(String email, Long pgId, LocalDate checkinDate, String comment) {
//User user = userRepository.findByEmail(email)
//      .orElseThrow(() -> new RuntimeException("User not found"));
//
//PG pg = pgRepository.findById(pgId)
//      .orElseThrow(() -> new RuntimeException("PG not found"));
//
//Booking booking = new Booking(user, pg, LocalDateTime.now());
//booking.setCheckinDate(checkinDate);
//booking.setComment(comment);
//return bookingRepository.save(booking);
//}