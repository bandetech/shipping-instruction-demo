package com.adobe.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adobe.demo.models.Packaging;
import com.adobe.demo.models.Product;
import com.adobe.demo.repositories.PackagingRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PackagingService {
    @Autowired
    private PackagingRepository packagingRepository;
    @Autowired
    private ProductService productService;

    public List<Packaging> getPackagingListByProductName(String name){
        try{
            Product product = productService.getProduct(name);
            return packagingRepository.findByProductId(product.getId());
        }catch (Exception ex){
            log.error("Got Exception :{}", ex);
            return null;
        }
        
    }

    public List<Packaging> getPackagingListByProductId(Integer productId){
        return packagingRepository.findByProductId(productId);
    }
}
