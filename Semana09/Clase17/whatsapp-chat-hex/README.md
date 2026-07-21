# WhatsApp Chat Hexagonal

Chat en tiempo real sobre WhatsApp implementado con **arquitectura hexagonal (puertos y adaptadores)**,
**Domain-Driven Design (DDD)** y principios **SOLID**, usando la librería no oficial
[`@whiskeysockets/baileys`](https://github.com/WhiskeySockets/Baileys) como puerta de entrada/salida a WhatsApp
y Socket.io para push en tiempo real hacia el navegador.

> Nota: el proyecto originalmente usaba `whatsapp-web.js` (que automatiza un Chrome real vía Puppeteer),
> pero se migró a Baileys porque `whatsapp-web.js` presenta actualmente un bug conocido y sin resolver
> (`Execution context was destroyed`) en varios hilos abiertos de su repositorio. Baileys habla el
> protocolo de WhatsApp Web directamente por WebSocket, sin navegador, lo que evita ese problema.
> Gracias a la arquitectura hexagonal, este cambio sólo afectó un archivo: el adaptador
> `WhatsAppGateway` (antes `WhatsAppWebJsGateway`, ahora `BaileysGateway`).

## Arquitectura

```
src/
├── domain/                     # Núcleo del negocio. No depende de nada externo.
│   ├── entities/                Conversation (aggregate root), Message
│   ├── value-objects/           PhoneNumber, MessageId, ConversationId, MessageContent, enums
│   ├── events/                  Eventos de dominio (MessageReceivedEvent, MessageSentEvent)
│   └── repositories/            Puerto ConversationRepository (interfaz)
│
├── application/                # Casos de uso. Orquesta el dominio, no conoce infraestructura.
│   ├── use-cases/                SendMessageUseCase, ReceiveIncomingMessageUseCase,
│   │                              ListConversationsUseCase, GetConversationHistoryUseCase
│   ├── ports/inbound/            Contratos que exponen los casos de uso
│   ├── ports/outbound/           WhatsAppGateway, RealtimeNotifier (interfaces)
│   └── dto/                      Objetos de transferencia de datos
│
└── infrastructure/              # Detalles técnicos. Implementa los puertos.
    ├── adapters/inbound/http/     Express: rutas REST -> casos de uso
    ├── adapters/inbound/websocket/ Socket.io server (transporte)
    ├── adapters/outbound/whatsapp/ BaileysGateway (@whiskeysockets/baileys)
    ├── adapters/outbound/persistence/ InMemoryConversationRepository
    ├── adapters/outbound/realtime/ SocketIoRealtimeNotifier
    └── config/                    container.ts (composition root), env.ts
```

### Por qué hexagonal + DDD aquí

- **Dominio aislado**: `Conversation` y `Message` no importan Express, Socket.io ni Baileys.
  Las reglas ("un mensaje no puede estar vacío", "una conversación pertenece a un único contacto")
  viven sólo ahí. Incluso `PhoneNumber` sólo guarda dígitos: el sufijo de proveedor
  (`@s.whatsapp.net`, `@c.us`, etc.) lo arma cada adaptador concreto.
- **Puertos de entrada** (`application/ports/inbound`): contratos que usan los adaptadores HTTP/eventos
  para invocar casos de uso, sin acoplarse a su implementación concreta.
- **Puertos de salida** (`application/ports/outbound`): `WhatsAppGateway` y `RealtimeNotifier` permiten
  cambiar de proveedor de WhatsApp (Baileys, whatsapp-web.js, Cloud API oficial de Meta) o de transporte
  en tiempo real (Socket.io, SSE...) sin tocar casos de uso. Esto ya pasó en la práctica: el proyecto
  empezó con `whatsapp-web.js` y se migró a Baileys sin tocar dominio ni aplicación.
- **Composition root** (`infrastructure/config/container.ts`): único lugar que conoce e instancia clases
  concretas y las conecta (inyección de dependencias manual).

### SOLID aplicado

| Principio | Dónde se ve |
|---|---|
| **S**ingle Responsibility | Cada caso de uso hace una sola cosa; `Conversation` sólo gestiona su propio invariante |
| **O**pen/Closed | Nuevos adaptadores (ej. `MongoConversationRepository`) se agregan sin modificar dominio/aplicación |
| **L**iskov Substitution | Cualquier implementación de `ConversationRepository` o `WhatsAppGateway` es intercambiable |
| **I**nterface Segregation | Puertos pequeños y específicos (`WhatsAppGateway`, `RealtimeNotifier`) en vez de una interfaz gigante |
| **D**ependency Inversion | Application/domain dependen de interfaces; infraestructura depende hacia adentro |

## Requisitos

- Node.js 18+
- Una cuenta de WhatsApp para escanear el código QR (no requiere Chrome/Puppeteer instalado)

## Instalación y ejecución

```bash
npm install
cp .env.example .env
npm run dev        # desarrollo (ts-node-dev)
# o
npm run build && npm start   # producción
```

Al iniciar, la consola mostrará un código QR: escanéalo desde WhatsApp → Dispositivos vinculados.
Una vez conectado, abre `http://localhost:3000` para ver la demo de chat en tiempo real.

## API REST

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/messages` | Envía un mensaje. Body: `{ "to": "521234567890", "text": "Hola" }` |
| GET | `/api/conversations` | Lista conversaciones (resumen) |
| GET | `/api/conversations/:id/messages` | Historial de una conversación |

Los mensajes entrantes de WhatsApp se procesan automáticamente (evento `messages.upsert` de Baileys)
y se emiten por WebSocket (`message:new`) a todos los clientes conectados. Por ahora sólo se procesan
chats individuales (se ignoran mensajes de grupos, jid terminado en `@g.us`).

## Notas

- La persistencia por defecto es en memoria (`InMemoryConversationRepository`), pensada para
  desarrollo/demo. Para producción, implementa `ConversationRepository` contra una base de datos
  y reemplázala en `container.ts` — el resto del sistema no cambia.
- La sesión autenticada de WhatsApp se guarda en la carpeta `auth_info_baileys/` (ignorada en git).
  Si necesitas volver a escanear el QR desde cero, borra esa carpeta y reinicia.
- Baileys no es la API oficial de Meta; úsala conforme a los términos de servicio de WhatsApp.
