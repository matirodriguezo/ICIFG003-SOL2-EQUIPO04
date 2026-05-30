package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ProductoEntity;
import com.example.demo.interfaces.IProductoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/entities/productos")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"})
public class ProductoController {
    @Autowired
    private IProductoService productoService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            return ResponseEntity.ok(productoService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error al obtener los productos: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productoService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error al obtener el producto: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ProductoEntity producto) {
        try {
            return ResponseEntity.ok(productoService.save(producto));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al guardar el producto: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProductoEntity producto) {
        try {
            ProductoEntity existingProducto = productoService.findById(id);
            if (existingProducto == null) {
                return ResponseEntity.status(404).body("Producto no encontrado con id: " + id);
            }
            existingProducto.setNombre(producto.getNombre());
            existingProducto.setDescripcion(producto.getDescripcion());
            existingProducto.setPrecio(producto.getPrecio());
            existingProducto.setStock(producto.getStock());
            existingProducto.setImagen(producto.getImagen());
            existingProducto.setCategoria(producto.getCategoria());
            return ResponseEntity.ok(productoService.save(existingProducto));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error al actualizar el producto: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        try {
            ProductoEntity existingProducto = productoService.findById(id);
            if (existingProducto == null) {
                return ResponseEntity.status(404).body("Producto no encontrado con id: " + id);
            }
            productoService.deleteById(id);
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error al eliminar el producto: " + e.getMessage());
        }
    }
}
