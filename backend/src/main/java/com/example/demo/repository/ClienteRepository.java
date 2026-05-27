package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entity.ClienteEntity;

public interface ClienteRepository extends CrudRepository<ClienteEntity, Long> {
    
}
