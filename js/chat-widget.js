/* ============================================
   MEDI PACÍFICO — AI Chat Widget
   Asistente virtual para equipos médicos
   ============================================ */

(function() {
  'use strict';

  // ─── Configuration ───
  const CONFIG = {
    name: 'MediBot',
    avatar: '🤖',
    primaryColor: '#00B4D8',
    welcomeMessage: '¡Hola! Soy MediBot, el asistente virtual de MediPacífico. ¿En qué puedo ayudarte hoy?',
    placeholder: 'Escribe tu pregunta...',
    position: 'right',
    greetingDelay: 3000,
    autoOpen: false
  };

  // ─── Knowledge Base (simulated AI responses) ───
  const KNOWLEDGE_BASE = {
    // Greetings
    'hola': '¡Hola! Bienvenido a MediPacífico. Soy MediBot, tu asistente virtual. Puedo ayudarte con información sobre nuestros equipos médicos, servicio técnico, mantenimiento preventivo, cotizaciones y más. ¿Qué necesitas?',
    'buenos dias': '¡Buenos días! ¿En qué puedo ayudarte hoy con respecto a nuestros equipos médicos o servicios?',
    'buenas tardes': '¡Buenas tardes! Estoy aquí para resolver tus dudas sobre equipos médicos, mantenimiento o cotizaciones.',
    'buenas noches': '¡Buenas noches! Aunque sea tarde, puedo ayudarte con información sobre nuestros servicios. ¿Qué necesitas?',

    // Equipment questions
    'ultrasonido': 'Tenemos varios modelos de ultrasonidos disponibles: portátiles como el Logiq V2 (desde $245,000) y de gabinete para hospitales. Todos incluyen capacitación y garantía extendida. ¿Te interesa una demo técnica?',
    'monitor': 'Nuestros monitores de signos vitales MX-800 incluyen ECG, SpO2, NIBP, temperatura y respiración en tiempo real. Precio: $89,500. ¿Necesitas cotización para varias unidades?',
    'ventilador': 'El ventilador mecánico V-500 es ideal para UCI, con modos invasivos y no invasivos (VCV, PCV, CPAP, BiPAP). Precio: $420,000. Incluye instalación y capacitación.',
    'rayos x': 'Contamos con mesas de rayos X digital DR-500 con detector plano de 17x17" y dosis reducida. Precio desde $1,250,000. Financiamiento disponible.',
    'electrocardiografo': 'El ECG-1200 de 12 canales incluye interpretación automática con IA y conectividad HL7/DICOM. Precio: $67,000. Ideal para consultorios y hospitales.',
    'desfibrilador': 'El desfibrilador bifásico DF-200 incluye modo AED automático y manual, con ECG de 12 derivaciones. Precio: $156,000. Esencial para cualquier sala de emergencias.',

    // Supplies
    'guantes': 'Guantes de nitrilo estériles sin polvo, grado médico ASTM D6319. Disponibles por caja de 100 unidades ($285) o pallet para hospitales. Tallas XS a XL.',
    'jeringas': 'Jeringas hipodérmicas estériles de 3 cuerpos, volumenes de 1ml a 20ml. Precio desde $125 por caja de 100. Certificación ISO 7886.',
    'material de curacion': 'Kit completo de 50 piezas con gasas estériles, vendas elásticas, esparadrapo, solución salina y antiséptico. Precio: $890. Cumple NOM-241.',
    'insumos': 'Manejamos todo tipo de insumos hospitalarios: material de curación, guantes, jeringas, catéteres, equipo de protección personal y más. ¿Necesitas lista de precios mayorista?',

    // Maintenance
    'mantenimiento': 'Ofrecemos contratos anuales de mantenimiento preventivo con visitas programadas, calibración certificada y respuesta de emergencia en menos de 24h en Mazatlán. ¿Te gustaría un diagnóstico gratuito de tu flota de equipos?',
    'reparacion': 'Nuestro servicio técnico repara ultrasonidos, electrocardiógrafos, monitores, ventiladores y más. Técnicos certificados con repuestos originales. ¿Qué equipo necesita reparación?',
    'calibracion': 'Realizamos calibración certificada de equipos médicos con instrumentación trazable. Emitimos certificados válidos para auditorías COFEPRIS y NOM-241.',
    'contrato': 'Nuestros contratos anuales incluyen: visitas programadas (mensual, bimestral o trimestral), respuesta de emergencia <24h, descuento en repuestos y prioridad en atención. ¿Cuántos equipos tienes?',

    // Pricing & Quotes
    'precio': 'Nuestros precios varían según el equipo y volumen. Puedes ver nuestro catálogo completo en la sección "Catálogo" o solicitar una cotización personalizada. ¿Qué producto te interesa?',
    'cotizacion': 'Para enviarte una cotización precisa necesito saber: ¿qué equipo o insumo necesitas, para qué institución, y cuántas unidades? También puedes llenar el formulario en nuestra página de contacto.',
    'financiamiento': 'Ofrecemos leasing, arrendamiento y pagos diferidos para equipos de más de $50,000. Para hospitales públicos también asesoramos en procesos de licitación. ¿Te interesa una propuesta de financiamiento?',
    'descuento': 'Ofrecemos descuentos por volumen a partir de 5 unidades. Para hospitales e instituciones públicas manejamos precios especiales. ¿Cuántas unidades necesitas?',

    // Regulations
    'cofepris': 'Todos nuestros equipos médicos cuentan con registro sanitario ante COFEPRIS. También asesoramos en el proceso de registro si necesitas importar equipos.',
    'nom-241': 'La NOM-241 establece los requisitos para establecimientos de salud en México. Nuestros equipos cumplen con esta normativa y te ayudamos con la documentación para auditorías.',
    'certificado': 'Emitimos certificados de calibración, mantenimiento y cumplimiento normativo válidos para auditorías de COFEPRIS, Secretaría de Salud y certificaciones de calidad.',

    // Location & Contact
    'ubicacion': 'Estamos en Av. del Mar 1234, Fracc. Tellería, Mazatlán, Sinaloa. Atendemos toda la región del Pacífico Mexicano incluyendo Culiacán, Los Mochis, Guamúchil y Guasave.',
    'telefono': 'Puedes contactarnos al +52 669 876 5432 por teléfono o WhatsApp. Horario: Lunes a Viernes 8:00-18:00, Sábados 9:00-13:00.',
    'horario': 'Nuestro horario de atención es: Lunes a Viernes de 8:00 a 18:00 y Sábados de 9:00 a 13:00. Para emergencias técnicas tenemos servicio 24/7 para clientes con contrato.',
    'whatsapp': 'Puedes escribirnos por WhatsApp al +52 669 876 5432. Te responderemos en menos de 2 horas en horario laboral.',
    'email': 'Nuestro correo es ventas@medipacifico.mx. Respondemos en menos de 24 horas.',

    // Services
    'demo': 'Ofrecemos demostraciones técnicas gratuitas en tu institución. Un especialista lleva el equipo, realiza pruebas y capacita a tu personal. ¿Te gustaría agendar una?',
    'instalacion': 'Todas nuestras ventas de equipos incluyen instalación profesional, puesta en marcha y capacitación básica al personal. Para equipos complejos incluimos capacitación avanzada.',
    'capacitacion': 'Ofrecemos capacitación técnica para el personal de tu institución. Desde uso básico hasta mantenimiento preventivo de primer nivel. Incluida en la compra de equipos.',
    'garantia': 'Todos nuestros equipos nuevos incluyen garantía de 1 año. Los contratos de mantenimiento extenden la garantía y cubren mano de obra y repuestos.',

    // Fallback
    'default': 'Entiendo tu consulta. Para darte una respuesta más precisa, te sugiero: 1) Revisar nuestro catálogo en línea, 2) Llenar el formulario de contacto, o 3) Hablar directamente con un asesor por WhatsApp al +52 669 876 5432. ¿Te gustaría que te redirija a alguna de estas opciones?'
  };

  // ─── State ───
  let isOpen = false;
  let hasGreeted = false;
  let messages = [];

  // ─── DOM Elements ───
  function createChatWidget() {
    const widget = document.createElement('div');
    widget.id = 'medi-chat-widget';
    widget.innerHTML = `
      <style>
        #medi-chat-widget { position: fixed; bottom: 24px; ${CONFIG.position}: 24px; z-index: 9999; font-family: 'Inter', -apple-system, sans-serif; }
        .mcw-toggle {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${CONFIG.primaryColor}, #0077B6);
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 24px;
          box-shadow: 0 8px 30px rgba(0,180,216,0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .mcw-toggle:hover { transform: scale(1.1) translateY(-4px); box-shadow: 0 12px 40px rgba(0,180,216,0.5); }
        .mcw-toggle.pulse::after {
          content: ''; position: absolute; inset: -4px;
          border-radius: 50%; border: 2px solid ${CONFIG.primaryColor};
          animation: mcw-pulse 2s ease-in-out infinite;
        }
        @keyframes mcw-pulse { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 0; } }
        .mcw-window {
          position: absolute; bottom: 76px; ${CONFIG.position}: 0;
          width: 380px; max-width: calc(100vw - 48px);
          height: 520px; max-height: calc(100vh - 120px);
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          display: flex; flex-direction: column;
          overflow: hidden;
          transform: scale(0.9) translateY(20px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mcw-window.open { transform: scale(1) translateY(0); opacity: 1; visibility: visible; }
        .mcw-header {
          background: linear-gradient(135deg, #0B1F3A 0%, #1A3A5C 100%);
          padding: 20px;
          display: flex; align-items: center; gap: 12px;
          color: #fff;
        }
        .mcw-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${CONFIG.primaryColor}, #0077B6);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          border: 2px solid rgba(255,255,255,0.2);
        }
        .mcw-header-info h4 { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
        .mcw-header-info span { font-size: 12px; color: rgba(255,255,255,0.7); display: flex; align-items: center; gap: 6px; }
        .mcw-header-info span::before { content: ''; width: 8px; height: 8px; background: #4ADE80; border-radius: 50%; }
        .mcw-close {
          margin-left: auto;
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .mcw-close:hover { background: rgba(255,255,255,0.2); }
        .mcw-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex; flex-direction: column;
          gap: 16px;
          background: #F8FAFC;
        }
        .mcw-message {
          max-width: 85%;
          padding: 14px 18px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.6;
          animation: mcw-msg-in 0.3s ease;
        }
        @keyframes mcw-msg-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .mcw-message.bot {
          align-self: flex-start;
          background: #fff;
          color: #1A1A2E;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          border: 1px solid #E2E8F0;
        }
        .mcw-message.user {
          align-self: flex-end;
          background: linear-gradient(135deg, ${CONFIG.primaryColor}, #0077B6);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .mcw-message-time {
          font-size: 10px;
          color: #9CA3AF;
          margin-top: 6px;
          text-align: right;
        }
        .mcw-message.bot .mcw-message-time { text-align: left; }
        .mcw-typing {
          display: flex; align-items: center; gap: 4px;
          padding: 14px 18px;
          background: #fff;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          border: 1px solid #E2E8F0;
        }
        .mcw-typing span {
          width: 8px; height: 8px;
          background: ${CONFIG.primaryColor};
          border-radius: 50%;
          animation: mcw-typing 1.4s ease-in-out infinite;
        }
        .mcw-typing span:nth-child(2) { animation-delay: 0.2s; }
        .mcw-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes mcw-typing { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
        .mcw-input-area {
          padding: 16px 20px;
          background: #fff;
          border-top: 1px solid #E2E8F0;
          display: flex; gap: 10px;
        }
        .mcw-input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 100px;
          border: 1.5px solid #E2E8F0;
          background: #F8FAFC;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s;
        }
        .mcw-input:focus { border-color: ${CONFIG.primaryColor}; box-shadow: 0 0 0 4px rgba(0,180,216,0.08); outline: none; }
        .mcw-send {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${CONFIG.primaryColor}, #0077B6);
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .mcw-send:hover { transform: scale(1.1); }
        .mcw-suggestions {
          display: flex; flex-wrap: wrap;
          gap: 8px;
          padding: 0 20px 12px;
          background: #F8FAFC;
        }
        .mcw-suggestion {
          padding: 8px 14px;
          background: #fff;
          border: 1px solid #E2E8F0;
          border-radius: 100px;
          font-size: 12px;
          color: #0B1F3A;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .mcw-suggestion:hover { background: ${CONFIG.primaryColor}; color: #fff; border-color: ${CONFIG.primaryColor}; }
        .mcw-quick-actions {
          display: flex; gap: 8px;
          padding: 0 20px 16px;
          background: #F8FAFC;
        }
        .mcw-quick-action {
          padding: 10px 16px;
          background: linear-gradient(135deg, #0B1F3A, #1A3A5C);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          display: flex; align-items: center; gap: 6px;
        }
        .mcw-quick-action:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(11,31,58,0.3); }
        @media (max-width: 480px) {
          .mcw-window { width: calc(100vw - 32px); right: 16px; left: 16px; }
          #medi-chat-widget { right: 16px; }
        }
      </style>

      <button class="mcw-toggle" id="mcwToggle" title="Chatear con MediBot">${CONFIG.avatar}</button>

      <div class="mcw-window" id="mcwWindow">
        <div class="mcw-header">
          <div class="mcw-avatar">${CONFIG.avatar}</div>
          <div class="mcw-header-info">
            <h4>${CONFIG.name}</h4>
            <span>En línea ahora</span>
          </div>
          <button class="mcw-close" id="mcwClose">✕</button>
        </div>

        <div class="mcw-messages" id="mcwMessages"></div>

        <div class="mcw-suggestions" id="mcwSuggestions"></div>

        <div class="mcw-quick-actions" id="mcwQuickActions">
          <button class="mcw-quick-action" data-action="catalogo">📋 Ver catálogo</button>
          <button class="mcw-quick-action" data-action="cotizar">💰 Cotizar</button>
          <button class="mcw-quick-action" data-action="whatsapp">💬 WhatsApp</button>
        </div>

        <div class="mcw-input-area">
          <input type="text" class="mcw-input" id="mcwInput" placeholder="${CONFIG.placeholder}">
          <button class="mcw-send" id="mcwSend">➤</button>
        </div>
      </div>
    `;
    document.body.appendChild(widget);
    return widget;
  }

  // ─── Message Handling ───
  function addMessage(text, sender = 'bot') {
    const container = document.getElementById('mcwMessages');
    const msg = document.createElement('div');
    msg.className = `mcw-message ${sender}`;
    const time = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    msg.innerHTML = `${text}<div class="mcw-message-time">${time}</div>`;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    messages.push({ text, sender, time });
  }

  function showTyping() {
    const container = document.getElementById('mcwMessages');
    const typing = document.createElement('div');
    typing.className = 'mcw-typing';
    typing.id = 'mcwTyping';
    typing.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    const typing = document.getElementById('mcwTyping');
    if (typing) typing.remove();
  }

  function getBotResponse(input) {
    const lower = input.toLowerCase().trim();

    // Check for keyword matches
    for (const [keyword, response] of Object.entries(KNOWLEDGE_BASE)) {
      if (keyword === 'default') continue;
      if (lower.includes(keyword)) {
        return response;
      }
    }

    return KNOWLEDGE_BASE.default;
  }

  function processUserInput(text) {
    if (!text.trim()) return;

    addMessage(text, 'user');
    document.getElementById('mcwInput').value = '';

    showTyping();

    // Simulate processing delay
    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      hideTyping();
      const response = getBotResponse(text);
      addMessage(response, 'bot');
      updateSuggestions(text);
    }, delay);
  }

  function updateSuggestions(lastInput) {
    const container = document.getElementById('mcwSuggestions');
    const lower = lastInput.toLowerCase();

    let suggestions = [];
    if (lower.includes('equipo') || lower.includes('ultrasonido') || lower.includes('monitor')) {
      suggestions = ['¿Tienen garantía?', '¿Incluye capacitación?', '¿Hacen envíos?'];
    } else if (lower.includes('precio') || lower.includes('cotizacion')) {
      suggestions = ['¿Hay descuento por volumen?', '¿Ofrecen financiamiento?', 'Ver catálogo completo'];
    } else if (lower.includes('mantenimiento') || lower.includes('reparacion')) {
      suggestions = ['¿Cuánto cuesta el contrato?', '¿Qué incluye?', 'Agendar diagnóstico'];
    } else {
      suggestions = ['Ver catálogo', 'Solicitar cotización', 'Servicio técnico', 'Hablar con asesor'];
    }

    container.innerHTML = suggestions.map(s => 
      `<button class="mcw-suggestion" onclick="window.mediChat.sendSuggestion('${s}')">${s}</button>`
    ).join('');
  }

  // ─── Quick Actions ───
  function handleQuickAction(action) {
    switch(action) {
      case 'catalogo':
        window.open('catalogo.html', '_self');
        break;
      case 'cotizar':
        window.open('index.html#cotizar', '_self');
        break;
      case 'whatsapp':
        window.open('https://wa.me/526698765432?text=Hola%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n.', '_blank');
        break;
    }
  }

  // ─── Toggle ───
  function toggleChat() {
    isOpen = !isOpen;
    const window = document.getElementById('mcwWindow');
    const toggle = document.getElementById('mcwToggle');

    if (isOpen) {
      window.classList.add('open');
      toggle.classList.remove('pulse');
      if (!hasGreeted) {
        setTimeout(() => {
          addMessage(CONFIG.welcomeMessage, 'bot');
          updateSuggestions('');
          hasGreeted = true;
        }, 400);
      }
      document.getElementById('mcwInput').focus();
    } else {
      window.classList.remove('open');
    }
  }

  // ─── Initialize ───
  function init() {
    createChatWidget();

    const toggle = document.getElementById('mcwToggle');
    const close = document.getElementById('mcwClose');
    const input = document.getElementById('mcwInput');
    const send = document.getElementById('mcwSend');

    toggle.addEventListener('click', toggleChat);
    close.addEventListener('click', toggleChat);

    send.addEventListener('click', () => processUserInput(input.value));
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') processUserInput(input.value);
    });

    // Quick actions
    document.querySelectorAll('.mcw-quick-action').forEach(btn => {
      btn.addEventListener('click', () => handleQuickAction(btn.dataset.action));
    });

    // Auto-greeting after delay
    if (CONFIG.autoOpen) {
      setTimeout(() => {
        if (!isOpen) {
          toggle.classList.add('pulse');
        }
      }, CONFIG.greetingDelay);
    }

    // Expose for suggestions
    window.mediChat = {
      sendSuggestion: (text) => processUserInput(text)
    };
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();