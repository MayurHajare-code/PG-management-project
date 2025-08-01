package com.cdac.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

//User.java
@Entity
public class User {
 @Id
 @GeneratedValue
 private Long id;
 private String username;
 private String password;
 private String email;
 
 
 
 public User() {
	super();
}
 public User(Long id, String username, String password, String email) {
	super();
	this.id = id;
	this.username = username;
	this.password = password;
	this.email = email;
}
 public Long getId() {
	return id;
 }
 public void setId(Long id) {
	this.id = id;
 }
 public String getUsername() {
	return username;
 }
 public void setUsername(String username) {
	this.username = username;
 }
 public String getPassword() {
	return password;
 }
 public void setPassword(String password) {
	this.password = password;
 }
 public String getEmail() {
	return email;
 }
 public void setEmail(String email) {
	this.email = email;
 }

 
}