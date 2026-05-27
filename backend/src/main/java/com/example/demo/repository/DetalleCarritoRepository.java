package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entity.DetalleCarritoEntity;

public interface DetalleCarritoRepository extends CrudRepository<DetalleCarritoEntity, Long> {
    
}
