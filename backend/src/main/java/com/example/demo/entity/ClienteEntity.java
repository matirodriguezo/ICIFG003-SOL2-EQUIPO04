package com.example.demo.entity;

import java.util.Date;

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
@Table ( name = "clientes" )

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteEntity {
	
	@Id
	@GeneratedValue ( strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NonNull
	@Column(length = 12, nullable = false)
	private String rut;
	
	@NonNull
	@Column(length = 100, nullable = false)
	private String nombre;
	
	@Column(length = 100)
	private String apellido;
	
	@NonNull
	@Column(length = 150, nullable = false)
	private String correo;
	
	@NonNull
	@Column(length = 20, nullable = false)
	private String telefono;
	
	@Column(length = 200)
	private String direccion;
	
	@NonNull
	@Column(nullable = false)
	private Date fecha_registro;
}
