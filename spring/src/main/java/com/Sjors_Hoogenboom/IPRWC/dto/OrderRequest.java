package com.Sjors_Hoogenboom.IPRWC.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String customerEmail;
    private List<OrderItemDTO> orderItems;
}
