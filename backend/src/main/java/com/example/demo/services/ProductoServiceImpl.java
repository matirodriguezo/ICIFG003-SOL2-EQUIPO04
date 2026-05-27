package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entity.ProductoEntity;
import com.example.demo.interfaces.IProductoService;
import com.example.demo.repository.ProductoRepository;

public class ProductoServiceImpl implements IProductoService {

    @Autowired
	private ProductoRepository ProductoRepo;

	@Override
	public List<ProductoEntity> findAll() {
		Iterable<ProductoEntity> ipro = ProductoRepo.findAll();
		return (List<ProductoEntity>)ipro;
	}

	@Override
	public ProductoEntity findById(Long id) {
		Optional<ProductoEntity> opro = ProductoRepo.findById(id);
		return opro.orElse(null);
	}

	@Override
	public ProductoEntity save(ProductoEntity producto) {
		return ProductoRepo.save(producto);
	}

	@Override
	public void deleteById(long id) {
		ProductoRepo.deleteById(id);
	}
    
}
