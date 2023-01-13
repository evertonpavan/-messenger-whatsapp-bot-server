import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendMessagesUseCase } from "./send-messages-use-case";

class SendMessagesController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.user;

        const { unidade, mensagem, contatos } = request.body

        const sendMessagesUseCase = container.resolve(SendMessagesUseCase);

        const data = await sendMessagesUseCase.execute({ id, unidade, mensagem, contatos });

        return response.status(200).send(data);
    }
}

export { SendMessagesController };
