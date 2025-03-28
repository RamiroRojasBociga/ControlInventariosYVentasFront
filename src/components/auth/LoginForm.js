import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulación de login (reemplaza con tu lógica real)
        setTimeout(() => {
            history.push('/productos'); // Redirige a productos tras login
        }, 1000);
    };

    return (
        <div style={{
            backgroundColor: '#f8d7da',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #f5c6cb',
            margin: '20px auto',
            maxWidth: '500px'
        }}>
            <h3 style={{ color: '#d63384', textAlign: 'center' }}>Iniciar Sesión</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    style={{ backgroundColor: '#d63384', borderColor: '#d63384', width: '100%' }}
                    disabled={loading}
                >
                    {loading ? <Spinner size="sm" /> : 'Ingresar'}
                </Button>
            </Form>
        </div>
    );
};

export default LoginForm;