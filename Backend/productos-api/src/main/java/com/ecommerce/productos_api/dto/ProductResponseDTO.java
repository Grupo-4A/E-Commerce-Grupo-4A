package com.ecommerce.productos_api.dto;

import com.ecommerce.productos_api.model.Product; // Necesario para el método fromEntity
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data // Genera getters, setters, toString, equals y hashCode
@NoArgsConstructor // Genera un constructor sin argumentos
@AllArgsConstructor // Genera un constructor con todos los argumentos
public class ProductResponseDTO {
    private Integer id;
    private String name;
    private Double price;
    private String image;
    private String description;
    private Boolean onOffer;
    private Integer ram;
    private String diskSpace;

    // Solo los IDs y NOMBRES de las entidades relacionadas que quieres exponer
    private Integer brandId;
    private String brandName;
    private Integer osId;
    private String osName;
    private Integer statusId;
    private String statusName;
    private Integer categoryId;
    private String categoryName;
    private Integer compatibilityId;
    private String compatibilityName;
    private Integer licenseId;
    private String licenseName;

    /**
     * Método estático para mapear un objeto Product (entidad JPA) a un ProductResponseDTO.
     * Esto carga las relaciones perezosas de forma segura para obtener sus IDs y nombres.
     * @param product La entidad Product a mapear.
     * @return Un ProductResponseDTO con los datos seleccionados.
     */
    public static ProductResponseDTO fromEntity(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId().intValue());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setImage(product.getImage());
        dto.setDescription(product.getDescription());
        dto.setOnOffer(product.getOnOffer());
        dto.setRam(product.getRam());
        dto.setDiskSpace(product.getDiskSpace());

        // Manejar las relaciones de forma segura, verificando si existen
        if (product.getBrand() != null) {
            dto.setBrandId(product.getBrand().getId());
            dto.setBrandName(product.getBrand().getName());
        }
        if (product.getOs() != null) {
            dto.setOsId(product.getOs().getId());
            dto.setOsName(product.getOs().getName());
        }
        if (product.getStatus() != null) {
            dto.setStatusId(product.getStatus().getId());
            dto.setStatusName(product.getStatus().getName());
        }
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }
        if (product.getCompatibility() != null) {
            dto.setCompatibilityId(product.getCompatibility().getId());
            dto.setCompatibilityName(product.getCompatibility().getName());
        }
        if (product.getLicense() != null) {
            dto.setLicenseId(product.getLicense().getId());
            dto.setLicenseName(product.getLicense().getName());
        }
        return dto;
    }
}