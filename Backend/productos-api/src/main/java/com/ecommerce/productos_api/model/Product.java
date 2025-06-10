package com.ecommerce.productos_api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // ¡Importante!

@Entity
@Table(name = "products") // Nombre de la tabla en la DB
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // <-- ¡Aquí está la corrección!
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY) // Relación Muchos a Uno con Brand
    @JoinColumn(name = "brand_id") // Columna de clave foránea
    private Brand brand; // Objeto Brand para acceder a sus propiedades

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id")
    private Os os;

    @Column(name = "ram")
    private Integer ram;

    @Column(name = "disk_space")
    private String diskSpace; // Mapped to TEXT in DB

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "image")
    private String image;

    @Column(name = "description", columnDefinition = "TEXT") // Para descripciones largas
    private String description;

    @Column(name = "on_offer")
    private Boolean onOffer; // Mapped to BOOLEAN/TINYINT in DB

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id")
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compatibility_id")
    private Compatibility compatibility;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "license_id")
    private License license;
}