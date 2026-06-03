package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ContactoEntity;
@Repository

public interface ContactoRepository extends CrudRepository<ContactoEntity, Long> {
    
}
