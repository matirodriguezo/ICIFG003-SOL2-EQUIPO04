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

import com.example.demo.entity.ClienteEntity;
import com.example.demo.interfaces.IClienteService;

@RestController
@RequestMapping("/api/v1/entities/clientes")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"})
public class ClienteController {
    @Autowired
    private IClienteService clienteService;

    private Logger logger = LoggerFactory.getLogger(ClienteController.class);

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            logger.info("Obteniendo todos los clientes");
            return ResponseEntity.ok(clienteService.findAll());
        } catch (Exception e) {
            logger.error("Error al obtener los clientes: " + e.getMessage());
            return ResponseEntity.status(404).body("Error al obtener los clientes: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            logger.info("Obteniendo cliente con ID: " + id);
            return ResponseEntity.ok(clienteService.findById(id));
        } catch (Exception e) {
            logger.error("Error al obtener el cliente: " + e.getMessage());
            return ResponseEntity.status(404).body("Error al obtener el cliente: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ClienteEntity cliente) {
        try {
            logger.info("Guardando cliente con RUT: " + cliente.getRut());
            return ResponseEntity.ok(clienteService.save(cliente));
        } catch (Exception e) {
            logger.error("Error al guardar el cliente: " + e.getMessage());
            return ResponseEntity.status(400).body("Error al guardar el cliente: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ClienteEntity cliente) {
        try {
            logger.info("Actualizando cliente con ID: " + id);
            ClienteEntity existingCliente = clienteService.findById(id);
            if (existingCliente == null) {
                return ResponseEntity.status(404).body("Cliente no encontrado con id: " + id);
            }
            existingCliente.setRut(cliente.getRut());
            existingCliente.setNombre(cliente.getNombre());
            existingCliente.setApellido(cliente.getApellido());
            existingCliente.setCorreo(cliente.getCorreo());
            existingCliente.setTelefono(cliente.getTelefono());
            existingCliente.setDireccion(cliente.getDireccion());
            return ResponseEntity.ok(clienteService.save(existingCliente));
        } catch (Exception e) {
            logger.error("Error al actualizar el cliente con ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(400).body("Error al actualizar el cliente: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            logger.info("Eliminando cliente con ID: " + id);
            ClienteEntity existingCliente = clienteService.findById(id);
            if (existingCliente == null) {
                logger.error("Cliente no encontrado con id: " + id);
                return ResponseEntity.status(404).body("Cliente no encontrado con id: " + id);
            }
            clienteService.deleteById(id);
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            logger.error("Error al eliminar el cliente con ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(400).body("Error al eliminar el cliente: " + e.getMessage());
        }
    }
}
