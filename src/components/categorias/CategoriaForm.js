// src/components/categorias/CategoriaForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import categoriaService from '../../services/categoriaService';

const CategoriaForm = ({ categoriaEditando, onSuccess, onCancelEdit }) => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (categoriaEditando) {
            setNombre(categoriaEditando.nombre);
            setTipo(categoriaEditando.tipo);
        } else {
            resetForm();
        }
    }, [categoriaEditando]);

    const resetForm = () => {
        setNombre('');
        setTipo('');
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const categoriaData = { nombre, tipo: tipo.toUpperCase() };

            if (categoriaEditando) {
                await categoriaService.actualizar(categoriaEditando.id, categoriaData);
                setSuccess('Categoría actualizada correctamente');
            } else {
                await categoriaService.crear(categoriaData);
                setSuccess('Categoría creada correctamente');
                resetForm();
            }

            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message || 'Ocurrió un error al guardar la categoría');
        }
    };

    return (
        <div className="categoria-form" style={{
            backgroundColor: '#f8d7da',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #f5c6cb',
            marginBottom: '20px'
        }}>
            <h3 style={{ color: '#000000', marginBottom: '20px' }}>
                {categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}
            </h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="PRODUCTO">Producto</option>
                        <option value="GASTO">Gasto</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-flex justify-content-between">
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ backgroundColor: '#d63384', borderColor: '#d63384' }}
                    >
                        {categoriaEditando ? 'Actualizar' : 'Guardar'}
                    </Button>

                    {categoriaEditando && (
                        <Button
                            variant="secondary"
                            onClick={() => {
                                onCancelEdit();
                                resetForm();
                            }}
                        >
                            Cancelar
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default CategoriaForm;