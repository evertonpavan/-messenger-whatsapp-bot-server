import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteSessionUseCase } from "./delete-session-use-case";

class DeleteSessionController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.user;

        const deleteSessionUseCase = container.resolve(DeleteSessionUseCase);

        const data = await deleteSessionUseCase.execute(id);

        return response.status(200).send(data);
    }
}

export { DeleteSessionController };
