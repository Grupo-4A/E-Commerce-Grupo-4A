// frontend/src/services/productService.js

const API_BASE_URL = "http://localhost:9090/api";

// Función para llamar todos los productos (PAGINACIÓN, FILTROS Y BÚSQUEDA)
export const getAllProducts = async (page = 0, size = 12, filters = {}, searchTerm = '') => {
  try {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('size', size);
    params.append('sort', 'id,asc'); // Puedes hacer que el orden también sea un filtro si lo deseas

    // Añadir filtros dinámicamente
    // Asegúrate de que los IDs aquí coinciden con los de tu base de datos
    if (filters.brandIds && filters.brandIds.length > 0) {
      filters.brandIds.forEach(id => params.append('brandIds', id));
    }
    if (filters.minPrice !== null && filters.minPrice !== undefined) {
      params.append('minPrice', filters.minPrice);
    }
    if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
      params.append('maxPrice', filters.maxPrice);
    }
    if (filters.statusIds && filters.statusIds.length > 0) {
      filters.statusIds.forEach(id => params.append('statusIds', id));
    }
    if (filters.categoryIds && filters.categoryIds.length > 0) {
      filters.categoryIds.forEach(id => params.append('categoryIds', id));
    }
    if (filters.compatibilityIds && filters.compatibilityIds.length > 0) {
      filters.compatibilityIds.forEach(id => params.append('compatibilityIds', id));
    }
    if (filters.ramValues && filters.ramValues.length > 0) {
        filters.ramValues.forEach(val => params.append('ramValues', val));
    }
    if (filters.diskSpaceValues && filters.diskSpaceValues.length > 0) {
        filters.diskSpaceValues.forEach(val => params.append('diskSpaceValues', val));
    }
    if (filters.licenseIds && filters.licenseIds.length > 0) {
        filters.licenseIds.forEach(id => params.append('licenseIds', id));
    }
    if (searchTerm) {
      params.append('searchTerm', searchTerm);
    }

    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudieron obtener los productos'}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getAllProducts (con filtros y búsqueda):", error);
    throw error;
  }
};

// --- Las demás funciones (getProductById, createProduct, partialUpdateProduct, updateProduct, deleteProduct) se mantienen igual ---
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo obtener el producto'}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en getProductById para ID ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo crear el producto'}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en createProduct:", error);
    throw error;
  }
};

export const partialUpdateProduct = async (id, productPartialData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productPartialData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo actualizar parcialmente el producto'}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en partialUpdateProduct para ID ${id}:`, error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo actualizar el producto'}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en updateProduct para ID ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo eliminar el producto'}`);
    }
    return { message: `Producto con ID ${id} eliminado exitosamente` };
  } catch (error) {
    console.error(`Error en deleteProduct para ID ${id}:`, error);
    throw error;
  }
};

// Función para subir imágenes
export const uploadImage = async (file) => {
  try {
    // Aquí iría la lógica para subir la imagen a un servicio de almacenamiento
    // Por ahora, es un placeholder. Necesitarás un endpoint de backend para esto.
    console.warn("La función uploadImage es un placeholder. Implementa la lógica de subida de imágenes.");
    
    // Simulación de una respuesta exitosa
    // En una implementación real, esto sería algo como:
    // const formData = new FormData();
    // formData.append('image', file);
    // const response = await fetch(`${API_BASE_URL}/upload/image`, {
    //   method: 'POST',
    //   body: formData,
    // });
    // return await response.json();
    
    return { 
      url: `http://example.com/images/${file.name}`, 
      path: `/images/${file.name}` 
    };
  } catch (error) {
    console.error("Error en uploadImage:", error);
    throw error;
  }
};

