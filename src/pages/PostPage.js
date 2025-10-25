import React from 'react';
import { Cpu, Monitor, Zap, HardDrive, Headphones } from 'lucide-react';

function PostPage() {
  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <article style={{
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '15px',
            lineHeight: '1.2'
          }}>
            Guía de Compra: Cómo Elegir tu PC Gaming
          </h1>
          <div style={{
            display: 'flex',
            gap: '15px',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            <span>📅 25 de Octubre, 2025</span>
            <span>👤 Por TechStore</span>
            <span>⏱️ 5 min de lectura</span>
          </div>
        </header>

        <div style={{
          width: '100%',
          height: '400px',
          backgroundColor: '#e5e7eb',
          borderRadius: '12px',
          marginBottom: '30px',
          overflow: 'hidden'
        }}>
          <img
            src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=900"
            alt="PC Gaming Setup"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        <div style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#374151'
        }}>
          <p style={{ marginBottom: '20px' }}>
            Elegir una PC gaming puede ser una tarea desafiante con tantas opciones disponibles en el mercado.
            Esta guía te ayudará a entender los componentes esenciales y cómo seleccionar el equipo perfecto para tus necesidades.
          </p>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginTop: '40px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Cpu size={32} style={{ color: '#2563eb' }} />
            Componentes Esenciales
          </h2>

          <div style={{
            backgroundColor: '#f9fafb',
            padding: '25px',
            borderRadius: '8px',
            marginBottom: '30px',
            borderLeft: '4px solid #2563eb'
          }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'start',
                gap: '12px'
              }}>
                <Cpu size={20} style={{ color: '#2563eb', marginTop: '4px', flexShrink: 0 }} />
                <span><strong>Procesador (CPU):</strong> Intel Core i5/i7/i9 o AMD Ryzen 5/7/9 - El cerebro de tu PC</span>
              </li>
              <li style={{
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'start',
                gap: '12px'
              }}>
                <Monitor size={20} style={{ color: '#2563eb', marginTop: '4px', flexShrink: 0 }} />
                <span><strong>Tarjeta Gráfica (GPU):</strong> NVIDIA RTX 3000/4000 o AMD RX 6000/7000 - El componente más importante para gaming</span>
              </li>
              <li style={{
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'start',
                gap: '12px'
              }}>
                <HardDrive size={20} style={{ color: '#2563eb', marginTop: '4px', flexShrink: 0 }} />
                <span><strong>Memoria RAM:</strong> Mínimo 16GB DDR4/DDR5 - Permite multitarea fluida</span>
              </li>
              <li style={{
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'start',
                gap: '12px'
              }}>
                <Zap size={20} style={{ color: '#2563eb', marginTop: '4px', flexShrink: 0 }} />
                <span><strong>Almacenamiento:</strong> SSD NVMe para el sistema y juegos - Tiempos de carga más rápidos</span>
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'start',
                gap: '12px'
              }}>
                <Headphones size={20} style={{ color: '#2563eb', marginTop: '4px', flexShrink: 0 }} />
                <span><strong>Fuente de poder:</strong> Certificación 80+ Gold o superior - Protege tu inversión</span>
              </li>
            </ul>
          </div>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginTop: '40px',
            marginBottom: '20px'
          }}>
            Consideraciones Importantes
          </h2>

          <p style={{ marginBottom: '20px' }}>
            Antes de realizar tu compra, considera los siguientes aspectos:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#eff6ff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #bfdbfe'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '10px'
              }}>
                💰 Presupuesto
              </h3>
              <p style={{ fontSize: '15px', color: '#1e3a8a', margin: 0 }}>
                Define cuánto estás dispuesto a invertir. Un buen PC gaming empieza desde $800.000 CLP
              </p>
            </div>

            <div style={{
              backgroundColor: '#eff6ff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #bfdbfe'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '10px'
              }}>
                🎮 Tipo de Juegos
              </h3>
              <p style={{ fontSize: '15px', color: '#1e3a8a', margin: 0 }}>
                Los juegos AAA requieren más potencia que los e-sports competitivos
              </p>
            </div>

            <div style={{
              backgroundColor: '#eff6ff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #bfdbfe'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '10px'
              }}>
                🖥️ Resolución
              </h3>
              <p style={{ fontSize: '15px', color: '#1e3a8a', margin: 0 }}>
                1080p, 1440p o 4K - cada uno requiere diferente nivel de hardware
              </p>
            </div>

            <div style={{
              backgroundColor: '#eff6ff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #bfdbfe'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '10px'
              }}>
                🔧 Actualización
              </h3>
              <p style={{ fontSize: '15px', color: '#1e3a8a', margin: 0 }}>
                Considera la posibilidad de mejorar componentes en el futuro
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '30px',
            borderRadius: '12px',
            marginTop: '40px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              ¿Listo para armar tu PC Gaming?
            </h3>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
              En TechStore tenemos todo lo que necesitas para crear el setup de tus sueños
            </p>
            <button style={{
              backgroundColor: 'white',
              color: '#2563eb',
              padding: '12px 30px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Ver Componentes
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default PostPage;
