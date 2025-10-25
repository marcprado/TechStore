import React from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import FormularioPage from '../pages/FormularioPage';

describe('FormularioPage - Pruebas Unitarias', () => {
  let container;
  let root;

  const syncDispatchEvent = (element, event) => {
    flushSync(() => {
      element.dispatchEvent(event);
    });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fillInput = (input, value) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;

    nativeInputValueSetter.call(input, value);
    syncDispatchEvent(input, new Event('input', { bubbles: true }));
    syncDispatchEvent(input, new Event('change', { bubbles: true }));
  };

  const fillTextarea = (textarea, value) => {
    const nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    ).set;

    nativeTextareaValueSetter.call(textarea, value);
    syncDispatchEvent(textarea, new Event('input', { bubbles: true }));
    syncDispatchEvent(textarea, new Event('change', { bubbles: true }));
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    root = ReactDOM.createRoot(container);
    flushSync(() => {
      root.render(
        <BrowserRouter>
          <FormularioPage />
        </BrowserRouter>
      );
    });
  });

  afterEach(() => {
    flushSync(() => {
      root.unmount();
    });
    document.body.removeChild(container);
    container = null;
    root = null;
  });

  // TEST 1: Validar email sin @
  it('debe mostrar error con email sin @', () => {
    const emailInput = container.querySelector('input[name="email"]');
    const form = container.querySelector('form');

    fillInput(emailInput, 'correosinArroba.com');

    syncDispatchEvent(form, new Event('submit', { bubbles: true, cancelable: true }));

    expect(emailInput.validity.valid).toBe(false);
    expect(emailInput.validity.typeMismatch).toBe(true);
  });

  // TEST 2: Validar que todos los campos son obligatorios
  it('debe mostrar error al enviar formulario vacío', () => {
    const form = container.querySelector('form');
    const nombreInput = container.querySelector('input[name="nombre"]');
    const emailInput = container.querySelector('input[name="email"]');
    const asuntoInput = container.querySelector('input[name="asunto"]');
    const mensajeTextarea = container.querySelector('textarea[name="mensaje"]');

    syncDispatchEvent(form, new Event('submit', { bubbles: true, cancelable: true }));

    expect(nombreInput.validity.valueMissing).toBe(true);
    expect(emailInput.validity.valueMissing).toBe(true);
    expect(asuntoInput.validity.valueMissing).toBe(true);
    expect(mensajeTextarea.validity.valueMissing).toBe(true);
  });

  // TEST 3: Validar que el botón se desactiva durante el envío
  it('debe deshabilitar el botón de envío cuando estado es "enviando"', async () => {
    const fakeFetch = spyOn(window, 'fetch').and.returnValue(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => ({ mensaje: 'Correo enviado' })
          });
        }, 500);
      })
    );

    const nombreInput = container.querySelector('input[name="nombre"]');
    const emailInput = container.querySelector('input[name="email"]');
    const asuntoInput = container.querySelector('input[name="asunto"]');
    const mensajeTextarea = container.querySelector('textarea[name="mensaje"]');
    const submitButton = container.querySelector('button[type="submit"]');

    fillInput(nombreInput, 'Juan Pérez');
    fillInput(emailInput, 'juan@test.com');
    fillInput(asuntoInput, 'Consulta técnica');
    fillTextarea(mensajeTextarea, 'Este es un mensaje de prueba');

    expect(submitButton.disabled).toBe(false);

    const form = container.querySelector('form');
    syncDispatchEvent(form, new Event('submit', { bubbles: true, cancelable: true }));

    await sleep(50);

    const submitButtonAfter = container.querySelector('button[type="submit"]');
    expect(submitButtonAfter.disabled).toBe(true);
    expect(submitButtonAfter.textContent).toContain('Enviando');

    expect(fakeFetch).toHaveBeenCalled();
  }, 10000);

  // TEST 4: Validar que acepta un email válido
  it('debe aceptar un email válido', () => {
    const emailInput = container.querySelector('input[name="email"]');

    fillInput(emailInput, 'contacto@techstore.cl');

    expect(emailInput.value).toBe('contacto@techstore.cl');
    expect(emailInput.validity.valid).toBe(true);
  });

  // TEST 5: Validar que el formulario se limpia después del envío exitoso
  it('debe limpiar el formulario después de un envío exitoso', async () => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: async () => ({ mensaje: 'Correo enviado exitosamente' })
      })
    );

    const nombreInput = container.querySelector('input[name="nombre"]');
    const emailInput = container.querySelector('input[name="email"]');
    const asuntoInput = container.querySelector('input[name="asunto"]');
    const mensajeTextarea = container.querySelector('textarea[name="mensaje"]');

    fillInput(nombreInput, 'María González');
    fillInput(emailInput, 'maria@test.com');
    fillInput(asuntoInput, 'Pregunta sobre productos');
    fillTextarea(mensajeTextarea, 'Hola, quisiera información');

    const form = container.querySelector('form');
    syncDispatchEvent(form, new Event('submit', { bubbles: true, cancelable: true }));

    await sleep(300);

    const nombreInputAfter = container.querySelector('input[name="nombre"]');
    const emailInputAfter = container.querySelector('input[name="email"]');
    const asuntoInputAfter = container.querySelector('input[name="asunto"]');
    const mensajeTextareaAfter = container.querySelector('textarea[name="mensaje"]');

    expect(nombreInputAfter.value).toBe('');
    expect(emailInputAfter.value).toBe('');
    expect(asuntoInputAfter.value).toBe('');
    expect(mensajeTextareaAfter.value).toBe('');
  }, 10000);
});