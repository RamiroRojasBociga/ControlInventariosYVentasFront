// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CategoriaPage from './components/categorias/CategoriaPage';
import ProductoPage from './components/productos/ProductoPage';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container py-4">
                    <Switch>
                        <Route path="/categorias">
                            <CategoriaPage />
                        </Route>
                        <Route path="/productos">
                            <ProductoPage />
                        </Route>
                        <Route path="/">
                            <ProductoPage />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;