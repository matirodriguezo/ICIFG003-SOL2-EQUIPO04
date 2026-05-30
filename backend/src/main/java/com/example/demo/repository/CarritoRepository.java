package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entity.CarritoEntity;

public interface CarritoRepository extends CrudRepository<CarritoEntity, Long> {
    
}
