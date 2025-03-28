import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner, FloatingLabel } from 'react-bootstrap';
import productoService from '../../services/productoService';
import categoriaService from '../../services/categoriaService';

/**
 * Componente para crear/editar productos
 *
 * @param {Object} props - Propiedades del componente
 * @param {Object|null} props.productoEditando - Producto a editar (null para creación)
 * @param {Function} props.onSuccess - Callback al guardar exitosamente
 * @param {Function} props.onCancelEdit - Callback al cancelar edición
 */
const ProductoForm = ({ productoEditando, onSuccess, onCancelEdit }) => {
    // Estado del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        referencia: '',
        valorCompra: '',
        valorVenta: '',
        cantidad: 0,
        categoriaId: '',
        aplicaGanancia: false
    });

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState({
        categorias: true,
        guardando: false
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Cargar categorías al montar el componente
    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const data = await categoriaService.obtenerTodas();
                setCategorias(data.filter(cat => cat.tipo === 'PRODUCTO'));
            } catch (err) {
                setError('Error al cargar categorías');
                console.error('Error cargando categorías:', err);
            } finally {
                setLoading(prev => ({ ...prev, categorias: false }));
            }
        };
        cargarCategorias();
    }, []);

    // Sincronizar formulario con producto a editar
    useEffect(() => {
        if (productoEditando) {
            setFormData({
                nombre: productoEditando.nombre || '',
                referencia: productoEditando.referencia || '', // Campo referencia incluido
                valorCompra: productoEditando.valorCompra?.toString() || '',
                valorVenta: productoEditando.valorVenta?.toString() || '',
                cantidad: productoEditando.cantidad || 0,
                categoriaId: productoEditando.categoria?.id || '',
                aplicaGanancia: productoEditando.aplicaGanancia || false
            });
        } else {
            resetForm();
        }
    }, [productoEditando]);

    /**
     * Reinicia el formulario a valores iniciales
     */
    const resetForm = () => {
        setFormData({
            nombre: '',
            referencia: '',
            valorCompra: '',
            valorVenta: '',
            cantidad: 0,
            categoriaId: '',
            aplicaGanancia: false
        });
        setError('');
        setSuccess('');
    };

    /**
     * Maneja cambios en los campos del formulario
     * @param {Object} e - Evento del input
     */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    /**
     * Valida y envía el formulario
     * @param {Object} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(prev => ({ ...prev, guardando: true }));
        setError('');
        setSuccess('');

        try {
            // Validaciones básicas
            if (!formData.nombre.trim()) throw new Error('Nombre es requerido');
            if (!formData.referencia.trim()) throw new Error('Referencia es requerida');
            if (!formData.categoriaId) throw new Error('Seleccione una categoría');

            const valorCompra = parseFloat(formData.valorCompra);
            const valorVenta = parseFloat(formData.valorVenta);
            const cantidad = parseInt(formData.cantidad) || 0;

            if (isNaN(valorCompra) || valorCompra <= 0) throw new Error('Valor compra inválido');
            if (isNaN(valorVenta) || valorVenta <= 0) throw new Error('Valor venta inválido');
            if (cantidad < 0) throw new Error('Cantidad no puede ser negativa');

            // Preparar datos para enviar
            const productoData = {
                nombre: formData.nombre.trim(),
                referencia: formData.referencia.trim(), // Incluir referencia
                valorCompra: valorCompra,
                valorVenta: valorVenta,
                cantidad: cantidad,
                aplicaGanancia: formData.aplicaGanancia,
                categoria: { id: formData.categoriaId }
            };

            // Llamar al servicio correspondiente
            if (productoEditando) {
                await productoService.actualizar(productoEditando.id, productoData);
                setSuccess('Producto actualizado correctamente');
            } else {
                await productoService.crear(productoData);
                setSuccess('Producto creado correctamente');
                resetForm();
            }

            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message || 'Error al guardar');
            console.error('Error guardando producto:', err);
        } finally {
            setLoading(prev => ({ ...prev, guardando: false }));
        }
    };

    return (
        <div style={{
            backgroundColor: '#f8d7da',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #f5c6cb',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{
                color: '#d63384',
                marginBottom: '20px',
                borderBottom: '2px solid #d63384',
                paddingBottom: '10px'
            }}>
                {productoEditando ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                {/* Campo Nombre */}
                <FloatingLabel controlId="nombre" label="Nombre" className="mb-3">
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        disabled={loading.guardando}
                    />
                </FloatingLabel>

                {/* Campo Referencia */}
                <FloatingLabel controlId="referencia" label="Referencia" className="mb-3">
                    <Form.Control
                        type="text"
                        name="referencia"
                        value={formData.referencia}
                        onChange={handleChange}
                        required
                        disabled={loading.guardando}
                    />
                </FloatingLabel>

                {/* Campos Numéricos */}
                <div className="row">
                    <div className="col-md-6">
                        <FloatingLabel controlId="valorCompra" label="Valor Compra ($)" className="mb-3">
                            <Form.Control
                                type="number"
                                name="valorCompra"
                                value={formData.valorCompra}
                                onChange={handleChange}
                                min="0.01"
                                step="0.01"
                                required
                                disabled={loading.guardando}
                            />
                        </FloatingLabel>
                    </div>
                    <div className="col-md-6">
                        <FloatingLabel controlId="valorVenta" label="Valor Venta ($)" className="mb-3">
                            <Form.Control
                                type="number"
                                name="valorVenta"
                                value={formData.valorVenta}
                                onChange={handleChange}
                                min="0.01"
                                step="0.01"
                                required
                                disabled={loading.guardando}
                            />
                        </FloatingLabel>
                    </div>
                </div>

                {/* Cantidad */}
                <FloatingLabel controlId="cantidad" label="Cantidad" className="mb-3">
                    <Form.Control
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                        min="0"
                        step="1"
                        required
                        disabled={loading.guardando}
                    />
                </FloatingLabel>

                {/* Selector de Categoría */}
                {loading.categorias ? (
                    <div className="text-center mb-3">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <FloatingLabel controlId="categoriaId" label="Categoría" className="mb-3">
                        <Form.Select
                            name="categoriaId"
                            value={formData.categoriaId}
                            onChange={handleChange}
                            required
                            disabled={loading.guardando}
                        >
                            <option value="">Seleccione categoría</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                )}

                {/* Checkbox Ganancia Especial */}
                <Form.Check
                    type="checkbox"
                    id="aplicaGanancia"
                    label="Aplica Ganancia Especial"
                    name="aplicaGanancia"
                    checked={formData.aplicaGanancia}
                    onChange={handleChange}
                    className="mb-3"
                    disabled={loading.guardando}
                />

                {/* Botones de Acción */}
                <div className="d-flex justify-content-between">
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading.guardando}
                        style={{
                            backgroundColor: '#d63384',
                            borderColor: '#d63384',
                            fontWeight: 'bold'
                        }}
                    >
                        {loading.guardando ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                {productoEditando ? 'Actualizando...' : 'Guardando...'}
                            </>
                        ) : (
                            productoEditando ? 'Actualizar' : 'Guardar'
                        )}
                    </Button>

                    {productoEditando && (
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

export default ProductoForm;