package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entity.CategoriaProductoEntity;

public interface CategoriaProductoRepository extends CrudRepository<CategoriaProductoEntity, Long> {
    
}
