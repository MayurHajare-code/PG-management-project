package com.cdac.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    private User user;

    @ManyToOne
    @JsonManagedReference
    private PG pg;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime bookingDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkinDate;

    @Column(length = 1000)
    private String comment;

    @Column(length = 1000)
    private String remark;  // Owner's note or feedback

    private String status;  // PENDING, APPROVED, REJECTED

    // Constructors
    public Booking() {
        this.status = "PENDING"; // Default
    }

 // Add this constructor in Booking.java
    public Booking(User user, PG pg, LocalDateTime bookingDate) {
        this.user = user;
        this.pg = pg;
        this.bookingDate = bookingDate;
        this.status = "PENDING";
    }

    // Getters
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public PG getPg() {
        return pg;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public LocalDate getCheckinDate() {
        return checkinDate;
    }

    public String getComment() {
        return comment;
    }

    public String getRemark() {
        return remark;
    }

    public String getStatus() {
        return status;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setPg(PG pg) {
        this.pg = pg;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setCheckinDate(LocalDate checkinDate) {
        this.checkinDate = checkinDate;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

