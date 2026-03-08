package com.training.repository;

import com.training.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByNameContaining(String name);
    
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    List<Product> findByStockQuantityGreaterThan(Integer quantity);
    
    @Query("SELECT p FROM Product p WHERE p.price > :minPrice ORDER BY p.price ASC")
    List<Product> findProductsAbovePrice(@Param("minPrice") BigDecimal minPrice);
}
