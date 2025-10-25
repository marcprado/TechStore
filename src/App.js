import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import IndexPage from './pages/IndexPage';
import ProductosPage from './pages/ProductosPage';
import GaleriaPage from './pages/GaleriaPage';
import FormularioPage from './pages/FormularioPage';
import CarritoPage from './pages/CarritoPage';
import PostPage from './pages/PostPage';

function App() {
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('techstore-carrito');
      if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
      }
      return [];
    } catch (error) {
      console.error('Error al leer localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('techstore-carrito', JSON.stringify(carrito));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const incrementarCantidad = (id) => {
    setCarrito(carrito.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  const decrementarCantidad = (id) => {
    const item = carrito.find(i => i.id === id);
    if (item.cantidad === 1) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(carrito.map(i =>
        i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
      ));
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout cantidadCarrito={cantidadTotal} carrito={carrito} />}>
          <Route index element={<IndexPage />} />
          <Route path="productos" element={<ProductosPage onAgregarAlCarrito={agregarAlCarrito} />} />
          <Route path="galeria" element={<GaleriaPage onAgregarAlCarrito={agregarAlCarrito} />} />
          <Route path="formulario" element={<FormularioPage />} />
          <Route path="carrito" element={
            <CarritoPage
              carrito={carrito}
              onIncrement={incrementarCantidad}
              onDecrement={decrementarCantidad}
              onRemove={eliminarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          } />
          <Route path="post" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
