package com.cdac.dto;

public class PGDetailsResponse {
    private Long pgId;
    private String name;
    private String location;
    private double rent;

    private Long ownerId;
    private String ownerName;
    private String ownerEmail;
    private String ownerPhone;
    
    
    
	public PGDetailsResponse() {
		super();
	}
	public PGDetailsResponse(Long pgId, String name, String location, double rent, Long ownerId, String ownerName,
			String ownerEmail, String ownerPhone) {
		super();
		this.pgId = pgId;
		this.name = name;
		this.location = location;
		this.rent = rent;
		this.ownerId = ownerId;
		this.ownerName = ownerName;
		this.ownerEmail = ownerEmail;
		this.ownerPhone = ownerPhone;
	}
	public Long getPgId() {
		return pgId;
	}
	public void setPgId(Long pgId) {
		this.pgId = pgId;
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
	public Long getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}
	public String getOwnerName() {
		return ownerName;
	}
	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
	public String getOwnerEmail() {
		return ownerEmail;
	}
	public void setOwnerEmail(String ownerEmail) {
		this.ownerEmail = ownerEmail;
	}
	public String getOwnerPhone() {
		return ownerPhone;
	}
	public void setOwnerPhone(String ownerPhone) {
		this.ownerPhone = ownerPhone;
	}

    
}
