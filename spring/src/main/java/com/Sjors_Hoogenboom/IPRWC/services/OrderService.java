package com.Sjors_Hoogenboom.IPRWC.services;

import com.Sjors_Hoogenboom.IPRWC.entities.OrderItem;
import com.Sjors_Hoogenboom.IPRWC.entities.Orders;
import com.Sjors_Hoogenboom.IPRWC.entities.Products;
import com.Sjors_Hoogenboom.IPRWC.repository.OrderRepository;
import com.Sjors_Hoogenboom.IPRWC.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
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

        for (OrderItem item : items) {
            Optional<Products> productOpt = productRepository.findById(item.getProductId());
            if (productOpt.isPresent()) {
                Products product = productOpt.get();
                if (product.getStock() >= item.getQuantity()) {
                    product.setStock(product.getStock() - item.getQuantity());
                    productRepository.save(product);
                } else {
                    throw new RuntimeException("Not enough stock for product: " + product.getName());
                }
            }
        }

        items.forEach(item -> item.setOrder(order));
        order.setOrderItems(items);

        return orderRepository.save(order);
    }
}
