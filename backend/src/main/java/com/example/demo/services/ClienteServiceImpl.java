package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entity.ClienteEntity;
import com.example.demo.interfaces.IClienteService;
import com.example.demo.repository.ClienteRepository;

public class ClienteServiceImpl implements IClienteService {

    @Autowired
	private ClienteRepository ClienteRepo;

    @Override
    public List<ClienteEntity> findAll() {
        Iterable<ClienteEntity> icli = ClienteRepo.findAll();
		return (List<ClienteEntity>)icli;
    }

    @Override
    public ClienteEntity findById(Long id) {
        Optional<ClienteEntity> ocli = ClienteRepo.findById(id);
        return ocli.orElse(null);
    }

    @Override
    public ClienteEntity save(ClienteEntity cliente) {
        return ClienteRepo.save(cliente);
    }

    @Override
    public void deleteById(long id) {
        ClienteRepo.deleteById(id);
    }
    
}
