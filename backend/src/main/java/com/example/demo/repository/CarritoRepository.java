package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CarritoEntity;

@Repository
public interface CarritoRepository extends CrudRepository<CarritoEntity, Long> {
    
}
