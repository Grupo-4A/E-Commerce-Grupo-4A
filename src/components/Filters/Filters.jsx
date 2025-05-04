import React from "react";
import styles from "./Filters.module.css";

const Filters = () => {
  return (
    <div className={styles.filtersContainer}>
      <p className={styles.title}>Filtrar por:</p>

      {/* Marca */}
      <p className={styles.subtitle}>Marca</p>
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Apple</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> HP</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Lenovo</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Dell</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Asus</label>
      </div>

      {/* Rango de Precio */}
      <p className={styles.subtitle}>Rango de Precio</p>
      <div className={styles.rangeGroup}>
        <input type="number" placeholder="Mínimo $" className={styles.rangeInput} />
        <input type="number" placeholder="Máximo $" className={styles.rangeInput} />
      </div>

      {/* Estado del Producto */}
      <p className={styles.subtitle}>Estado</p>
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Nuevo</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Usado</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Reacondicionado</label>
      </div>

      {/* Categoría */}
      <p className={styles.subtitle}>Categoría</p>
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Hardware</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Software</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Plantilla Frontend</label>
      </div>

      {/* Compatibilidad */}
      <p className={styles.subtitle}>Compatibilidad</p>
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Windows</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> macOS</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Linux</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Android</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> iOS</label>
      </div>

      {/* RAM */}
      <p className={styles.subtitle}>RAM</p>
      <select>
        <option value="" disabled>Selecciona RAM</option>
        <option value="4">4GB</option>
        <option value="8">8GB</option>
        <option value="16">16GB</option>
        <option value="32">32GB</option>
      </select>

      {/* Espacio en Disco */}
      <p className={styles.subtitle}>Espacio en Disco (mínimo requerido)</p>
      <select>
        <option value="" disabled>Selecciona espacio</option>
        <option value="32">32GB</option>
        <option value="64">64GB</option>
        <option value="128">128GB</option>
        <option value="256">256GB</option>
        <option value="512">512GB</option>
        <option value="1000">1TB</option>
      </select>

      {/* Licencia */}
      <p className={styles.subtitle}>Licencia</p>
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Libre</label>
        <label className={styles.checkboxLabel}><input type="checkbox" /> Propietaria</label>
      </div>
    </div>
  );
};

export default Filters;
