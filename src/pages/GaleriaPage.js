import React, { useState } from 'react';
import { ShoppingCart, Filter } from 'lucide-react';
import { productos, categorias } from '../data/productos';

function GaleriaPage({ onAgregarAlCarrito }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  const productosFiltrados = categoriaSeleccionada === 'todas'
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          Catálogo Completo
        </h1>

        {/* Filtros */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Filter size={20} style={{ color: '#6b7280' }} />
          <button
            onClick={() => setCategoriaSeleccionada('todas')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: categoriaSeleccionada === 'todas' ? '#2563eb' : 'white',
              color: categoriaSeleccionada === 'todas' ? 'white' : '#6b7280',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            Todas
          </button>
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: categoriaSeleccionada === cat.id ? '#2563eb' : 'white',
                color: categoriaSeleccionada === cat.id ? 'white' : '#6b7280',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          {productosFiltrados.map(producto => (
            <div
              key={producto.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{
                width: '100%',
                height: '180px',
                overflow: 'hidden',
                backgroundColor: '#f3f4f6'
              }}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <div style={{ padding: '15px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#1a1a1a',
                  minHeight: '40px'
                }}>
                  {producto.nombre}
                </h3>

                <p style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '12px'
                }}>
                  ${producto.precio.toLocaleString('es-CL')}
                </p>

                <button
                  onClick={() => onAgregarAlCarrito(producto)}
                  disabled={producto.stock === 0}
                  style={{
                    width: '100%',
                    backgroundColor: producto.stock > 0 ? '#2563eb' : '#9ca3af',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: producto.stock > 0 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <ShoppingCart size={16} />
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GaleriaPage;
