package com.training.service;

import com.training.dto.ProductDTO;
import com.training.model.Product;
import com.training.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {
    
    private final ProductRepository productRepository;
    
    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<ProductDTO> getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }
    
    public Optional<ProductDTO> updateProduct(Long id, ProductDTO productDTO) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setName(productDTO.getName());
                    existingProduct.setDescription(productDTO.getDescription());
                    existingProduct.setPrice(productDTO.getPrice());
                    existingProduct.setStockQuantity(productDTO.getStockQuantity());
                    existingProduct.setCategoryId(productDTO.getCategoryId());
                    Product updatedProduct = productRepository.save(existingProduct);
                    return convertToDTO(updatedProduct);
                });
    }
    
    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Helper methods for conversion
    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setCategoryId(product.getCategoryId());
        return dto;
    }
    
    private Product convertToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStockQuantity(dto.getStockQuantity());
        product.setCategoryId(dto.getCategoryId());
        return product;
    }
}
