package com.ecommerce.productos_api.controllers;

import com.ecommerce.productos_api.model.Product;
import com.ecommerce.productos_api.repositories.ProductRepository;
import com.ecommerce.productos_api.dto.ProductResponseDTO;

// Importa las entidades relacionadas (ya las tenías)
import com.ecommerce.productos_api.model.Brand;
import com.ecommerce.productos_api.model.Category;
import com.ecommerce.productos_api.model.Compatibility;
import com.ecommerce.productos_api.model.License;
import com.ecommerce.productos_api.model.Os;
import com.ecommerce.productos_api.model.Status;

// Importa los repositorios (ya los tenías)
import com.ecommerce.productos_api.repositories.BrandRepository;
import com.ecommerce.productos_api.repositories.CategoryRepository;
import com.ecommerce.productos_api.repositories.CompatibilityRepository;
import com.ecommerce.productos_api.repositories.LicenseRepository;
import com.ecommerce.productos_api.repositories.OsRepository;
import com.ecommerce.productos_api.repositories.StatusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private OsRepository osRepository;
    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private CompatibilityRepository compatibilityRepository;
    @Autowired
    private LicenseRepository licenseRepository;


    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getAllBrands() {
        return ResponseEntity.ok(brandRepository.findAll());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @GetMapping("/statuses") // Para el filtro "Estado"
    public ResponseEntity<List<Status>> getAllStatuses() {
        return ResponseEntity.ok(statusRepository.findAll());
    }

    @GetMapping("/compatibilities")
    public ResponseEntity<List<Compatibility>> getAllCompatibilities() {
        return ResponseEntity.ok(compatibilityRepository.findAll());
    }

    @GetMapping("/licenses")
    public ResponseEntity<List<License>> getAllLicenses() {
        return ResponseEntity.ok(licenseRepository.findAll());
    }
    // --- Endpoints CRUD Básicos ---

    // MODIFICADO: Agregado soporte para paginación y filtros
    @GetMapping
    public ResponseEntity<Page<ProductResponseDTO>> getAllProducts(
            @RequestParam(defaultValue = "0") int page, // Número de página (0-indexed)
            @RequestParam(defaultValue = "12") int size, // Tamaño de página (productos por página)
            @RequestParam(defaultValue = "id,asc") String[] sort, // Opcional: para ordenar
            @RequestParam(required = false) List<Integer> brandIds,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) List<Integer> statusIds, // Corresponde al filtro 'Estado'
            @RequestParam(required = false) List<Integer> categoryIds,
            @RequestParam(required = false) List<Integer> compatibilityIds,
            @RequestParam(required = false) List<Integer> ramValues,
            @RequestParam(required = false) List<String> diskSpaceValues,
            @RequestParam(required = false) List<Integer> licenseIds,
            @RequestParam(required = false) String searchTerm) { // Para la barra de búsqueda

        // Crea un objeto Pageable
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort[0]));

        // Llama al repositorio con el nuevo método de filtrado combinado
        Page<Product> productsPage = productRepository.findFilteredProducts(
                brandIds, minPrice, maxPrice, statusIds, categoryIds,
                compatibilityIds, ramValues, diskSpaceValues, licenseIds,
                searchTerm, // Pasa el término de búsqueda aquí
                pageable
        );

        // Mapea la Page de Product a Page de ProductResponseDTO
        Page<ProductResponseDTO> dtoPage = productsPage.map(ProductResponseDTO::fromEntity);

        return ResponseEntity.ok(dtoPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Integer id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(p -> ResponseEntity.ok(ProductResponseDTO.fromEntity(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setPrice(productDetails.getPrice());
                    product.setImage(productDetails.getImage());
                    product.setDescription(productDetails.getDescription());
                    product.setOnOffer(productDetails.getOnOffer());
                    product.setRam(productDetails.getRam());
                    product.setDiskSpace(productDetails.getDiskSpace());

                    // Actualizar relaciones (se asume que productDetails.getXXX() es un objeto válido o con solo ID)
                    // Para un manejo más robusto con DTOs de entrada, buscarías el objeto por ID.
                    if (productDetails.getBrand() != null) {
                        product.setBrand(productDetails.getBrand());
                    }
                    if (productDetails.getOs() != null) {
                        product.setOs(productDetails.getOs());
                    }
                    if (productDetails.getStatus() != null) {
                        product.setStatus(productDetails.getStatus());
                    }
                    if (productDetails.getCategory() != null) {
                        product.setCategory(productDetails.getCategory());
                    }
                    if (productDetails.getCompatibility() != null) {
                        product.setCompatibility(productDetails.getCompatibility());
                    }
                    if (productDetails.getLicense() != null) {
                        product.setLicense(productDetails.getLicense());
                    }

                    Product updatedProduct = productRepository.save(product);
                    return ResponseEntity.ok(updatedProduct);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Product> patchProduct(@PathVariable Integer id, @RequestBody Product productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    if (productDetails.getName() != null) {
                        product.setName(productDetails.getName());
                    }
                    if (productDetails.getPrice() != null) {
                        product.setPrice(productDetails.getPrice());
                    }
                    if (productDetails.getImage() != null) {
                        product.setImage(productDetails.getImage());
                    }
                    if (productDetails.getDescription() != null) {
                        product.setDescription(productDetails.getDescription());
                    }
                    if (productDetails.getOnOffer() != null) {
                        product.setOnOffer(productDetails.getOnOffer());
                    }
                    if (productDetails.getRam() != null) {
                        product.setRam(productDetails.getRam());
                    }
                    if (productDetails.getDiskSpace() != null) {
                        product.setDiskSpace(productDetails.getDiskSpace());
                    }

                    if (productDetails.getBrand() != null && productDetails.getBrand().getId() != null) {
                        brandRepository.findById(productDetails.getBrand().getId())
                                .ifPresent(product::setBrand);
                    }
                    if (productDetails.getOs() != null && productDetails.getOs().getId() != null) {
                        osRepository.findById(productDetails.getOs().getId())
                                .ifPresent(product::setOs);
                    }
                    if (productDetails.getStatus() != null && productDetails.getStatus().getId() != null) {
                        statusRepository.findById(productDetails.getStatus().getId())
                                .ifPresent(product::setStatus);
                    }
                    if (productDetails.getCategory() != null && productDetails.getCategory().getId() != null) {
                        categoryRepository.findById(productDetails.getCategory().getId())
                                .ifPresent(product::setCategory);
                    }
                    if (productDetails.getCompatibility() != null && productDetails.getCompatibility().getId() != null) {
                        compatibilityRepository.findById(productDetails.getCompatibility().getId())
                                .ifPresent(product::setCompatibility);
                    }
                    if (productDetails.getLicense() != null && productDetails.getLicense().getId() != null) {
                        licenseRepository.findById(productDetails.getLicense().getId())
                                .ifPresent(product::setLicense);
                    }

                    Product updatedProduct = productRepository.save(product);
                    return ResponseEntity.ok(updatedProduct);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // --- Endpoints de Filtrado Específicos (Pueden ser eliminados si getAllProducts los reemplaza) ---
    // Mantenemos estos por si aún los usas en otras partes de tu aplicación
    @GetMapping("/filter/brand/{brandId}")
    public List<ProductResponseDTO> getProductsByBrand(@PathVariable Integer brandId) {
        return productRepository.findByBrandId(brandId).stream()
                .map(ProductResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/filter/category/{categoryId}")
    public List<ProductResponseDTO> getProductsByCategory(@PathVariable Integer categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(ProductResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/filter/on-offer")
    public List<ProductResponseDTO> getProductsOnOffer(@RequestParam(defaultValue = "true") Boolean onOffer) {
        return productRepository.findByOnOffer(onOffer).stream()
                .map(ProductResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/filter/price")
    public List<ProductResponseDTO> getProductsByPriceRange(@RequestParam Double min, @RequestParam Double max) {
        return productRepository.findByPriceBetween(min, max).stream()
                .map(ProductResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<ProductResponseDTO> searchProductsByName(@RequestParam String name) {
        return productRepository.findByNameContainingIgnoreCase(name).stream()
                .map(ProductResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/filter/category/{categoryId}/brand/{brandId}")
    public List<ProductResponseDTO> getProductsByCategoryAndBrand(@PathVariable Integer categoryId, @PathVariable Integer brandId) {
        return productRepository.findByCategoryIdAndBrandId(categoryId, brandId).stream()
                .map(ProductResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }
}