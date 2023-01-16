package com.adobe.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adobe.demo.models.Product;
import com.adobe.demo.repositories.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;
    
    public List<Product> getProductList(){
        return repository.findAll();
    }

    public Product getProduct(String name) throws Exception {
        List<Product> list =  repository.findByName(name);
        if(list.size() == 1){
            return list.get(0);
        } else {
            throw new Exception("Duplicated products exist !");
        }
    }

}
