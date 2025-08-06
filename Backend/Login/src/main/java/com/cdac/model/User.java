package com.cdac.model;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String email;
	private String password;
	private String name;
	private String phone;
	private String role; // "ROLE_USER" or "ROLE_OWNER"

	@OneToMany(mappedBy = "owner")
	@JsonManagedReference
	private List<PG> pgs;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") // Optional: formats JSON response
	private LocalDateTime registerDate;

	public User() {
		super();
	}

	public User(Long id, String email, String password, String name, String phone, String role, List<PG> pgs,
			LocalDateTime registerDate) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.name = name;
		this.phone = phone;
		this.role = role;
		this.pgs = pgs;
		this.registerDate = registerDate;
	}

	public LocalDateTime getRegisterDate() {
		return registerDate;
	}

	public void setRegisterDate(LocalDateTime registerDate) {
		this.registerDate = registerDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<PG> getPgs() {
		return pgs;
	}

	public void setPgs(List<PG> pgs) {
		this.pgs = pgs;
	}

}
