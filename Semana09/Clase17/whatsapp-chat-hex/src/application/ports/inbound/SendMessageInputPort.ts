import { SendMessageDTO } from '../../dto/SendMessageDTO';
import { MessageDTO } from '../../dto/MessageDTO';

/** Puerto de entrada (primario): contrato que expone el caso de uso "enviar mensaje" */
export interface SendMessageInputPort {
  execute(dto: SendMessageDTO): Promise<MessageDTO>;
}
