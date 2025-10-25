import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';

function CartDropdown({ carrito = [], isOpen, onClose }) {
  if (!isOpen) return null;

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  return (
    <>
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999
        }}
      />
      
      <div style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        width: '380px',
        maxWidth: '90vw',
        maxHeight: '600px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '2px solid #f3f4f6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#2563eb',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart size={24} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              Mi Carrito ({carrito.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {carrito.length === 0 ? (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🛒</div>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>
              Tu carrito está vacío
            </p>
          </div>
        ) : (
          <>
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px'
            }}>
              {carrito.map(item => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}
                >
                  <img 
                    src={item.imagen} 
                    alt={item.nombre}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      backgroundColor: '#e5e7eb'
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: '0 0 4px 0',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.nombre}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: '0 0 4px 0'
                    }}>
                      Cantidad: {item.cantidad}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#2563eb',
                      margin: 0
                    }}>
                      ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '20px',
              borderTop: '2px solid #f3f4f6',
              backgroundColor: '#fafafa'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Total:</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                  ${total.toLocaleString('es-CL')}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/carrito" onClick={onClose}>
                  <button style={{
                    width: '100%',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}>
                    Ir al Carrito
                  </button>
                </Link>
                
                <button
                  onClick={onClose}
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: '#2563eb',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    border: '2px solid #2563eb',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Seguir Comprando
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartDropdown;
