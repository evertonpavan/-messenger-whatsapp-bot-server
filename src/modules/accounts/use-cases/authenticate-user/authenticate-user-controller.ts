import { Response, Request } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email, username } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

        const token = await authenticateUserUseCase.execute({
            password,
            email,
            username
        });

        return response.status(200).send(token);
    }
}

export { AuthenticateUserController };
