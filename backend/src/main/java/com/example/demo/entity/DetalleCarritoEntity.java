package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table ( name = "carrito" )

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetalleCarritoEntity {

	@Id
	@GeneratedValue ( strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_carrito", referencedColumnName = "id", nullable = false)
	private CarritoEntity carrito;
	
	@OneToOne
	@JoinColumn(name = "id_producto", nullable = false)
	private ProductoEntity id_producto;
	
	@NonNull
	@JoinColumn(nullable = false)
	private Long cantidad;
	
	private boolean seleccionado;
}
