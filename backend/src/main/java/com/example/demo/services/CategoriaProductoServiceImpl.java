package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.CategoriaProductoEntity;
import com.example.demo.entity.ProductoEntity;
import com.example.demo.interfaces.ICategoriaProductoService;
import com.example.demo.repository.CategoriaProductoRepository;
import com.example.demo.repository.ProductoRepository;

@Service
public class CategoriaProductoServiceImpl implements ICategoriaProductoService {

    @Autowired
    private CategoriaProductoRepository categoriaRepo;

    @Autowired
    private ProductoRepository ProductoRepo;

    @Override
    public List<CategoriaProductoEntity> findAll() {
        Iterable<CategoriaProductoEntity> icat = categoriaRepo.findAll();
		return (List<CategoriaProductoEntity>)icat;
    }

    @Override
    public CategoriaProductoEntity findById(Long id) {
        Optional<CategoriaProductoEntity> ocat = categoriaRepo.findById(id);
		return ocat.orElse(null);
    }

    @Override
    public CategoriaProductoEntity save(CategoriaProductoEntity categoria) {
        return categoriaRepo.save(categoria);
    }

    @Override
    public void deleteById(long id) {
        categoriaRepo.deleteById(id);
    }

    @Override
    public List<ProductoEntity> findProductoByCategoriaId(Long categoriaId) {
        CategoriaProductoEntity categoria = categoriaRepo.findById(categoriaId).orElse(null);
        if (categoria == null) return List.of();
        return ProductoRepo.findByCategoria(categoria);
    }
    
}
