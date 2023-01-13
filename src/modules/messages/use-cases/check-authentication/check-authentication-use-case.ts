import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { createClient } from "../../../sessions/createSession";
import { restoreSession } from "../../../sessions/restoreSession";

@injectable()
class CheckAuthenticationUseCase {
    constructor(
    ) { }

    async execute(id: string): Promise<any> {

        console.log('checking session authentication...');

        const client = await createClient(id)

        if (!client) {
            throw new AppError('Client not found', 400);
        }


        const result: any = await new Promise(async (resolve, _reject) => {

            console.log('CheckAuthenticationUseCase client', client)

            client.on('ready', async () => {
                await client.getState().then((data: any) => {
                    console.log('checking if sessions is connected...', data)
                    if (data === 'CONNECTED') {
                        resolve(true);
                        return true
                    } else {
                        resolve(false);
                        return false
                    }
                });
            })


        }).then(data => {
            // console.log('data', data)
            return data
        }).catch(() => { return false })

        // console.log('result', result)

        client.initialize();

        return {
            authenticated: result
        }
    }
}

export { CheckAuthenticationUseCase };

