import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout({ cantidadCarrito, carrito }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar cantidadCarrito={cantidadCarrito} carrito={carrito} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '40px 20px',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '30px'
          }}>
            <div>
              <h3 style={{ marginBottom: '15px' }}>TechStore</h3>
              <p style={{ color: '#aaa' }}>Tu tienda de tecnología de confianza</p>
            </div>
            <div>
              <h3 style={{ marginBottom: '15px' }}>Contacto</h3>
              <p style={{ color: '#aaa' }}>Email: contacto@techstore.cl</p>
              <p style={{ color: '#aaa' }}>Teléfono: +56 9 1234 5678</p>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #333',
            paddingTop: '20px',
            textAlign: 'center',
            color: '#aaa'
          }}>
            <p>&copy; 2025 TechStore. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
