import { Router, Request, Response, NextFunction } from 'express';
import { SendMessageInputPort } from '../../../../application/ports/inbound/SendMessageInputPort';
import { ListConversationsInputPort } from '../../../../application/ports/inbound/ListConversationsInputPort';
import { GetConversationHistoryInputPort } from '../../../../application/ports/inbound/GetConversationHistoryInputPort';

/**
 * Adaptador de entrada (primario): traduce peticiones HTTP a llamadas de los
 * casos de uso (puertos de entrada). No contiene lógica de negocio.
 */
export function createChatRouter(deps: {
  sendMessageUseCase: SendMessageInputPort;
  listConversationsUseCase: ListConversationsInputPort;
  getConversationHistoryUseCase: GetConversationHistoryInputPort;
}): Router {
  const router = Router();

  router.post('/messages', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { to, text } = req.body;
      const result = await deps.sendMessageUseCase.execute({ to, text });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.get('/conversations', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deps.listConversationsUseCase.execute();
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  router.get('/conversations/:id/messages', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deps.getConversationHistoryUseCase.execute(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
