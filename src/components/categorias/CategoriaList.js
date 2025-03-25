// src/components/categorias/CategoriaList.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import categoriaService from '../../services/categoriaService';

const CategoriaList = ({ onEditCategoria }) => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const cargarCategorias = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await categoriaService.obtenerTodas();
            setCategorias(data);
        } catch (err) {
            setError(err.message || 'Error al cargar categorías');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    const handleEliminar = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
            try {
                await categoriaService.eliminar(id);
                cargarCategorias();
            } catch (err) {
                setError(err.message || 'Error al eliminar categoría');
            }
        }
    };

    return (
        <div className="categoria-list" style={{
            backgroundColor: '#f8d7da',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #f5c6cb'
        }}>
            <h3 style={{ color: '#000000', marginBottom: '20px' }}>Lista de Categorías</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th style={{ backgroundColor: '#d63384', color: '#ffffff' }}>ID</th>
                        <th style={{ backgroundColor: '#d63384', color: '#ffffff' }}>Nombre</th>
                        <th style={{ backgroundColor: '#d63384', color: '#ffffff' }}>Tipo</th>
                        <th style={{ backgroundColor: '#d63384', color: '#ffffff' }}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categorias.length > 0 ? (
                        categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.nombre}</td>
                                <td>{categoria.tipo}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => onEditCategoria(categoria)}
                                        className="me-2"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleEliminar(categoria.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay categorías registradas</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default CategoriaList;