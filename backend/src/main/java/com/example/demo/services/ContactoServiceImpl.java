package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.ContactoEntity;
import com.example.demo.interfaces.IContactoService;
import com.example.demo.repository.ContactoRepository;


@Service
public class ContactoServiceImpl implements IContactoService {

    @Autowired
    private ContactoRepository contactoRepo;

    @Override
    public ContactoEntity save(ContactoEntity contacto) {
        return contactoRepo.save(contacto);
    }
    
}
