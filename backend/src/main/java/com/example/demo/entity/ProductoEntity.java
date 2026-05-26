package com.example.demo.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table ( name = "productos" )

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoEntity {
	
	@Id
	@GeneratedValue ( strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NonNull
	@Column(length = 150, nullable = false)
	private String nombre;
	
	private String descripcion;
	
	@NonNull
	@Column(precision = 10, scale = 2, nullable = false)
	private BigDecimal precio;
	
	private Long stock;
	
	@Column(length = 255)
	private String imagen;
	
	@ManyToOne
	@JoinColumn(name = "id_categoria", nullable = false)
	private CategoriaProductoEntity categoria;
}
