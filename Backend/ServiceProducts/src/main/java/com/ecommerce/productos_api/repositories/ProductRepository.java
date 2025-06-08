package com.ecommerce.productos_api.repositories;

import com.ecommerce.productos_api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    // NOTA: Los métodos findByBrandId, findByCategoryId, etc.,
    // aún pueden ser útiles para endpoints específicos o lógica interna,
    // pero para la función principal de filtrado combinado usaremos findFilteredProducts.

    List<Product> findByBrandId(Integer brandId);
    List<Product> findByCategoryId(Integer categoryId);
    List<Product> findByOnOffer(Boolean onOffer);
    List<Product> findByPriceBetween(Double min, Double max);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategoryIdAndBrandId(Integer categoryId, Integer brandId);

    // Query personalizada para soportar todos los filtros y la búsqueda, con paginación.
    // Usamos 'OR' con ':param IS NULL' para hacer los parámetros opcionales.
    @Query("SELECT p FROM Product p WHERE " +
            "(:brandIds IS NULL OR p.brand.id IN :brandIds) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
            "(:statusIds IS NULL OR p.status.id IN :statusIds) AND " +
            "(:categoryIds IS NULL OR p.category.id IN :categoryIds) AND " +
            "(:compatibilityIds IS NULL OR p.compatibility.id IN :compatibilityIds) AND " +
            "(:ramValues IS NULL OR p.ram IN :ramValues) AND " +
            "(:diskSpaceValues IS NULL OR p.diskSpace IN :diskSpaceValues) AND " +
            "(:licenseIds IS NULL OR p.license.id IN :licenseIds) AND " +
            "(:searchTerm IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) "
    )
    Page<Product> findFilteredProducts(
            @Param("brandIds") List<Integer> brandIds,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("statusIds") List<Integer> statusIds,
            @Param("categoryIds") List<Integer> categoryIds,
            @Param("compatibilityIds") List<Integer> compatibilityIds,
            @Param("ramValues") List<Integer> ramValues,
            @Param("diskSpaceValues") List<String> diskSpaceValues,
            @Param("licenseIds") List<Integer> licenseIds,
            @Param("searchTerm") String searchTerm,
            Pageable pageable
    );
}