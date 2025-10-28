import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react';

function FormularioPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [estado, setEstado] = useState('idle'); // idle, enviando, exito, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado('enviando');

    console.log('📤 Enviando formulario a: /api/contact');
    console.log('Datos:', formData);

    try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            email: formData.email,
            asunto: formData.asunto,
            mensaje: formData.mensaje
          })
        });

      console.log('📥 Respuesta del servidor:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Éxito:', data);
        setEstado('exito');
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        setTimeout(() => setEstado('idle'), 5000);
      } else {
        const errorData = await response.json();
        console.error('❌ Error del servidor:', errorData);
        setEstado('error');
        setTimeout(() => setEstado('idle'), 5000);
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      setEstado('error');
      setTimeout(() => setEstado('idle'), 5000);
    }
  };

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '15px'
          }}>
            Contáctanos
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280'
          }}>
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </div>

        {/* Info de contacto */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <Mail size={32} style={{ color: '#2563eb', margin: '0 auto 15px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
              Email
            </h3>
            <p style={{ color: '#6b7280' }}>contacto@techstore.cl</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <MessageSquare size={32} style={{ color: '#2563eb', margin: '0 auto 15px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
              Teléfono
            </h3>
            <p style={{ color: '#6b7280' }}>+56 9 1234 5678</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <User size={32} style={{ color: '#2563eb', margin: '0 auto 15px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
              Horario
            </h3>
            <p style={{ color: '#6b7280' }}>Lun - Vie: 9:00 - 18:00</p>
          </div>
        </div>

        {/* Formulario */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#1a1a1a'
          }}>
            Envíanos un mensaje
          </h2>

          {estado === 'exito' && (
            <div style={{
              backgroundColor: '#d1fae5',
              border: '2px solid #10b981',
              color: '#065f46',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle size={24} />
              <span style={{ fontWeight: '600' }}>
                ¡Mensaje enviado con éxito! Te responderemos pronto.
              </span>
            </div>
          )}

          {estado === 'error' && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '2px solid #ef4444',
              color: '#991b1b',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              Error al enviar el mensaje. Por favor intenta nuevamente.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Asunto *
              </label>
              <input
                type="text"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Mensaje *
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <button
              type="submit"
              disabled={estado === 'enviando'}
              style={{
                width: '100%',
                backgroundColor: estado === 'enviando' ? '#9ca3af' : '#2563eb',
                color: 'white',
                padding: '15px',
                fontSize: '18px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '8px',
                cursor: estado === 'enviando' ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (estado !== 'enviando') {
                  e.target.style.backgroundColor = '#1d4ed8';
                }
              }}
              onMouseLeave={(e) => {
                if (estado !== 'enviando') {
                  e.target.style.backgroundColor = '#2563eb';
                }
              }}
            >
              {estado === 'enviando' ? (
                <>Enviando...</>
              ) : (
                <>
                  <Send size={20} />
                  Enviar Mensaje
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioPage;