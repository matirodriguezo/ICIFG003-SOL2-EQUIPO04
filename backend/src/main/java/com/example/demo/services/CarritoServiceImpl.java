package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.CarritoEntity;
import com.example.demo.entity.DetalleCarritoEntity;
import com.example.demo.interfaces.ICarritoService;
import com.example.demo.repository.CarritoRepository;
import com.example.demo.repository.DetalleCarritoRepository;

@Service
public class CarritoServiceImpl implements ICarritoService {

    @Autowired
    private CarritoRepository CarritoRepo;

    @Autowired
    private DetalleCarritoRepository DetalleRepo;

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
    public List<DetalleCarritoEntity> findDetalleByCarritoId(Long carritoId) {
        return DetalleRepo.findByCarritoId(carritoId);
    }
    
}
