// frontend/src/services/productService.js

// Define una URL base para que sea más fácil de mantener
const API_BASE_URL = "http://localhost:9090/api";

// Funcion para llamar todos los productos (AHORA CON PAGINACIÓN)
export const getAllProducts = async (page = 0, size = 12) => { // <--- ¡AQUÍ ESTÁ EL CAMBIO CLAVE! Añade page y size como parámetros
  try {
    // Construye la URL con los parámetros de paginación
    const response = await fetch(`${API_BASE_URL}/products?page=${page}&size=${size}`); // <--- ¡AQUÍ SE USAN LOS PARÁMETROS!
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudieron obtener los productos'}`);
    }
    const data = await response.json();
    return data; // Esto debería ser un objeto Page<ProductResponseDTO> del backend
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    throw error;
  }
};

// Funcion para llamar un producto por ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`); // Usa API_BASE_URL
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
    const response = await fetch(`${API_BASE_URL}/products`, { // Usa API_BASE_URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Si tu API Java requiere autenticación
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

//función para actualizar parcialmente un producto (PATCH)
export const partialUpdateProduct = async (id, productPartialData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, { // Usa API_BASE_URL
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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

//función para actualizar completamente un producto (PUT)
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, { // Usa API_BASE_URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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

//función para eliminar un producto (DELETE)
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, { // Usa API_BASE_URL
      method: 'DELETE',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    });
    // Las respuestas DELETE a menudo no devuelven JSON, solo un status 204 No Content
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo eliminar el producto'}`);
    }
    // Si la API devuelve un 204 No Content, response.json() fallará.
    // Puedes verificar el status si esperas un JSON, o simplemente retornar un mensaje de éxito.
    return { message: `Producto con ID ${id} eliminado exitosamente` };
  } catch (error) {
    console.error(`Error en deleteProduct para ID ${id}:`, error);
    throw error;
  }
};