import { injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { deleteSession } from "../deleteSession";

@injectable()
class DeleteSessionUseCase {
    constructor(
    ) { }

    async execute(id: string): Promise<any> {

        const client = await deleteSession(id);

        return
    }
}

export { DeleteSessionUseCase };

