package com.cdac.service;



import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.model.PG;
import com.cdac.model.User;
import com.cdac.repository.PgRepository;
import com.cdac.repository.UserRepository;

@Service
public class PgService {

    @Autowired
    private PgRepository pgRepository;

    @Autowired
    private UserRepository userRepository;

    public PG addPg(PG pg, Principal principal) {
        User owner = getOwner(principal);
        pg.setOwner(owner);
        return pgRepository.save(pg);
    }

    public PG updatePg(Long id, PG updatedPg, Principal principal) {
        PG existingPg = pgRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PG not found"));

        if (!existingPg.getOwner().getEmail().equals(principal.getName())) {
            throw new RuntimeException("Unauthorized to update this PG");
        }

        existingPg.setName(updatedPg.getName());
        existingPg.setLocation(updatedPg.getLocation());
        existingPg.setRent(updatedPg.getRent());

        return pgRepository.save(existingPg);
    }

    public void deletePg(Long id, Principal principal) {
        PG pg = pgRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PG not found"));

        if (!pg.getOwner().getEmail().equals(principal.getName())) {
            throw new RuntimeException("Unauthorized to delete this PG");
        }

        pgRepository.delete(pg);
    }

    public List<PG> getAllPgsByOwner(Principal principal) {
        User owner = getOwner(principal);
        return pgRepository.findByOwner(owner);
    }

    private User getOwner(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Owner not found"));
    }
    
    public PG getPgById(Long id, Principal principal) {
        Optional<PG> pgOpt = pgRepository.findById(id);
        if (pgOpt.isPresent()) {
            PG pg = pgOpt.get();
            if (pg.getOwner().getEmail().equals(principal.getName())) {
                return pg;
            } else {
                throw new RuntimeException("Unauthorized access");
            }
        } else {
            throw new RuntimeException("PG not found");
        }
    }

    
    
    public List<PG> getAllPGs() {
        return pgRepository.findAll();
    }

    public Optional<PG> getPGByIdForUser(Long id) {
        return pgRepository.findById(id);
    }


}
