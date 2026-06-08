package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CheckoutRequest;
import com.example.demo.dto.CheckoutRequest.CheckoutItem;
import com.example.demo.dto.CheckoutResponse;
import com.example.demo.dto.CheckoutResponse.ItemResponse;
import com.example.demo.entity.CarritoEntity;
import com.example.demo.entity.ClienteEntity;
import com.example.demo.entity.DetalleCarritoEntity;
import com.example.demo.entity.ProductoEntity;
import com.example.demo.repository.CarritoRepository;
import com.example.demo.repository.ClienteRepository;
import com.example.demo.repository.DetalleCarritoRepository;
import com.example.demo.repository.ProductoRepository;

@RestController
@RequestMapping("/api/v1/checkout")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:8080" })
public class CheckoutController {

    @Autowired
    private ClienteRepository clienteRepo;

    @Autowired
    private CarritoRepository carritoRepo;

    @Autowired
    private DetalleCarritoRepository detalleRepo;

    @Autowired
    private ProductoRepository productRepo;

    @PostMapping
    public ResponseEntity<?> checkout(@RequestBody CheckoutRequest request) {
        try {
            // 1. Validar campos obligatorios
            if (request.getRut() == null || request.getRut().trim().isEmpty()) {
                return ResponseEntity.status(400).body("El RUT es obligatorio");
            }
            if (request.getNombre() == null || request.getNombre().trim().isEmpty()) {
                return ResponseEntity.status(400).body("El nombre es obligatorio");
            }
            if (request.getApellido() == null || request.getApellido().trim().isEmpty()) {
                return ResponseEntity.status(400).body("El apellido es obligatorio");
            }
            if (request.getCorreo() == null || request.getCorreo().trim().isEmpty()) {
                return ResponseEntity.status(400).body("El correo es obligatorio");
            }
            if (request.getTelefono() == null || request.getTelefono().trim().isEmpty()) {
                return ResponseEntity.status(400).body("El tel\u00e9fono es obligatorio");
            }
            if (request.getItems() == null || request.getItems().isEmpty()) {
                return ResponseEntity.status(400).body("Debe incluir al menos un producto");
            }

            // 2. Crear cliente
            ClienteEntity cliente = new ClienteEntity();
            cliente.setRut(request.getRut());
            cliente.setNombre(request.getNombre());
            cliente.setApellido(request.getApellido());
            cliente.setCorreo(request.getCorreo());
            cliente.setTelefono(request.getTelefono());
            cliente.setDireccion(request.getDireccion() != null ? request.getDireccion() : "");
            cliente.setFecha_registro(new Date());
            cliente = clienteRepo.save(cliente);

            // 3. Calcular subtotal, descuento, envío y crear carrito
            Long subtotalFinal = 0L;
            Long descuento = 0L;
            Long costoEnvio = 3990L; // Por defecto
            List<DetalleCarritoEntity> detalles = new ArrayList<>();
            List<ItemResponse> itemResponses = new ArrayList<>();

            String codigo = request.getCodigoPromocional() != null ? request.getCodigoPromocional().trim().toUpperCase()
                    : "";

            for (CheckoutItem item : request.getItems()) {
                Optional<ProductoEntity> optProduct = productRepo.findById(item.getProductoId());
                if (optProduct.isEmpty()) {
                    return ResponseEntity.status(400).body("Producto no encontrado con id: " + item.getProductoId());
                }
                ProductoEntity product = optProduct.get();
                Long subtotalItem = product.getPrecio().longValue() * item.getCantidad();
                subtotalFinal += subtotalItem;

                // Aplicar descuento PET20 a productos premium
                if ("PET20".equals(codigo) && product.getNombre().toLowerCase().contains("premium")) {
                    descuento += (long) (subtotalItem * 0.20);
                }

                ItemResponse ir = new ItemResponse();
                ir.setProductoNombre(product.getNombre());
                ir.setCantidad(item.getCantidad());
                ir.setPrecioUnitario(product.getPrecio().longValue());
                ir.setSubtotal(subtotalItem);
                itemResponses.add(ir);
            }

            // Lógica de Envío Gratis
            if (subtotalFinal > 30000) {
                costoEnvio = 0L;
            }

            // Lógica Regalo Sorpresa
            if ("NUEVO".equals(codigo)) {
                ItemResponse regalo = new ItemResponse();
                regalo.setProductoNombre("Regalo Sorpresa");
                regalo.setCantidad(1L);
                regalo.setPrecioUnitario(0L);
                regalo.setSubtotal(0L);
                itemResponses.add(regalo);
            }

            Long total = subtotalFinal - descuento + costoEnvio;

            CarritoEntity carrito = new CarritoEntity();
            carrito.setFecha_creacion(new Date());
            carrito.setCliente(cliente);
            carrito.setTotal_carrito(total);
            carrito.setDetalle(new ArrayList<>());
            carrito = carritoRepo.save(carrito);

            // 3. Crear detalles del carrito
            for (int i = 0; i < request.getItems().size(); i++) {
                CheckoutItem item = request.getItems().get(i);
                ProductoEntity product = productRepo.findById(item.getProductoId()).get();

                DetalleCarritoEntity detalle = new DetalleCarritoEntity();
                detalle.setCarrito(carrito);
                detalle.setProducto(product);
                detalle.setCantidad(item.getCantidad());
                detalle.setSeleccionado(true);
                detalle = detalleRepo.save(detalle);
                detalles.add(detalle);
            }

            // 4. Construir respuesta
            CheckoutResponse response = new CheckoutResponse();
            response.setCarritoId(carrito.getId());
            response.setFecha(carrito.getFecha_creacion().toString());
            response.setClienteRut(cliente.getRut());
            response.setClienteNombre(cliente.getNombre());
            response.setClienteApellido(cliente.getApellido());
            response.setClienteCorreo(cliente.getCorreo());
            response.setClienteTelefono(cliente.getTelefono());
            response.setClienteDireccion(cliente.getDireccion());
            response.setSubtotal(subtotalFinal);
            response.setDescuento(descuento);
            response.setCostoEnvio(costoEnvio);
            response.setTotal(total);
            response.setItems(itemResponses);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al procesar la compra: " + e.getMessage());
        }
    }
}
