package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entity.DetalleCarritoEntity;

public interface DetalleCarritoRepository extends CrudRepository<DetalleCarritoEntity, Long> {
    List<DetalleCarritoEntity> findByCarritoId(int carritoId);  
}
