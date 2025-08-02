package com.cdac.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {}

