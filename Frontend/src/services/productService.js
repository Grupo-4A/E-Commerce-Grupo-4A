// frontend/src/services/productService.js

export const getAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products"); // URL completa aquí
    if (!response.ok) {
      // Manejo de errores HTTP, por ejemplo, si el servidor responde con 404, 500, etc.
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudieron obtener los productos'}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    // Puedes lanzar un error más específico o un mensaje amigable al usuario
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`); // URL completa aquí
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
    const response = await fetch("http://localhost:3000/api/products", { // URL completa aquí
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

// Nueva función para actualizar parcialmente un producto (PATCH)
export const partialUpdateProduct = async (id, productPartialData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, { // URL completa aquí
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

// Nueva función para actualizar completamente un producto (PUT)
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, { // URL completa aquí
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

// Nueva función para eliminar un producto (DELETE)
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, { // URL completa aquí
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