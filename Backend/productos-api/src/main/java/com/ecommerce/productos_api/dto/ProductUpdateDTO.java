package com.ecommerce.productos_api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductUpdateDTO {

    @Size(min = 2, max = 255, message = "El nombre debe tener entre 2 y 255 caracteres")
    private String name;

    @Positive(message = "El precio debe ser mayor a 0")
    private Double price;

    private String image;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    private String description;

    private Boolean onOffer;

    private Integer ram;

    private String diskSpace;

    // IDs de las entidades relacionadas (todos opcionales para PATCH)
    private Integer brandId;
    private Integer osId;
    private Integer statusId;
    private Integer categoryId;
    private Integer compatibilityId;
    private Integer licenseId;
}