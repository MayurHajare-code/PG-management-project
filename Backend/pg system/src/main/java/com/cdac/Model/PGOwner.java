package com.cdac.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class PGOwner {
	@Id
	 @GeneratedValue
	 private Long id;
    private String ownerName;
    private String email;
    private String password;
    
	public PGOwner() {
		super();
	}

	public PGOwner(Long id, String ownerName, String email, String password) {
		super();
		this.id = id;
		this.ownerName = ownerName;
		this.email = email;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    
    
}
