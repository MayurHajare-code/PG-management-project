package com.cdac.Controller;



//package com.cdac.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.model.PG;
import com.cdac.service.PgService;

@RestController
@RequestMapping("/owner/pgs")
@PreAuthorize("hasRole('OWNER')")
public class PgOwnerController {

    @Autowired
    private PgService pgService;

    @PostMapping("/add")
    public ResponseEntity<PG> addPg(@RequestBody PG pg, Principal principal) {
        return ResponseEntity.ok(pgService.addPg(pg, principal));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PG> updatePg(@PathVariable Long id, @RequestBody PG pg, Principal principal) {
        return ResponseEntity.ok(pgService.updatePg(id, pg, principal));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePg(@PathVariable Long id, Principal principal) {
        pgService.deletePg(id, principal);
        return ResponseEntity.ok("PG deleted successfully.");
    }

    @GetMapping
    public ResponseEntity<List<PG>> getAllPgsByOwner(Principal principal) {
        return ResponseEntity.ok(pgService.getAllPgsByOwner(principal));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PG> getPgById(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(pgService.getPgById(id, principal));
    }

}

