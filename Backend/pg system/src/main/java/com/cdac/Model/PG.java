package com.cdac.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class PG {
	@Id
	 @GeneratedValue
	private Long id;
    private String name;
    private String location;
    private Double price;
    private String amenities;

    @ManyToOne
    private PGOwner owner;

	public PG(Long id, String name, String location, Double price, String amenities, PGOwner owner) {
		super();
		this.id = id;
		this.name = name;
		this.location = location;
		this.price = price;
		this.amenities = amenities;
		this.owner = owner;
	}

	public PG() {
		super();
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

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getAmenities() {
		return amenities;
	}

	public void setAmenities(String amenities) {
		this.amenities = amenities;
	}

	public PGOwner getOwner() {
		return owner;
	}

	public void setOwner(PGOwner owner) {
		this.owner = owner;
	}
    
    

}
