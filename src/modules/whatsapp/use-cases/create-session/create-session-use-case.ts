import { inject, injectable } from "tsyringe";
import { IWhatsappRepository } from "../../repositories/i-whatsapp-repository";
import { AppError } from "../../../../shared/errors/AppError";
import { minimal_args } from "../../../../shared/helpers/web-whatsapp";
import { Client, RemoteAuth, LocalAuth } from 'whatsapp-web.js';
const timeout_generate_qrcode = 120000 // 2 minutes


@injectable()
class CreateSessionUseCase {
    constructor(
        @inject("WhatsappRepository")
        private whatsappRepository: IWhatsappRepository,
    ) { }

    async execute({ clientId }: { clientId: string }): Promise<any> {
        try {
            const webClientIns = new Client({
                authTimeoutMs: 60000,
                puppeteer: {
                    headless: true,
                    args: minimal_args,
                },
                qrMaxRetries: 10,
                authStrategy: new LocalAuth({
                    clientId: clientId
                }),
            })


            const client = webClientIns;

            let auth = await new Promise(async (resolve) => {
                client.on("authenticated", async () => {
                    console.log('authenticated')
                    resolve({ authenticated: true });
                });
                setTimeout(() => {
                    resolve({
                        error:
                            "Unable to verify session. Please try again",
                    });
                }, timeout_generate_qrcode);
            })


            return { auth }

        } catch (e: any) {
            return { qrCode: { error: e.message }, clientId };
        }
    }
}

export { CreateSessionUseCase };

