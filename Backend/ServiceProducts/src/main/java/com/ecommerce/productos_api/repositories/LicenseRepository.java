package com.ecommerce.productos_api.repositories;

import com.ecommerce.productos_api.model.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LicenseRepository extends JpaRepository<License, Integer>{
}
