package com.cdac.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingResponseDTO {
	 private Long id;
	    private String comment;
	    private String status;
	    private String remark;
	    private LocalDateTime bookingDate;
	    private LocalDate checkinDate;

	    private String userName;
	    private String userEmail;
	    private String userPhone;

	    private String pgName;
	    private String pgLocation;
	    private double pgRent;
	    
		public BookingResponseDTO(Long id, String comment, String status, String remark, LocalDateTime bookingDate,
				LocalDate checkinDate, String userName, String userEmail, String userPhone, String pgName,
				String pgLocation, int pgRent) {
			super();
			this.id = id;
			this.comment = comment;
			this.status = status;
			this.remark = remark;
			this.bookingDate = bookingDate;
			this.checkinDate = checkinDate;
			this.userName = userName;
			this.userEmail = userEmail;
			this.userPhone = userPhone;
			this.pgName = pgName;
			this.pgLocation = pgLocation;
			this.pgRent = pgRent;
		}

		public BookingResponseDTO() {
			super();
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getComment() {
			return comment;
		}

		public void setComment(String comment) {
			this.comment = comment;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getRemark() {
			return remark;
		}

		public void setRemark(String remark) {
			this.remark = remark;
		}

		public LocalDateTime getBookingDate() {
			return bookingDate;
		}

		public void setBookingDate(LocalDateTime bookingDate) {
			this.bookingDate = bookingDate;
		}

		public LocalDate getCheckinDate() {
			return checkinDate;
		}

		public void setCheckinDate(LocalDate checkinDate) {
			this.checkinDate = checkinDate;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public String getUserEmail() {
			return userEmail;
		}

		public void setUserEmail(String userEmail) {
			this.userEmail = userEmail;
		}

		public String getUserPhone() {
			return userPhone;
		}

		public void setUserPhone(String userPhone) {
			this.userPhone = userPhone;
		}

		public String getPgName() {
			return pgName;
		}

		public void setPgName(String pgName) {
			this.pgName = pgName;
		}

		public String getPgLocation() {
			return pgLocation;
		}

		public void setPgLocation(String pgLocation) {
			this.pgLocation = pgLocation;
		}

		public double getPgRent() {
			return pgRent;
		}

		public void setPgRent(double pgRent) {
			this.pgRent = pgRent;
		}

	
}
