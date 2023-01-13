import { inject, injectable } from "tsyringe";
import { IWhatsappRepository } from "../../repositories/i-whatsapp-repository";
import { AppError } from "../../../../shared/errors/AppError";
import { Client, RemoteAuth, LocalAuth, LegacySessionAuth, NoAuth } from 'whatsapp-web.js';
import { minimal_args } from "../../../../shared/helpers/web-whatsapp";
import qrcode from 'qrcode-terminal';
import fs from 'node:fs';

const timeout_generate_qrcode = 120000 // 2 minutes

// var client: any = {};

@injectable()
class GenerateQRCodeUseCase {
    constructor(
        @inject("WhatsappRepository")
        private whatsappRepository: IWhatsappRepository,
    ) { }

    async execute({ clientId }: { clientId: string }): Promise<any> {
        try {
            console.log('clientId', { clientId })

            const deleted = await this.whatsappRepository.deleteWhatsappWebClientById(clientId);

            if (!deleted) {
                throw new AppError(`ClientId ${clientId} has not been deleted`, 400);
            }

            const webClientIns = new Client({
                authTimeoutMs: 60000,
                puppeteer: {
                    headless: true,
                    args: minimal_args,
                },
                qrMaxRetries: 10,
                authStrategy: new NoAuth()
                // authStrategy: new LocalAuth({
                //     clientId: clientId
                // }),
            })

            webClientIns.initialize();

            var client = webClientIns;

            let qr = await new Promise(async (resolve) => {
                client.once("qr", (qr: any) => {
                    console.log('generating QR code...')
                    console.log('qr', { qr })
                    qrcode.generate(qr, { small: true });
                    resolve(qr);
                });
                client.on("ready", async () => {
                    console.log('ready')
                });
                client.on('authenticated', async (session: unknown) => {
                    // Save the session object however you prefer.
                    // Convert it to json, save it to a file, store it in a database...
                    console.log({ session });
                    const sessionData = session;
                    const created = await this.whatsappRepository.upsertWhatsappWebByClientId({ clientId, session: sessionData, status: "ready" });
                    console.log('created', created)
                });
                setTimeout(() => {
                    this.whatsappRepository.deleteClientById(clientId)
                    resolve({
                        error:
                            "QR event wasn't emitted in 2 minutes. Please refresh the QRCode",
                    });
                }, timeout_generate_qrcode);
            });

            // const client = await his.whatsappRepository.initWhatsappWebClient(clientId);

            return { qrCode: qr, clientId }

        } catch (e: any) {
            return { qrCode: { error: e.message }, clientId };
        }
    }
}

export { GenerateQRCodeUseCase };

