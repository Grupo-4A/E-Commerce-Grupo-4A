package com.ecommerce.productos_api.repositories;

import com.ecommerce.productos_api.model.Compatibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompatibilityRepository extends JpaRepository<Compatibility, Integer> {
}
