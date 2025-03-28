// src/services/productoService.js
const API_URL = 'http://localhost:8080/api/productos';

const productoService = {
    // Obtiene todos los productos desde el backend
    obtenerTodos: async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                credentials: 'include', // Para cookies y autenticación
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    },

    // Crea un nuevo producto
    crear: async (producto) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear producto');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    },

    // Actualiza un producto existente
    actualizar: async (id, producto) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar producto');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    },

    // Elimina un producto por su ID
    eliminar: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar producto');
            }

            return true; // Retorna true si la eliminación fue exitosa
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    },

    // Opcional: Obtener un producto por ID
    obtenerPorId: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error al obtener producto con ID ${id}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error al obtener producto con ID ${id}:`, error);
            throw error;
        }
    }
};

export default productoService;