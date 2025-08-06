package com.cdac.dto;

public class BookingRequest {
    private String checkinDate;
    private String comment;

    public String getCheckinDate() {
        return checkinDate;
    }

    public String getComment() {
        return comment;
    }

    public void setCheckinDate(String checkinDate) {
        this.checkinDate = checkinDate;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}

