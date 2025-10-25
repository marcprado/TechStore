const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Verificar variables de entorno
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ ERROR: Faltan variables de entorno EMAIL_USER o EMAIL_PASS');
  console.log('📝 Asegúrate de tener un archivo .env con:');
  console.log('   EMAIL_USER=tu-correo@gmail.com');
  console.log('   EMAIL_PASS=tu-contraseña-de-aplicacion');
  console.log('   EMAIL_TO=correo-destino@gmail.com');
}

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verificar conexión al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error de conexión con el servidor de correo:', error);
    console.log('\n🔧 Soluciones:');
    console.log('1. Verifica que EMAIL_USER y EMAIL_PASS estén correctos en .env');
    console.log('2. Si usas Gmail, necesitas una "Contraseña de aplicación":');
    console.log('   - Ve a: https://myaccount.google.com/apppasswords');
    console.log('   - Genera una contraseña de 16 caracteres');
    console.log('   - Úsala en EMAIL_PASS (sin espacios)');
    console.log('3. Asegúrate de tener activada la verificación en 2 pasos\n');
  } else {
    console.log('✅ Servidor de correo conectado correctamente');
  }
});

// Ruta para enviar correos
app.post('/enviar-correo', async (req, res) => {
  console.log('\n📨 Nueva solicitud de envío de correo recibida');
  console.log('Datos recibidos:', { ...req.body, mensaje: '...' });

  const { nombre, email, asunto, mensaje } = req.body;

  // Validación básica
  if (!nombre || !email || !asunto || !mensaje) {
    console.log('❌ Validación fallida: faltan campos');
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos',
      campos_faltantes: {
        nombre: !nombre,
        email: !email,
        asunto: !asunto,
        mensaje: !mensaje
      }
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('❌ Email inválido:', email);
    return res.status(400).json({ 
      error: 'Formato de email inválido' 
    });
  }

  // Configuración del correo
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `Contacto TechStore: ${asunto}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
        <div style="background-color: #2563eb; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">TechStore</h1>
          <p style="color: #e0e7ff; margin: 5px 0 0 0;">Nuevo mensaje de contacto</p>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1a1a1a; margin-top: 0;">Información del remitente</h2>
          
          <div style="margin-bottom: 20px; padding: 15px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px;">
            <p style="margin: 5px 0;"><strong style="color: #1e40af;">Nombre:</strong> ${nombre}</p>
            <p style="margin: 5px 0;"><strong style="color: #1e40af;">Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong style="color: #1e40af;">Asunto:</strong> ${asunto}</p>
          </div>
          
          <h3 style="color: #1a1a1a; margin-top: 25px;">Mensaje:</h3>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="color: #374151; line-height: 1.6; margin: 0;">${mensaje.replace(/\n/g, '<br>')}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            Este correo fue enviado desde el formulario de contacto de TechStore<br>
            <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">Responder a ${email}</a>
          </p>
        </div>
      </div>
    `
  };

  try {
    console.log('📤 Intentando enviar correo...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Correo enviado exitosamente');
    console.log('ID del mensaje:', info.messageId);
    
    res.status(200).json({ 
      mensaje: 'Correo enviado exitosamente',
      success: true,
      messageId: info.messageId
    });
  } catch (error) {
    console.error('❌ Error detallado al enviar correo:');
    console.error('Tipo de error:', error.name);
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    console.error('Stack:', error.stack);
    
    // Errores comunes y sus soluciones
    let mensajeError = 'Error al enviar el correo';
    let solucion = '';

    if (error.code === 'EAUTH') {
      mensajeError = 'Error de autenticación con Gmail';
      solucion = 'Necesitas configurar una "Contraseña de aplicación" en tu cuenta de Gmail';
    } else if (error.code === 'ESOCKET') {
      mensajeError = 'Error de conexión';
      solucion = 'Verifica tu conexión a internet';
    } else if (error.code === 'EENVELOPE') {
      mensajeError = 'Error en las direcciones de correo';
      solucion = 'Verifica que EMAIL_USER y EMAIL_TO sean válidos';
    }

    res.status(500).json({ 
      error: mensajeError,
      detalles: error.message,
      codigo: error.code,
      solucion: solucion
    });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'Servidor TechStore funcionando correctamente',
    estado: 'online',
    email_configurado: !!process.env.EMAIL_USER,
    rutas_disponibles: {
      'POST /enviar-correo': 'Enviar correo de contacto',
      'GET /': 'Esta página'
    }
  });
});

// Ruta de prueba de correo
app.get('/test-email', async (req, res) => {
  try {
    await transporter.verify();
    res.json({ 
      mensaje: 'Configuración de email correcta',
      email: process.env.EMAIL_USER 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error en configuración de email',
      detalles: error.message 
    });
  }
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error no manejado:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    mensaje: err.message 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Servidor TechStore iniciado correctamente');
  console.log('='.repeat(50));
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📧 Email configurado: ${process.env.EMAIL_USER || 'NO CONFIGURADO'}`);
  console.log(`📬 Email destino: ${process.env.EMAIL_TO || process.env.EMAIL_USER || 'NO CONFIGURADO'}`);
  console.log('='.repeat(50) + '\n');
});