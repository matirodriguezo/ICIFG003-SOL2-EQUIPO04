package com.example.demo.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table ( name = "carrito" )

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarritoEntity {
	
	@Id
	@GeneratedValue ( strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Date fecha_creacion;
	
	@OneToOne
	@JoinColumn(name = "id_cliente", nullable = false)
	private ClienteEntity cliente;
	
	private Long total_carrito;
	
	@OneToMany(mappedBy = "carrito")
    private List<DetalleCarritoEntity> detalle;
}
