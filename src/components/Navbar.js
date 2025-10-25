import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Package, Image, Mail, BookOpen } from 'lucide-react';
import CartDropdown from './CartDropdown';

function Navbar({ cantidadCarrito, carrito }) {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <nav style={{
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <Link
            to="/"
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              textDecoration: 'none'
            }}
          >
            <span style={{ color: '#fff' }}>Tech</span>
            <span style={{ color: '#60a5fa' }}>Store</span>
          </Link>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive('/') ? 'bold' : 'normal',
                fontSize: '16px'
              }}
            >
              <Home size={20} />
              <span>Inicio</span>
            </Link>
            
            <Link
              to="/productos"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive('/productos') ? 'bold' : 'normal',
                fontSize: '16px'
              }}
            >
              <Package size={20} />
              <span>Productos</span>
            </Link>
            
            <Link
              to="/galeria"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive('/galeria') ? 'bold' : 'normal',
                fontSize: '16px'
              }}
            >
              <Image size={20} />
              <span>Catálogo</span>
            </Link>
            
            <Link
              to="/formulario"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive('/formulario') ? 'bold' : 'normal',
                fontSize: '16px'
              }}
            >
              <Mail size={20} />
              <span>Contacto</span>
            </Link>

            <Link
              to="/post"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive('/post') ? 'bold' : 'normal',
                fontSize: '16px'
              }}
            >
              <BookOpen size={20} />
              <span>Blog</span>
            </Link>
            
            <button
              onClick={toggleCart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                position: 'relative',
                fontSize: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: isActive('/carrito') ? 'bold' : 'normal'
              }}
            >
              <ShoppingCart size={20} />
              <span>Carrito</span>
              {cantidadCarrito > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  fontSize: '12px',
                  minWidth: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  padding: '0 6px'
                }}>
                  {cantidadCarrito}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartDropdown 
        carrito={carrito}
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </>
  );
}

export default Navbar;
