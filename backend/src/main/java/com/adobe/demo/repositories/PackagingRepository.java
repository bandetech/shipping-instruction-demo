package com.adobe.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adobe.demo.models.Packaging;

@Repository
public interface PackagingRepository extends JpaRepository<Packaging, Integer> {
    List<Packaging> findByProductId(Integer productId);
}
