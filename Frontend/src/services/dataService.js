// frontend/src/services/dataService.js

const API_BASE_URL = "http://localhost:9090/api"; // Asegúrate que esta URL coincide con tu backend

export const fetchBrands = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/brands`); // Ajusta la ruta si tus endpoints de MasterData no están bajo /products
        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudieron cargar las marcas`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener marcas:", error);
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudieron cargar las categorías`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        throw error;
    }
};

export const fetchStatuses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/statuses`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudieron cargar los estados`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener estados:", error);
        throw error;
    }
};

export const fetchCompatibilities = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/compatibilities`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudieron cargar las compatibilidades`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener compatibilidades:", error);
        throw error;
    }
};

export const fetchLicenses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/licenses`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudieron cargar las licencias`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener licencias:", error);
        throw error;
    }
};