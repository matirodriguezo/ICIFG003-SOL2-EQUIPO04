package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.CategoriaProductoEntity;
import com.example.demo.interfaces.ICategoriaProductoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/v1/entities/categorias")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"})
public class CategoriaProductoController {
    @Autowired
    private ICategoriaProductoService categoriaProductoService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            return ResponseEntity.ok(categoriaProductoService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error al obtener las categorías de productos: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(categoriaProductoService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error al obtener la categoría de producto: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody CategoriaProductoEntity categoria) {
        try {
            return ResponseEntity.ok(categoriaProductoService.save(categoria));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al guardar la categoría de producto: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CategoriaProductoEntity categoria) {
        try {
            CategoriaProductoEntity existingCategoria = categoriaProductoService.findById(id);
            if (existingCategoria == null) {
                return ResponseEntity.status(404).body("Categoría de producto no encontrada con id: " + id);
            }
            existingCategoria.setNombre_categoria(categoria.getNombre_categoria());
            existingCategoria.setDescripcion(categoria.getDescripcion());
            existingCategoria.setProductos(categoria.getProductos());
            return ResponseEntity.ok(categoriaProductoService.save(existingCategoria));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al actualizar la categoría de producto: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            CategoriaProductoEntity existingCategoria = categoriaProductoService.findById(id);
            if (existingCategoria == null) {
                return ResponseEntity.status(404).body("Categoría de producto no encontrada con id: " + id);
            }
            categoriaProductoService.deleteById(id);
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error al eliminar la categoría de producto: " + e.getMessage());
        }
    }
}
