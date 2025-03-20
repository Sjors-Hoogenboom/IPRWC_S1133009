package com.Sjors_Hoogenboom.IPRWC.services;

import com.Sjors_Hoogenboom.IPRWC.entities.OrderItem;
import com.Sjors_Hoogenboom.IPRWC.entities.Orders;
import com.Sjors_Hoogenboom.IPRWC.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Orders createOrder(String customerEmail, List<OrderItem> items) {
        Orders order = new Orders();
        order.setCustomerEmail(customerEmail);
        order.setCreatedAt(LocalDateTime.now());

        BigDecimal totalPrice = items.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalPrice(totalPrice);

        items.forEach(item -> item.setOrder(order));
        order.setOrderItems(items);

        return orderRepository.save(order);
    }
}
