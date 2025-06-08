package com.ecommerce.productos_api.repositories;

import com.ecommerce.productos_api.model.Os;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OsRepository extends JpaRepository<Os, Integer>{
}
