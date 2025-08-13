package com.cdac.dto;


public class AdminStatsDTO {
    private long users;
    private long owners;
    private long pgs;

    public AdminStatsDTO(long users, long owners, long pgs) {
        this.users = users;
        this.owners = owners;
        this.pgs = pgs;
    }

    public long getUsers() {
        return users;
    }

    public long getOwners() {
        return owners;
    }

    public long getPgs() {
        return pgs;
    }
}

