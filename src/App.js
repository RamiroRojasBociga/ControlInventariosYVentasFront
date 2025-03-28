import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CategoriaPage from './components/categorias/CategoriaPage';
import ProductoPage from './components/productos/ProductoPage';
import LoginForm from './components/auth/LoginForm';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container py-4">
                    <Switch>
                        {/* Ruta de Login */}
                        <Route exact path="/login">
                            <LoginForm />
                        </Route>

                        {/* Tus rutas existentes (sin cambios) */}
                        <Route path="/categorias">
                            <CategoriaPage />
                        </Route>
                        <Route path="/productos">
                            <ProductoPage />
                        </Route>

                        {/* Ruta raíz ahora muestra LoginForm */}
                        <Route exact path="/">
                            <LoginForm />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;