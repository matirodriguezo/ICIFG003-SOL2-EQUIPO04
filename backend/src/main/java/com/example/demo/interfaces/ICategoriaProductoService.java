package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.CategoriaProductoEntity;
import com.example.demo.entity.ProductoEntity;

public interface ICategoriaProductoService {
    List<CategoriaProductoEntity> findAll();

	CategoriaProductoEntity findById(Long id);

	CategoriaProductoEntity save(CategoriaProductoEntity categoria);

	void deleteById(long id);

	List<ProductoEntity> findProductoByCategoriaId(int categoriaId);
}
