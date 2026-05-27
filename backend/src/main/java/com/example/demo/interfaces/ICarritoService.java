package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.CarritoEntity;
import com.example.demo.entity.DetalleCarritoEntity;
import com.example.demo.entity.ProductoEntity;

public interface ICarritoService {
    List<CarritoEntity> findAll();

	CarritoEntity findById(Long id);

	CarritoEntity save(CarritoEntity cliente);

	void deleteById(long id);

    List<DetalleCarritoEntity> findDetalleByCarritoId(int carritoId);

    List<ProductoEntity> findProductoByCarritoId(int carritoId);
}
