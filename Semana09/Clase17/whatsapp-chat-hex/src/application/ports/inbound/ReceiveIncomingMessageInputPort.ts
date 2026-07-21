import { IncomingMessageDTO } from '../../dto/IncomingMessageDTO';
import { MessageDTO } from '../../dto/MessageDTO';

/** Puerto de entrada: contrato para procesar un mensaje entrante desde WhatsApp */
export interface ReceiveIncomingMessageInputPort {
  execute(dto: IncomingMessageDTO): Promise<MessageDTO>;
}
