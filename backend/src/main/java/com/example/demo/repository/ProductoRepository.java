package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CategoriaProductoEntity;
import com.example.demo.entity.ProductoEntity;

@Repository
public interface ProductoRepository extends CrudRepository<ProductoEntity, Long>{
	List<ProductoEntity> findByCategoria(CategoriaProductoEntity categoria);
}
