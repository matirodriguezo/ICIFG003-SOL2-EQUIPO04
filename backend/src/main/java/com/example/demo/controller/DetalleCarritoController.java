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

import com.example.demo.entity.DetalleCarritoEntity;
import com.example.demo.interfaces.IDetalleCarritoService;

@RestController
@RequestMapping("/api/v1/entities/detalles-carrito")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"})
public class DetalleCarritoController {
    @Autowired
    private IDetalleCarritoService detalleCarritoService;

    private Logger logger = LoggerFactory.getLogger(DetalleCarritoController.class);

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            logger.info("Obteniendo todos los detalles de carrito");
            return ResponseEntity.ok(detalleCarritoService.findAll());
        } catch (Exception e) {
            logger.error("Error al obtener los detalles de carrito: " + e.getMessage());
            return ResponseEntity.status(404).body("Error al obtener los detalles de carrito: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            logger.info("Obteniendo detalle con ID: " + id);
            return ResponseEntity.ok(detalleCarritoService.findById(id));
        } catch (Exception e) {
            logger.error("Error al obtener el detalle de carrito: " + e.getMessage());
            return ResponseEntity.status(404).body("Error al obtener el detalle de carrito: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody DetalleCarritoEntity detalleCarrito) {
        try {
            logger.info("Guardando detalle de carrito con ID: " + detalleCarrito.getId());
            return ResponseEntity.ok(detalleCarritoService.save(detalleCarrito));
        } catch (Exception e) {
            logger.error("Error al guardar el detalle de carrito: " + e.getMessage());
            return ResponseEntity.status(400).body("Error al guardar el detalle de carrito: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody DetalleCarritoEntity detalleCarrito) {
        try {
            DetalleCarritoEntity existingDetalleCarrito = detalleCarritoService.findById(id);
            if (existingDetalleCarrito == null) {
                logger.error("Detalle de carrito no encontrado con ID: " + id);
                return ResponseEntity.status(404).body("Detalle de carrito no encontrado con id: " + id);
            }
            existingDetalleCarrito.setCantidad(detalleCarrito.getCantidad());
            existingDetalleCarrito.setProducto(detalleCarrito.getProducto());
            existingDetalleCarrito.setCarrito(detalleCarrito.getCarrito());
            existingDetalleCarrito.setSeleccionado(detalleCarrito.isSeleccionado());
            logger.info("Actualizando detalle de carrito con ID: " + id);
            return ResponseEntity.ok(detalleCarritoService.save(existingDetalleCarrito));
        } catch (Exception e) {
            logger.error("Error al actualizar el detalle de carrito con ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(400).body("Error al actualizar el detalle de carrito: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        try {
            DetalleCarritoEntity existingDetalleCarrito = detalleCarritoService.findById(id);
            if (existingDetalleCarrito == null) {
                logger.error("Detalle de carrito no encontrado con ID: " + id);
                return ResponseEntity.status(404).body("Detalle de carrito no encontrado con id: " + id);
            }
            detalleCarritoService.deleteById(id);
            logger.info("Detalle de carrito eliminado con ID: " + id);
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            logger.error("Error al eliminar el detalle de carrito con ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(400).body("Error al eliminar el detalle de carrito: " + e.getMessage());
        }
    }
    
}
