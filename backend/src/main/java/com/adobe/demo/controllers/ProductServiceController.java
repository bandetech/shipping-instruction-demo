package com.adobe.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adobe.demo.models.Packaging;
import com.adobe.demo.models.Product;
import com.adobe.demo.services.PackagingService;
import com.adobe.demo.services.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ProductServiceController {

    @Autowired
    ProductService productService;
    @Autowired
    PackagingService packagingService;

    @GetMapping("/item/products")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Product> getProducts(){
        log.info("getProducts was called...");
        return productService.getProductList();
    }

    @GetMapping("/item/packaging")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Packaging> getPackaging(@RequestParam(name = "productId") Integer productId){
        log.info("getPackaging was called...");
        List<Packaging> items =  packagingService.getPackagingListByProductId(productId);
        return items;
    }
    
}
