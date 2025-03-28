// src/components/common/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav style={{
            backgroundColor: '#f8d7da',
            padding: '1rem',
            marginBottom: '1rem'
        }}>
            <Link
                to="/productos"
                style={{
                    color: '#d63384',
                    marginRight: '1rem',
                    textDecoration: 'none'
                }}
            >
                Productos
            </Link>
            <Link
                to="/categorias"
                style={{
                    color: '#d63384',
                    textDecoration: 'none'
                }}
            >
                Categorías
            </Link>
        </nav>
    );
};

export default Navigation;