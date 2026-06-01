package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.DetalleCarritoEntity;

@Repository
public interface DetalleCarritoRepository extends CrudRepository<DetalleCarritoEntity, Long> {
    List<DetalleCarritoEntity> findByCarritoId(Long carritoId);  
}
