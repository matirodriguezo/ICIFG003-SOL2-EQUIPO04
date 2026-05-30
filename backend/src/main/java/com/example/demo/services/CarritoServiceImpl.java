package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entity.CarritoEntity;
import com.example.demo.entity.DetalleCarritoEntity;
import com.example.demo.entity.ProductoEntity;
import com.example.demo.interfaces.ICarritoService;
import com.example.demo.repository.CarritoRepository;
import com.example.demo.repository.DetalleCarritoRepository;
import com.example.demo.repository.ProductoRepository;

public class CarritoServiceImpl implements ICarritoService {

    @Autowired
    private CarritoRepository CarritoRepo;

    @Autowired
    private DetalleCarritoRepository DetalleRepo;

    @Autowired
    private ProductoRepository ProductoRepo;

    @Override
    public List<CarritoEntity> findAll() {
        Iterable<CarritoEntity> icar = CarritoRepo.findAll();
        return (List<CarritoEntity>)icar;
    }

    @Override
    public CarritoEntity findById(Long id) {
        Optional<CarritoEntity> ocar = CarritoRepo.findById(id);
        return ocar.orElse(null);
    }

    @Override
    public CarritoEntity save(CarritoEntity carrito) {
        return CarritoRepo.save(carrito);
    }

    @Override
    public void deleteById(long id) {
        CarritoRepo.deleteById(id);
    }

    @Override
    public List<DetalleCarritoEntity> findDetalleByCarritoId(int carritoId) {
        return DetalleRepo.findByCarritoId(carritoId);
    }

    @Override
    public List<ProductoEntity> findProductoByCarritoId(int carritoId) {
        return ProductoRepo.findByCarritoId(carritoId);
    }
    
}
