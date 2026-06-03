package com.example.demo.dto;

import java.util.List;

public class CheckoutRequest {
    private String nombre;
    private String correo;
    private List<CheckoutItem> items;

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public List<CheckoutItem> getItems() { return items; }
    public void setItems(List<CheckoutItem> items) { this.items = items; }

    public static class CheckoutItem {
        private Long productoId;
        private Long cantidad;

        public Long getProductoId() { return productoId; }
        public void setProductoId(Long productoId) { this.productoId = productoId; }
        public Long getCantidad() { return cantidad; }
        public void setCantidad(Long cantidad) { this.cantidad = cantidad; }
    }
}
