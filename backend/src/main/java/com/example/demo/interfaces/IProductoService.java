package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.ProductoEntity;

public interface IProductoService {
    List<ProductoEntity> findAll();

	ProductoEntity findById(Long id);

	ProductoEntity save(ProductoEntity producto);

	void deleteById(long id);
}
