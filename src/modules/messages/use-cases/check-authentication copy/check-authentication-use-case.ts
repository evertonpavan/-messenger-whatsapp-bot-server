import { injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { createClient } from "../createSession";
import { restoreSession } from "../restoreSession";

@injectable()
class CheckAuthenticationUseCase {
    constructor(
    ) { }

    async execute(id: string): Promise<any> {

        console.log('checking authentication...');

        const client = await restoreSession(id);

        console.log('CheckAuthenticationUseCase client', client)

        if (!client) {
            throw new AppError('Client not found', 400);
        }
        client.initialize();

        const result: any = await new Promise(async (resolve, _reject) => {

            console.log('CheckAuthenticationUseCase client', client)

            client.getState().then((data: any) => {
                console.log(data)
                if (data === 'CONNECTED') {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });

        }).then(data => {
            // console.log('data', data)
            return data
        }).catch(() => { return false })

        // console.log('result', result)
        return {
            authenticated: result
        }
    }
}

export { CheckAuthenticationUseCase };

