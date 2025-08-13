package com.cdac.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class PG {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String location;
	private double rent;

	@ManyToOne
	@JoinColumn(name = "owner_id")
	@JsonBackReference
	private User owner;

	public PG() {
		super();
	}

	public PG(Long id, String name, String location, double rent, User owner) {
		super();
		this.id = id;
		this.name = name;
		this.location = location;
		this.rent = rent;
		this.owner = owner;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public double getRent() {
		return rent;
	}

	public void setRent(double rent) {
		this.rent = rent;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}
	
	
	
//	@Lob
//	private byte[] imageData;
//
//	public byte[] getImageData() {
//	    return imageData;
//	}
//
//	public void setImageData(byte[] imageData) {
//	    this.imageData = imageData;
//	}

	
	

}
