package com.ecommerce.productos_api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // ¡Importante!

@Entity
@Table(name = "brands") // Nombre de la tabla en la DB
@Data // Genera getters, setters, toString, equals y hashCode con Lombok
@NoArgsConstructor // Genera un constructor sin argumentos
@AllArgsConstructor // Genera un constructor con todos los argumentos
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // <-- ¡Aquí está la corrección!
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment para IDs
    private Integer id;

    @Column(name = "name", nullable = false, unique = true) // Nombre de la columna y restricciones
    private String name;

    // Si quieres, puedes añadir la relación con Product aquí, o solo en Product.
    // @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // private List<Product> products;
}