package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entity.DetalleCarritoEntity;
import com.example.demo.interfaces.IDetalleCarritoService;
import com.example.demo.repository.DetalleCarritoRepository;

public class DetalleCarritoServiceImpl implements IDetalleCarritoService {

    @Autowired
	private DetalleCarritoRepository DetalleRepo;

    @Override
    public List<DetalleCarritoEntity> findAll() {
        Iterable<DetalleCarritoEntity> idet = DetalleRepo.findAll();
		return (List<DetalleCarritoEntity>)idet;
    }

    @Override
    public DetalleCarritoEntity findById(Long id) {
        Optional<DetalleCarritoEntity> opro = DetalleRepo.findById(id);
		return opro.orElse(null);
    }

    @Override
    public DetalleCarritoEntity save(DetalleCarritoEntity detalle) {
        return DetalleRepo.save(detalle);
    }

    @Override
    public void deleteById(long id) {
        DetalleRepo.deleteById(id);
    }
    
}
