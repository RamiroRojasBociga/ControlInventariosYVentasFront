// src/components/productos/ProductoPage.js
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProductoForm from './ProductoForm';
import ProductoList from './ProductoList';

/**
 * Componente principal de la página de gestión de productos.
 *
 * Funcionalidades:
 * - Coordina la interacción entre la lista y el formulario
 * - Maneja el estado del producto en edición
 * - Actualiza la lista después de operaciones exitosas
 */
const ProductoPage = () => {
    // Estado para almacenar el producto que se está editando
    const [productoEditando, setProductoEditando] = useState(null);
    // Estado para forzar la actualización de la lista
    const [refreshKey, setRefreshKey] = useState(0);

    /**
     * Maneja el éxito después de guardar un producto
     */
    const handleSuccess = () => {
        setProductoEditando(null); // Limpia la edición
        setRefreshKey(prev => prev + 1); // Fuerza recarga de la lista
    };

    /**
     * Cancela el modo edición
     */
    const handleCancelEdit = () => {
        setProductoEditando(null);
    };

    return (
        <Container className="py-4">
            {/* Título de la página con el color principal (#d63384) */}
            <h1 className="text-center mb-4" style={{ color: '#d63384' }}>
                Gestión de Productos
            </h1>

            {/* Formulario de producto (ocupa la parte superior) */}
            <ProductoForm
                productoEditando={productoEditando}
                onSuccess={handleSuccess}
                onCancelEdit={handleCancelEdit}
            />

            {/* Lista de productos (ocupa la parte inferior) */}
            <ProductoList
                key={refreshKey} // Se recarga cuando cambia refreshKey
                onEditProducto={setProductoEditando} // Permite editar productos
            />
        </Container>
    );
};

export default ProductoPage;