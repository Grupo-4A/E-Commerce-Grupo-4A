package com.ecommerce.productos_api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@ToString(exclude = {"brand", "os", "status", "category", "compatibility", "license"}) // Evita lazy loading en toString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Os os;

    @Column(name = "ram")
    private Integer ram;

    @Column(name = "disk_space")
    private String diskSpace;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "image")
    private String image;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "on_offer")
    private Boolean onOffer = false; // Valor por defecto

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compatibility_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Compatibility compatibility;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "license_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private License license;
}