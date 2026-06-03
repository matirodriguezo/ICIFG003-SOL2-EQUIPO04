package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table(name = "contacto")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
	@Column(length = 100, nullable = false)
    private String nombre;

    @NonNull
	@Column(length = 150, nullable = false)
    private String email;

    @Column(length = 350)
    private String mensaje;
}
