package com.example.demo.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table ( name = "categorias_productos" )

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaProductoEntity {
	
	@Id
	@GeneratedValue ( strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NonNull
	@Column(length = 100, nullable = false)
	private String nombre_categoria;
	
	@Column(length = 200)
	private String descripcion;
	
	@OneToMany( mappedBy = "categoria" )
	@JsonIgnore
	private List<ProductoEntity> productos;
}
