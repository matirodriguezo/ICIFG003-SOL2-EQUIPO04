package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.CarritoEntity;
import com.example.demo.interfaces.ICarritoService;

@RestController
@RequestMapping("/api/v1/entities/carritos")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"})
public class CarritoController {
    @Autowired
    private ICarritoService carritoService;

    private Logger logger = LoggerFactory.getLogger(CarritoController.class);

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            logger.info("Obteniendo todos los carritos");
            return ResponseEntity.ok(carritoService.findAll());
        } catch (Exception e) {
            logger.error("Error al obtener los carritos: " + e.getMessage());
            return ResponseEntity.status(404).body("Error al obtener los carritos: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            logger.info("Obteniendo carrito con ID: " + id);
            return ResponseEntity.ok(carritoService.findById(id));
        } catch (Exception e) {
            logger.error("Error al obtener el carrito con ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(404).body("Error al obtener el carrito: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody CarritoEntity carrito) {
        try {
            logger.info("Guardando nuevo carrito: ID " + carrito.getId());
            return ResponseEntity.ok(carritoService.save(carrito));
        } catch (Exception e) {
            logger.error("Error al guardar el carrito: " + e.getMessage());
            return ResponseEntity.status(400).body("Error al guardar el carrito: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CarritoEntity carrito) {
        try {
            logger.info("Actualizando carrito con ID: " + id);
            CarritoEntity existingCarrito = carritoService.findById(id);
            if (existingCarrito == null) {
                logger.error("Carrito no encontrado con ID" + id);
                return ResponseEntity.status(404).body("Carrito no encontrado con id: " + id);
            }
            existingCarrito.setCliente(carrito.getCliente());
            logger.info("Carrito actualizado exitosamente con ID: " + id);
            return ResponseEntity.ok(carritoService.save(existingCarrito));
        } catch (Exception e) {
            logger.error("Error al actualizar el carrito con ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(400).body("Error al actualizar el carrito: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        try {
            CarritoEntity existingCarrito = carritoService.findById(id);
            if (existingCarrito == null) {
                logger.error("Carrito no encontrado con ID: " + id);
                return ResponseEntity.status(404).body("Carrito no encontrado con id: " + id);
            }
            carritoService.deleteById(id);
            logger.info("Carrito eliminado exitosamente, ID: " + id);
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            logger.error("Error al eliminar el carrito con ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(404).body("Error al eliminar el carrito: " + e.getMessage());
        }
    }
}
