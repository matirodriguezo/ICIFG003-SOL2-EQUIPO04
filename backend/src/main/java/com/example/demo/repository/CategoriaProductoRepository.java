package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CategoriaProductoEntity;

@Repository
public interface CategoriaProductoRepository extends CrudRepository<CategoriaProductoEntity, Long> {
    
}
