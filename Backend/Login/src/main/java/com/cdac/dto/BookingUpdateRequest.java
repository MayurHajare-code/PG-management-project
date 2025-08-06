package com.cdac.dto;

public class BookingUpdateRequest {
    private String status;
    private String remark;

    public String getStatus() {
        return status;
    }

    public String getRemark() {
        return remark;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
