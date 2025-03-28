import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import productoService from '../../services/productoService';

/**
 * Componente para mostrar lista de productos con opciones CRUD
 *
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onEditProducto - Función para editar producto
 * @param {number} props.key - Key para forzar recarga
 */
const ProductoList = ({ onEditProducto, key }) => {
    // Estados del componente
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);

    // Cargar productos al montar o cuando cambia key/forceUpdate
    useEffect(() => {
        const cargarProductos = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await productoService.obtenerTodos();

                if (Array.isArray(data)) {
                    setProductos(data.map(item => ({
                        id: item.id,
                        nombre: item.nombre || 'Sin nombre',
                        referencia: item.referencia || 'Sin referencia', // Asegurar referencia
                        valorCompra: item.valorCompra || 0,
                        valorVenta: item.valorVenta || 0,
                        cantidad: item.cantidad || 0,
                        aplicaGanancia: Boolean(item.aplicaGanancia),
                        categoria: item.categoria || null
                    })));
                } else {
                    throw new Error('Formato de datos inesperado');
                }
            } catch (err) {
                setError(err.message || 'Error al cargar productos');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, [key, forceUpdate]);

    /**
     * Maneja eliminación de producto
     * @param {number} id - ID del producto a eliminar
     */
    const handleEliminar = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este producto?')) {
            try {
                await productoService.eliminar(id);
                setForceUpdate(prev => !prev); // Forzar recarga
            } catch (err) {
                setError(err.message || 'Error al eliminar');
            }
        }
    };

    /**
     * Formatea valor monetario
     * @param {number} valor - Valor a formatear
     * @returns {string} Valor formateado como moneda
     */
    const formatearPrecio = (valor) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(parseFloat(valor) || 0);
    };

    /**
     * Prepara producto para edición
     * @param {Object} producto - Producto a editar
     */
    const handleEdit = (producto) => {
        const productoParaEditar = {
            id: producto.id,
            nombre: producto.nombre,
            referencia: producto.referencia, // Referencia incluida
            valorCompra: producto.valorCompra,
            valorVenta: producto.valorVenta,
            cantidad: producto.cantidad,
            aplicaGanancia: producto.aplicaGanancia,
            categoria: producto.categoria || null
        };
        console.log('Preparando para edición:', productoParaEditar);
        onEditProducto(productoParaEditar);
    };

    return (
        <div style={{
            backgroundColor: '#f8d7da',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #f5c6cb',
            marginTop: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{
                color: '#d63384',
                marginBottom: '20px',
                borderBottom: '2px solid #d63384',
                paddingBottom: '10px'
            }}>
                Lista de Productos
            </h3>

            {error && (
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                </Alert>
            )}

            {loading ? (
                <div className="text-center" style={{ padding: '40px 0' }}>
                    <Spinner animation="border" variant="primary" />
                    <p>Cargando productos...</p>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th style={{ backgroundColor: '#d63384', color: 'white' }}>ID</th>
                        <th style={{ backgroundColor: '#d63384', color: 'white' }}>Nombre</th>
                        <th style={{ backgroundColor: '#d63384', color: 'white' }}>Referencia</th>
                        <th style={{ backgroundColor: '#d63384', color: 'white' }}>Categoría</th>
                        <th style={{ backgroundColor: '#d63384', color: 'white' }}>Precio Compra</th>
                        <th style={{ backgroundColor: '#d63384', color: 'white' }}>Precio Venta</th>
                        <th style={{ backgroundColor: '#d63384', color: 'white' }}>Stock</th>
                        <th style={{ backgroundColor: '#d63384', color: 'white' }}>Ganancia</th>
                        <th style={{ backgroundColor: '#d63384', color: 'white' }}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productos.length > 0 ? (
                        productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.referencia}</td>
                                <td>{producto.categoria?.nombre || 'N/A'}</td>
                                <td>{formatearPrecio(producto.valorCompra)}</td>
                                <td>{formatearPrecio(producto.valorVenta)}</td>
                                <td>
                                    <Badge bg={producto.cantidad > 0 ? 'success' : 'danger'}>
                                        {producto.cantidad}
                                    </Badge>
                                </td>
                                <td>
                                    <Badge bg={producto.aplicaGanancia ? 'warning' : 'primary'}>
                                        {producto.aplicaGanancia ? 'Sí' : 'No'}
                                    </Badge>
                                </td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleEdit(producto)}
                                        className="me-2"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleEliminar(producto.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">
                                No hay productos registrados
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProductoList;