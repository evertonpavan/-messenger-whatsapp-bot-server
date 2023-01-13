import prismaClient from "../../../../../prisma/prisma-client";
import { IWhatsappRepository } from "../i-whatsapp-repository";
import { Client, RemoteAuth, LocalAuth } from 'whatsapp-web.js';
import { minimal_args } from "../../../../shared/helpers/web-whatsapp";
import qrcode from 'qrcode-terminal';

const timeout_generate_qrcode = 120000 // 2 minutes
// const timeout_generate_qrcode = 15000 // 15 seconds
var client: any = {};


class WhatsappRepository implements IWhatsappRepository {

    async initWhatsappWebClient(clientId: any): Promise<any> {
        try {
            if (!client[clientId]) {

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

                webClientIns.initialize();

                const client = webClientIns;

                let qr = await new Promise(async (resolve) => {
                    client.once("qr", (qr: any) => {
                        console.log('generating QR code...')
                        console.log('qr', { qr })
                        qrcode.generate(qr, { small: true });
                        resolve(qr);
                    });
                    // client.on("ready", async () => {
                    //     const created = await this.upsertWhatsappWebByClientId({ clientId, session: {}, status: "ready" });
                    //     console.log('created', created)
                    //     resolve(created);
                    // });
                    setTimeout(() => {
                        this.deleteClientById(clientId)
                        resolve({
                            error:
                                "QR event wasn't emitted in 2 minutes. Please refresh the QRCode",
                        });
                    }, timeout_generate_qrcode);
                });

                return { qrCode: qr, clientId }
            }
        } catch (error: unknown) {
            console.log(clientId, error);
        }
    }

    async getClientById(id: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getAllClients(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async upsertWhatsappWebByClientId(payload: any): Promise<any> {
        try {

            const created = await prismaClient.webWhatsapp.upsert({
                where: { clientId: payload.clientId },
                update: {
                    clientId: payload.clientId,
                    session: JSON.stringify(payload.session),
                    status: payload.status,
                },
                create: {
                    clientId: payload.clientId,
                    session: JSON.stringify(payload.session),
                    status: payload.status,
                },
            });

            return created ? created : null;

        } catch (error: unknown) {
            console.log(payload.clientId, error);
        }
    }

    async deleteClientById(id: any): Promise<any> {
        client[id] = null;
    }

    async deleteWhatsappWebClientById(clientId: any): Promise<any> {
        try {
            prismaClient.webWhatsapp.deleteMany({
                where: {
                    clientId: clientId,
                },
            });

            console.log('deleted', { clientId });

            return true
        } catch (error: unknown) {
            console.log(error)
            return false
        }
    }

    async getStatusOfWhatsappWebByClientId(clientId: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getWhatsappWebByClientIds(clientId: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

export { WhatsappRepository };