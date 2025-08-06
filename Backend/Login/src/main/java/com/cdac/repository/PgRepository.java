package com.cdac.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cdac.model.PG;
import com.cdac.model.User;

public interface PgRepository extends JpaRepository<PG, Long> {
    List<PG> findByOwner(User owner);
}
