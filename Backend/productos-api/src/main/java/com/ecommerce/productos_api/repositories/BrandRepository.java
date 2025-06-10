package com.ecommerce.productos_api.repositories;

import com.ecommerce.productos_api.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    // No necesitamos métodos personalizados aquí si solo haremos CRUD básico para marcas
}