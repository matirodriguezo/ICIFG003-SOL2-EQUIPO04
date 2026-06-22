package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@CrossOrigin(origins = "*")
public class CategoriaProductoController {
    @Autowired
    private ICategoriaProductoService categoriaProductoService;

    private Logger logger = LoggerFactory.getLogger(CategoriaProductoController.class);

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            logger.info("Obteniendo todas las categorías de productos");
            return ResponseEntity.ok(categoriaProductoService.findAll());
        } catch (Exception e) {
            logger.error("Error al obtener las categorías de productos: " + e.getMessage());
            return ResponseEntity.status(404).body("Error al obtener las categorías de productos: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            logger.info("Obteniendo categoría de producto con ID: " + id);
            return ResponseEntity.ok(categoriaProductoService.findById(id));
        } catch (Exception e) {
            logger.error("Error al obtener la categoría de producto con ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(404).body("Error al obtener la categoría de producto: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody CategoriaProductoEntity categoria) {
        try {
            logger.info("Guardando nueva categoría de producto:" + categoria.getNombre_categoria());
            return ResponseEntity.ok(categoriaProductoService.save(categoria));
        } catch (Exception e) {
            logger.error("Error al guardar la categoría de producto: " + e.getMessage());
            return ResponseEntity.status(400).body("Error al guardar la categoría de producto: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CategoriaProductoEntity categoria) {
        try {
            logger.info("Actualizando categoría de producto" + categoria.getNombre_categoria());
            CategoriaProductoEntity existingCategoria = categoriaProductoService.findById(id);
            if (existingCategoria == null) {
                logger.error("Categoría de producto no encontrada");
                return ResponseEntity.status(404).body("Categoría de producto no encontrada con id: " + id);
            }
            existingCategoria.setNombre_categoria(categoria.getNombre_categoria());
            existingCategoria.setDescripcion(categoria.getDescripcion());
            existingCategoria.setProductos(categoria.getProductos());
            logger.info("Categoría de producto actualizada exitosamente");
            return ResponseEntity.ok(categoriaProductoService.save(existingCategoria));
        } catch (Exception e) {
            logger.error("Error al actualizar la categoría de producto " + categoria.getNombre_categoria() + ": " + e.getMessage());
            return ResponseEntity.status(400).body("Error al actualizar la categoría de producto: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            CategoriaProductoEntity existingCategoria = categoriaProductoService.findById(id);
            if (existingCategoria == null) {
                logger.error("Categoría de producto no encontrada con id: " + id);
                return ResponseEntity.status(404).body("Categoría de producto no encontrada con id: " + id);
            }
            categoriaProductoService.deleteById(id);
            logger.info("Categoría de producto eliminada exitosamente con id: " + id);
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            logger.error("Error al eliminar la categoría de producto: " + e.getMessage());
            return ResponseEntity.status(404).body("Error al eliminar la categoría de producto: " + e.getMessage());
        }
    }
}
