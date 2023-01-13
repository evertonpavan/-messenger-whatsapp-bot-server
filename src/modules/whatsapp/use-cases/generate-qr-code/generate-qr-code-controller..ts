import { Request, Response } from "express";
import { container } from "tsyringe";

import { GenerateQRCodeUseCase } from "./generate-qr-code-use-case";

class GenerateQRCodeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const generateQRCodeUseCase = container.resolve(GenerateQRCodeUseCase);

        const data = await generateQRCodeUseCase.execute({
            clientId: id
        });

        return response.status(200).send(data);
    }
}

export { GenerateQRCodeController };
