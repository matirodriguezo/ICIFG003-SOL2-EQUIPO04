package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entity.CategoriaProductoEntity;
import com.example.demo.entity.ProductoEntity;
import com.example.demo.interfaces.ICategoriaProductoService;
import com.example.demo.repository.CategoriaProductoRepository;
import com.example.demo.repository.ProductoRepository;

public class CategoriaProductoServiceImpl implements ICategoriaProductoService {

    @Autowired
    private CategoriaProductoRepository CategoriaRepo;

    @Autowired
    private ProductoRepository ProductoRepo;

    @Override
    public List<CategoriaProductoEntity> findAll() {
        Iterable<CategoriaProductoEntity> icat = CategoriaRepo.findAll();
		return (List<CategoriaProductoEntity>)icat;
    }

    @Override
    public CategoriaProductoEntity findById(Long id) {
        Optional<CategoriaProductoEntity> ocat = CategoriaRepo.findById(id);
		return ocat.orElse(null);
    }

    @Override
    public CategoriaProductoEntity save(CategoriaProductoEntity categoria) {
        return CategoriaRepo.save(categoria);
    }

    @Override
    public void deleteById(long id) {
        CategoriaRepo.deleteById(id);
    }

    @Override
    public List<ProductoEntity> findProductoByCategoriaId(int categoriaId) {
        return ProductoRepo.findByCategoria(categoriaId);
    }
    
}
