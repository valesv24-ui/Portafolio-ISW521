export interface MessageDTO {
  id: string;
  conversationId: string;
  content: string;
  direction: 'INBOUND' | 'OUTBOUND';
  status: string;
  timestamp: string;
}
