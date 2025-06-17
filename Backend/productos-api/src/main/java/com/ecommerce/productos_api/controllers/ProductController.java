package com.ecommerce.productos_api.controllers;

import com.ecommerce.productos_api.model.Product;
import com.ecommerce.productos_api.repositories.ProductRepository;
import com.ecommerce.productos_api.dto.ProductResponseDTO;
import com.ecommerce.productos_api.dto.ProductCreateDTO;

// Importa las entidades relacionadas
import com.ecommerce.productos_api.model.Brand;
import com.ecommerce.productos_api.model.Category;
import com.ecommerce.productos_api.model.Compatibility;
import com.ecommerce.productos_api.model.License;
import com.ecommerce.productos_api.model.Os;
import com.ecommerce.productos_api.model.Status;

// Importa los repositorios
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

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")// Permite CORS si es necesario
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

    // Endpoints para obtener opciones de filtros
    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getAllBrands() {
        return ResponseEntity.ok(brandRepository.findAll());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @GetMapping("/statuses")
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

    @GetMapping("/operating-systems")
    public ResponseEntity<List<Os>> getAllOperatingSystems() {
        return ResponseEntity.ok(osRepository.findAll());
    }

    // --- Endpoints CRUD Básicos ---

    @GetMapping
    public ResponseEntity<Page<ProductResponseDTO>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id,asc") String[] sort,
            @RequestParam(required = false) List<Integer> brandIds,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) List<Integer> statusIds,
            @RequestParam(required = false) List<Integer> categoryIds,
            @RequestParam(required = false) List<Integer> compatibilityIds,
            @RequestParam(required = false) List<Integer> ramValues,
            @RequestParam(required = false) List<String> diskSpaceValues,
            @RequestParam(required = false) List<Integer> licenseIds,
            @RequestParam(required = false) String searchTerm) {

        try {
            Sort.Direction direction = Sort.Direction.fromString(sort[1]);
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort[0]));

            Page<Product> productsPage = productRepository.findFilteredProducts(
                    brandIds, minPrice, maxPrice, statusIds, categoryIds,
                    compatibilityIds, ramValues, diskSpaceValues, licenseIds,
                    searchTerm, pageable
            );

            Page<ProductResponseDTO> dtoPage = productsPage.map(ProductResponseDTO::fromEntity);
            return ResponseEntity.ok(dtoPage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Integer id) {
        try {
            Optional<Product> product = productRepository.findById(id);
            return product.map(p -> ResponseEntity.ok(ProductResponseDTO.fromEntity(p)))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST mejorado con DTO específico para creación
    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody @Valid ProductCreateDTO productDTO) {
        try {
            // Crear nueva instancia de Product
            Product product = new Product();

            // Asignar propiedades básicas
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setImage(productDTO.getImage());
            product.setDescription(productDTO.getDescription());
            product.setOnOffer(productDTO.getOnOffer() != null ? productDTO.getOnOffer() : false);
            product.setRam(productDTO.getRam());
            product.setDiskSpace(productDTO.getDiskSpace());

            // Validar y asignar relaciones usando los IDs
            if (productDTO.getBrandId() != null) {
                Optional<Brand> brand = brandRepository.findById(productDTO.getBrandId());
                if (brand.isPresent()) {
                    product.setBrand(brand.get());
                } else {
                    return ResponseEntity.badRequest()
                            .body("Brand con ID " + productDTO.getBrandId() + " no encontrada");
                }
            }

            if (productDTO.getOsId() != null) {
                Optional<Os> os = osRepository.findById(productDTO.getOsId());
                if (os.isPresent()) {
                    product.setOs(os.get());
                } else {
                    return ResponseEntity.badRequest()
                            .body("Sistema operativo con ID " + productDTO.getOsId() + " no encontrado");
                }
            }

            if (productDTO.getStatusId() != null) {
                Optional<Status> status = statusRepository.findById(productDTO.getStatusId());
                if (status.isPresent()) {
                    product.setStatus(status.get());
                } else {
                    return ResponseEntity.badRequest()
                            .body("Status con ID " + productDTO.getStatusId() + " no encontrado");
                }
            }

            if (productDTO.getCategoryId() != null) {
                Optional<Category> category = categoryRepository.findById(productDTO.getCategoryId());
                if (category.isPresent()) {
                    product.setCategory(category.get());
                } else {
                    return ResponseEntity.badRequest()
                            .body("Categoría con ID " + productDTO.getCategoryId() + " no encontrada");
                }
            }

            if (productDTO.getCompatibilityId() != null) {
                Optional<Compatibility> compatibility = compatibilityRepository.findById(productDTO.getCompatibilityId());
                if (compatibility.isPresent()) {
                    product.setCompatibility(compatibility.get());
                } else {
                    return ResponseEntity.badRequest()
                            .body("Compatibilidad con ID " + productDTO.getCompatibilityId() + " no encontrada");
                }
            }

            if (productDTO.getLicenseId() != null) {
                Optional<License> license = licenseRepository.findById(productDTO.getLicenseId());
                if (license.isPresent()) {
                    product.setLicense(license.get());
                } else {
                    return ResponseEntity.badRequest()
                            .body("Licencia con ID " + productDTO.getLicenseId() + " no encontrada");
                }
            }

            // Guardar el producto
            Product savedProduct = productRepository.save(product);

            // Retornar el DTO de respuesta
            ProductResponseDTO responseDTO = ProductResponseDTO.fromEntity(savedProduct);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el producto: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer id, @RequestBody ProductCreateDTO productDTO) {
        try {
            return productRepository.findById(id)
                    .map(product -> {
                        // Actualizar propiedades básicas
                        product.setName(productDTO.getName());
                        product.setPrice(productDTO.getPrice());
                        product.setImage(productDTO.getImage());
                        product.setDescription(productDTO.getDescription());
                        product.setOnOffer(productDTO.getOnOffer() != null ? productDTO.getOnOffer() : false);
                        product.setRam(productDTO.getRam());
                        product.setDiskSpace(productDTO.getDiskSpace());

                        // Actualizar relaciones
                        if (productDTO.getBrandId() != null) {
                            brandRepository.findById(productDTO.getBrandId())
                                    .ifPresent(product::setBrand);
                        }
                        if (productDTO.getOsId() != null) {
                            osRepository.findById(productDTO.getOsId())
                                    .ifPresent(product::setOs);
                        }
                        if (productDTO.getStatusId() != null) {
                            statusRepository.findById(productDTO.getStatusId())
                                    .ifPresent(product::setStatus);
                        }
                        if (productDTO.getCategoryId() != null) {
                            categoryRepository.findById(productDTO.getCategoryId())
                                    .ifPresent(product::setCategory);
                        }
                        if (productDTO.getCompatibilityId() != null) {
                            compatibilityRepository.findById(productDTO.getCompatibilityId())
                                    .ifPresent(product::setCompatibility);
                        }
                        if (productDTO.getLicenseId() != null) {
                            licenseRepository.findById(productDTO.getLicenseId())
                                    .ifPresent(product::setLicense);
                        }

                        Product updatedProduct = productRepository.save(product);
                        ProductResponseDTO responseDTO = ProductResponseDTO.fromEntity(updatedProduct);
                        return ResponseEntity.ok(responseDTO);
                    })
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar el producto: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchProduct(@PathVariable Integer id, @RequestBody ProductCreateDTO productDTO) {
        try {
            return productRepository.findById(id)
                    .map(product -> {
                        // Actualizar solo campos no nulos
                        if (productDTO.getName() != null) {
                            product.setName(productDTO.getName());
                        }
                        if (productDTO.getPrice() != null) {
                            product.setPrice(productDTO.getPrice());
                        }
                        if (productDTO.getImage() != null) {
                            product.setImage(productDTO.getImage());
                        }
                        if (productDTO.getDescription() != null) {
                            product.setDescription(productDTO.getDescription());
                        }
                        if (productDTO.getOnOffer() != null) {
                            product.setOnOffer(productDTO.getOnOffer());
                        }
                        if (productDTO.getRam() != null) {
                            product.setRam(productDTO.getRam());
                        }
                        if (productDTO.getDiskSpace() != null) {
                            product.setDiskSpace(productDTO.getDiskSpace());
                        }

                        // Actualizar relaciones si se proporcionan
                        if (productDTO.getBrandId() != null) {
                            brandRepository.findById(productDTO.getBrandId())
                                    .ifPresent(product::setBrand);
                        }
                        if (productDTO.getOsId() != null) {
                            osRepository.findById(productDTO.getOsId())
                                    .ifPresent(product::setOs);
                        }
                        if (productDTO.getStatusId() != null) {
                            statusRepository.findById(productDTO.getStatusId())
                                    .ifPresent(product::setStatus);
                        }
                        if (productDTO.getCategoryId() != null) {
                            categoryRepository.findById(productDTO.getCategoryId())
                                    .ifPresent(product::setCategory);
                        }
                        if (productDTO.getCompatibilityId() != null) {
                            compatibilityRepository.findById(productDTO.getCompatibilityId())
                                    .ifPresent(product::setCompatibility);
                        }
                        if (productDTO.getLicenseId() != null) {
                            licenseRepository.findById(productDTO.getLicenseId())
                                    .ifPresent(product::setLicense);
                        }

                        Product updatedProduct = productRepository.save(product);
                        ProductResponseDTO responseDTO = ProductResponseDTO.fromEntity(updatedProduct);
                        return ResponseEntity.ok(responseDTO);
                    })
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar parcialmente el producto: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        try {
            if (productRepository.existsById(id)) {
                productRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // --- Endpoints de Filtrado Específicos (Compatibilidad hacia atrás) ---
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