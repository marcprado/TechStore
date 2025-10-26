import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Package, Image, Mail, BookOpen } from 'lucide-react';
import CartDropdown from './CartDropdown';

function Navbar({ cantidadCarrito, carrito }) {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  
  const isActive = (path) => location.pathname === path;

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Estilos Fallout/Pip-Boy
  const styles = {
    nav: {
      background: 'linear-gradient(180deg, #001a00 0%, #000d00 100%)',
      color: '#40ff40',
      padding: '16px 24px',
      boxShadow: '0 4px 20px rgba(51, 255, 0, 0.3)',
      borderBottom: '2px solid #33ff00',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: "'Share Tech Mono', 'Courier New', monospace"
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px'
    },
    logo: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#33ff00',
      textDecoration: 'none',
      letterSpacing: '4px',
      textTransform: 'uppercase',
      textShadow: '0 0 10px rgba(51, 255, 0, 0.8), 0 0 20px rgba(51, 255, 0, 0.5)',
      transition: 'all 0.3s ease'
    },
    logoHover: {
      textShadow: '0 0 15px rgba(102, 255, 51, 1), 0 0 30px rgba(102, 255, 51, 0.6)',
      transform: 'scale(1.05)'
    },
    linksContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap'
    },
    link: (path) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: isActive(path) ? '#000000' : '#40ff40',
      backgroundColor: isActive(path) ? '#33ff00' : 'transparent',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '15px',
      padding: '10px 16px',
      border: isActive(path) ? '1px solid #66ff33' : '1px solid #2a5c2a',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      boxShadow: isActive(path) ? '0 0 15px rgba(51, 255, 0, 0.6)' : 'none'
    }),
    linkHover: {
      backgroundColor: 'rgba(51, 255, 0, 0.1)',
      borderColor: '#33ff00',
      color: '#33ff00',
      boxShadow: '0 0 10px rgba(51, 255, 0, 0.4)',
      transform: 'translateY(-2px)'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#40ff40',
      position: 'relative',
      fontSize: '15px',
      background: 'transparent',
      border: '1px solid #2a5c2a',
      cursor: 'pointer',
      fontWeight: '600',
      padding: '10px 16px',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      fontFamily: "'Share Tech Mono', 'Courier New', monospace"
    },
    buttonHover: {
      backgroundColor: 'rgba(51, 255, 0, 0.1)',
      borderColor: '#33ff00',
      color: '#33ff00',
      boxShadow: '0 0 10px rgba(51, 255, 0, 0.4)',
      transform: 'translateY(-2px)'
    },
    badge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#ff3333',
      color: '#ffffff',
      fontSize: '11px',
      minWidth: '22px',
      height: '22px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      padding: '0 6px',
      border: '2px solid #33ff00',
      boxShadow: '0 0 10px rgba(255, 51, 51, 0.6)',
      animation: 'pulse 2s ease-in-out infinite'
    }
  };

  const getLinkStyle = (path, linkId) => {
    const baseStyle = styles.link(path);
    if (hoveredLink === linkId && !isActive(path)) {
      return { ...baseStyle, ...styles.linkHover };
    }
    return baseStyle;
  };

  const getButtonStyle = () => {
    const baseStyle = styles.button;
    if (hoveredLink === 'carrito') {
      return { ...baseStyle, ...styles.buttonHover };
    }
    return baseStyle;
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}
      </style>
      
      <nav style={styles.nav}>
        <div style={styles.container}>
          <Link
            to="/"
            style={styles.logo}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = styles.logoHover.textShadow;
              e.currentTarget.style.transform = styles.logoHover.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = styles.logo.textShadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            TechStore
          </Link>
          
          <div style={styles.linksContainer}>
            <Link
              to="/"
              style={getLinkStyle('/', 'home')}
              onMouseEnter={() => setHoveredLink('home')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Home size={18} />
              <span>Inicio</span>
            </Link>
            
            <Link
              to="/productos"
              style={getLinkStyle('/productos', 'productos')}
              onMouseEnter={() => setHoveredLink('productos')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Package size={18} />
              <span>Productos</span>
            </Link>
            
            <Link
              to="/galeria"
              style={getLinkStyle('/galeria', 'galeria')}
              onMouseEnter={() => setHoveredLink('galeria')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Image size={18} />
              <span>Catálogo</span>
            </Link>
            
            <Link
              to="/formulario"
              style={getLinkStyle('/formulario', 'contacto')}
              onMouseEnter={() => setHoveredLink('contacto')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Mail size={18} />
              <span>Contacto</span>
            </Link>

            <Link
              to="/post"
              style={getLinkStyle('/post', 'blog')}
              onMouseEnter={() => setHoveredLink('blog')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <BookOpen size={18} />
              <span>Blog</span>
            </Link>
            
            <button
              onClick={toggleCart}
              style={getButtonStyle()}
              onMouseEnter={() => setHoveredLink('carrito')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <ShoppingCart size={18} />
              <span>Carrito</span>
              {cantidadCarrito > 0 && (
                <span style={styles.badge}>
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