package com.Sjors_Hoogenboom.IPRWC.dto;

import java.math.BigDecimal;
import java.util.UUID;
import lombok.Data;

@Data
public class OrderItemDTO {
    private UUID productId;
    private String productName;
    private int quantity;
    private BigDecimal price;
}
