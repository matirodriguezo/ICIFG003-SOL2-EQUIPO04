package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@CrossOrigin(origins = "*")
public class ContactoController {
    @Autowired
    private IContactoService contactoService;

    private Logger logger = LoggerFactory.getLogger(ContactoController.class);

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ContactoEntity contacto) {
        try {
            logger.info("Guardando contacto");
            return ResponseEntity.ok(contactoService.save(contacto));
        } catch (Exception e) {
            logger.error("Error al guardar el contacto: " + e.getMessage());
            return ResponseEntity.status(400).body("Error al guardar el contacto: " + e.getMessage());
        }
    }
}
