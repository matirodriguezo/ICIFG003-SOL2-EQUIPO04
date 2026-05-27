package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.ClienteEntity;

public interface IClienteService {
    List<ClienteEntity> findAll();

	ClienteEntity findById(Long id);

	ClienteEntity save(ClienteEntity cliente);

	void deleteById(long id);
}
