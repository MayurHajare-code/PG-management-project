package com.cdac.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.Model.BookingRequest;

public interface BookingRequestRepository extends JpaRepository<BookingRequest, Long> {

	List<BookingRequest> findByUserId(Long userId);

	List<BookingRequest> findByPgOwnerId(Long ownerId);
	
}


