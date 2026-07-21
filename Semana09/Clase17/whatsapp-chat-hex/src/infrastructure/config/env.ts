export const env = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  whatsappSessionName: process.env.WHATSAPP_SESSION_NAME ?? 'whatsapp-chat-hex',
};
