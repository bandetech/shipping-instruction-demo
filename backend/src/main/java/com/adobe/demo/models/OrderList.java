package com.adobe.demo.models;

import java.util.List;

import lombok.Data;

@Data
public class OrderList {
    private List<OrderItem> orders;
    private String orderPerson;
    private String orderDate;
    private String title;
}
