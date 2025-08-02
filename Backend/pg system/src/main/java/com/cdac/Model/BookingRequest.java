package com.cdac.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class BookingRequest {
	@Id
	 @GeneratedValue
	private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private PG pg;

    private String status; // PENDING, APPROVED

	public BookingRequest(Long id, User user, PG pg, String status) {
		super();
		this.id = id;
		this.user = user;
		this.pg = pg;
		this.status = status;
	}

	public BookingRequest() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public PG getPg() {
		return pg;
	}

	public void setPg(PG pg) {
		this.pg = pg;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
    

}
