package com.Sjors_Hoogenboom.IPRWC.controllers;

import com.Sjors_Hoogenboom.IPRWC.dto.OrderRequest;
import com.Sjors_Hoogenboom.IPRWC.entities.OrderItem;
import com.Sjors_Hoogenboom.IPRWC.entities.Orders;
import com.Sjors_Hoogenboom.IPRWC.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest) {
        String customerEmail = orderRequest.getCustomerEmail();

        List<OrderItem> orderItems = orderRequest.getOrderItems().stream().map(dto -> {
            OrderItem item = new OrderItem();
            item.setProductId(dto.getProductId());
            item.setProductName(dto.getProductName());
            item.setQuantity(dto.getQuantity());
            item.setPrice(dto.getPrice());
            return item;
        }).toList();

        Orders savedOrder = orderService.createOrder(customerEmail, orderItems);

        return ResponseEntity.ok(savedOrder);
    }
}
