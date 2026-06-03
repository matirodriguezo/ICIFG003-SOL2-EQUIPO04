package com.example.demo.dto;

import java.util.List;

public class CheckoutResponse {
    private Long carritoId;
    private String fecha;
    private String clienteNombre;
    private String clienteCorreo;
    private Long total;
    private List<ItemResponse> items;

    public Long getCarritoId() { return carritoId; }
    public void setCarritoId(Long carritoId) { this.carritoId = carritoId; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public String getClienteNombre() { return clienteNombre; }
    public void setClienteNombre(String clienteNombre) { this.clienteNombre = clienteNombre; }
    public String getClienteCorreo() { return clienteCorreo; }
    public void setClienteCorreo(String clienteCorreo) { this.clienteCorreo = clienteCorreo; }
    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }
    public List<ItemResponse> getItems() { return items; }
    public void setItems(List<ItemResponse> items) { this.items = items; }

    public static class ItemResponse {
        private String productoNombre;
        private Long cantidad;
        private Long precioUnitario;
        private Long subtotal;

        public String getProductoNombre() { return productoNombre; }
        public void setProductoNombre(String productoNombre) { this.productoNombre = productoNombre; }
        public Long getCantidad() { return cantidad; }
        public void setCantidad(Long cantidad) { this.cantidad = cantidad; }
        public Long getPrecioUnitario() { return precioUnitario; }
        public void setPrecioUnitario(Long precioUnitario) { this.precioUnitario = precioUnitario; }
        public Long getSubtotal() { return subtotal; }
        public void setSubtotal(Long subtotal) { this.subtotal = subtotal; }
    }
}
