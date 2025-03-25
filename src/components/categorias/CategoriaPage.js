// src/components/categorias/CategoriaPage.js
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CategoriaForm from './CategoriaForm';
import CategoriaList from './CategoriaList';

const CategoriaPage = () => {
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };

    const handleCancelEdit = () => {
        setCategoriaEditando(null);
    };

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4" style={{ color: '#d63384' }}>Gestión de Categorías</h1>

            <CategoriaForm
                categoriaEditando={categoriaEditando}
                onSuccess={handleSuccess}
                onCancelEdit={handleCancelEdit}
            />

            <CategoriaList
                key={refreshKey}
                onEditCategoria={setCategoriaEditando}
            />
        </Container>
    );
};

export default CategoriaPage;