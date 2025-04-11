package com.Sjors_Hoogenboom.IPRWC.dto;

import java.util.List;
import lombok.Data;

@Data
public class OrderRequest {
    private String customerEmail;
    private List<OrderItemDTO> orderItems;
}
