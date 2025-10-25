import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Zap, Shield, Headphones } from 'lucide-react';

function IndexPage() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
            Bienvenidos a TechStore
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '30px', lineHeight: '1.6' }}>
            Tu destino definitivo para tecnología de última generación.
            Descubre nuestra selección de laptops, PCs y accesorios gaming.
          </p>
          <Link to="/productos">
            <button style={{
              backgroundColor: 'white',
              color: '#667eea',
              padding: '15px 40px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}>
              Ver Productos
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '60px 20px',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#1a1a1a'
          }}>
            ¿Por qué elegirnos?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <Package size={48} style={{ color: '#2563eb', margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                Envío Gratis
              </h3>
              <p style={{ color: '#6b7280' }}>
                En compras sobre $50.000
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <Zap size={48} style={{ color: '#2563eb', margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                Entrega Rápida
              </h3>
              <p style={{ color: '#6b7280' }}>
                24-48 horas en Santiago
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <Shield size={48} style={{ color: '#2563eb', margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                Garantía Extendida
              </h3>
              <p style={{ color: '#6b7280' }}>
                Hasta 3 años en productos seleccionados
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <Headphones size={48} style={{ color: '#2563eb', margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                Soporte 24/7
              </h3>
              <p style={{ color: '#6b7280' }}>
                Atención al cliente siempre disponible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '60px 20px',
        backgroundColor: '#2563eb',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
            ¿Listo para actualizar tu setup?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Explora nuestro catálogo completo y encuentra el equipo perfecto para ti
          </p>
          <Link to="/galeria">
            <button style={{
              backgroundColor: 'white',
              color: '#2563eb',
              padding: '15px 40px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              Ver Catálogo
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default IndexPage;
