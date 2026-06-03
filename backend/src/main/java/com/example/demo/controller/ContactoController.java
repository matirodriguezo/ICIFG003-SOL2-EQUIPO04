package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ContactoEntity;
import com.example.demo.interfaces.IContactoService;

@RestController
@RequestMapping("/api/v1/entities/contacto")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"})
public class ContactoController {
    @Autowired
    private IContactoService contactoService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ContactoEntity contacto) {
        try {
            return ResponseEntity.ok(contactoService.save(contacto));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al guardar el contacto: " + e.getMessage());
        }
    }
}
