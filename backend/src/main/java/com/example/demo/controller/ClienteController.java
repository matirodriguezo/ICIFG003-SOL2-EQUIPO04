package com.example.demo.controller;

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

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            return ResponseEntity.ok(clienteService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error al obtener los clientes: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(clienteService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error al obtener el cliente: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ClienteEntity cliente) {
        try {
            return ResponseEntity.ok(clienteService.save(cliente));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al guardar el cliente: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ClienteEntity cliente) {
        try {
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
            return ResponseEntity.status(400).body("Error al actualizar el cliente: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            ClienteEntity existingCliente = clienteService.findById(id);
            if (existingCliente == null) {
                return ResponseEntity.status(404).body("Cliente no encontrado con id: " + id);
            }
            clienteService.deleteById(id);
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al eliminar el cliente: " + e.getMessage());
        }
    }
}
