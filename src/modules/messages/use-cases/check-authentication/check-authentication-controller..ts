import { Request, Response } from "express";
import { container } from "tsyringe";

import { CheckAuthenticationUseCase } from "./check-authentication-use-case";

class CheckAuthenticationController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.user;

        const checkAuthenticationUseCase = container.resolve(CheckAuthenticationUseCase);

        const data = await checkAuthenticationUseCase.execute(id);

        return response.status(200).send(data);
    }
}

export { CheckAuthenticationController };
