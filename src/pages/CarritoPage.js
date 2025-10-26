import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, Package } from 'lucide-react';

function CarritoPage({ carrito, onIncrement, onDecrement, onRemove, onVaciar }) {
  const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  if (carrito.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ShoppingCart size={80} style={{ color: '#9ca3af', marginBottom: '20px' }} />
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#6b7280',
          marginBottom: '15px'
        }}>
          Tu carrito está vacío
        </h2>
        <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '30px' }}>
          ¡Explora nuestros productos y encuentra lo que buscas!
        </p>
        <Link to="/productos">
          <button style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Package size={20} />
            Ver Productos
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '30px',
          color: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <ShoppingCart size={36} />
          Mi Carrito ({carrito.length} productos)
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Lista de productos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {carrito.map(item => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr auto',
                  gap: '20px',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'contain',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    padding: '10px'
                  }}
                />

                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#1a1a1a'
                  }}>
                    {item.nombre}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '10px'
                  }}>
                    {item.descripcion}
                  </p>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#2563eb'
                  }}>
                    ${item.precio.toLocaleString('es-CL')}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    padding: '5px'
                  }}>
                    <button
                      onClick={() => onDecrement(item.id)}
                      style={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#2563eb'
                      }}
                    >
                      <Minus size={18} />
                    </button>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => onIncrement(item.id)}
                      style={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#2563eb'
                      }}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemove(item.id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            minWidth: '320px',
            position: 'sticky',
            top: '90px'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#1a1a1a'
            }}>
              Resumen del Pedido
            </h3>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              fontSize: '16px'
            }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: '600' }}>
                ${subtotal.toLocaleString('es-CL')}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              fontSize: '16px'
            }}>
              <span>IVA (19%):</span>
              <span style={{ fontWeight: '600' }}>
                ${iva.toLocaleString('es-CL')}
              </span>
            </div>

            <div style={{
              borderTop: '2px solid #e5e7eb',
              paddingTop: '15px',
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#2563eb'
            }}>
              <span>Total:</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>

            <button style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '20px'
            }}>
              Proceder al Pago
            </button>

            <button
              onClick={onVaciar}
              style={{
                width: '100%',
                backgroundColor: 'white',
                color: '#ef4444',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #ef4444',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Trash2 size={18} />
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CarritoPage;

