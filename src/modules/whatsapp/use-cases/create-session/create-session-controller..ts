import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSessionUseCase } from "./create-session-use-case";

class CreateSessionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const createSessionUseCase = container.resolve(CreateSessionUseCase);

        const data = await createSessionUseCase.execute({
            clientId: id
        });

        return response.status(200).send(data);
    }
}

export { CreateSessionController };
