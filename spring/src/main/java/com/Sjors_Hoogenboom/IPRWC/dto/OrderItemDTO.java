package com.Sjors_Hoogenboom.IPRWC.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class OrderItemDTO {
    private UUID productId;
    private String productName;
    private int quantity;
    private BigDecimal price;
}
