package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.DetalleCarritoEntity;

public interface IDetalleCarritoService {
    List<DetalleCarritoEntity> findAll();

	DetalleCarritoEntity findById(Long id);

	DetalleCarritoEntity save(DetalleCarritoEntity detalle);

	void deleteById(long id);
}