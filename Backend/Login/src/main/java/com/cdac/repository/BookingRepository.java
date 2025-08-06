package com.cdac.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cdac.model.Booking;
import com.cdac.model.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findByUser(User user);

	List<Booking> findByPgOwnerEmail(String ownerEmail);
}

