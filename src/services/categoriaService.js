// src/services/categoriaService.js
const API_URL = 'http://localhost:8080/api/categorias';

const categoriaService = {
    // Obtiene todas las categorías desde el backend
    obtenerTodas: async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                credentials: 'include', // Importante para cookies y autenticación
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
            console.error('Error al obtener categorías:', error);
            throw error;
        }
    },

    // Crea una nueva categoría
    crear: async (categoria) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(categoria)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear categoría');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al crear categoría:', error);
            throw error;
        }
    },

    // Actualiza una categoría existente
    actualizar: async (id, categoria) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(categoria)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar categoría');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            throw error;
        }
    },

    // Elimina una categoría por su ID
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
                throw new Error(errorData.message || 'Error al eliminar categoría');
            }

            return true; // Retorna true si la eliminación fue exitosa
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            throw error;
        }
    }
};

export default categoriaService;