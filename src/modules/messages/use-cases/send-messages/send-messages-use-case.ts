import { injectable } from "tsyringe";
import { Client } from "whatsapp-web.js";
import { AppError } from "../../../../shared/errors/AppError";
import { minimal_args } from "../../../../shared/helpers/web-whatsapp";
import { createClient } from "../../../sessions/createSession";
import { MessagesService } from "../../../websockets/messages/messages-service";
import { ISendMessagesRequestDTO } from "./i-send-messages-request-dto";

const timeout_generate_qrcode = 120000 // 2 minutes
// const timeout_generate_qrcode = 15000 // production

@injectable()
class SendMessagesUseCase {
    constructor(
    ) { }

    async execute({ id, unidade, mensagem, contatos }: ISendMessagesRequestDTO): Promise<any> {

        console.log('Iniciando o envio de mensagens...');

        console.log('criando nova session')

        const webWhatsappClient = new Client({
            authTimeoutMs: 60000,
            puppeteer: {
                headless: true,
                args: minimal_args,
            },
            qrMaxRetries: 10,
            // authStrategy: new LocalAuth({
            //     clientId: clientId
            // }),
        })

        webWhatsappClient.initialize();

        console.log('gerando qr code...');

        var count = 0;

        const qrCode = await new Promise(async (resolve, reject) => {

            var qrCodeGenerated: any = new Promise(async (resolve, reject) => {

                if (count === 0) {
                    webWhatsappClient.once('qr', (qr: unknown) => {
                        // console.log('qr', qr)
                        // console.log('count', count)
                        count++;
                        resolve(qr)
                    });
                    setTimeout(() => {
                        reject(false);
                    }, timeout_generate_qrcode)
                }
            }).then(data => {
                // console.log('data', data)
                return data
            }).catch(() => { return false })

            resolve(qrCodeGenerated)

        }).then(data => {
            // console.log('data', data)
            return data
        }).catch(() => { return false })

        if (!qrCode) {
            throw new AppError('QR Code não pode ser gerado.')
        }

        let messagesService = new MessagesService();
        messagesService.sendQrCode({ qrCode })

        const connectionStatus: any = await new Promise(async (resolve, _reject) => {

            console.log('CheckAuthenticationUseCase client', webWhatsappClient)

            webWhatsappClient.on('ready', async () => {
                await webWhatsappClient.getState().then((data: any) => {
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

        messagesService.sendConnectionStatus({ connectionStatus })

        if (connectionStatus) {

            const response = await new Promise(async (resolve, _reject) => {

                var sent = 0;
                var failed = 0;

                await Promise.all(contatos.map(async (contato: string) => {

                    try {
                        return new Promise<void>(async (resolve) => {
                            setTimeout(async () => {
                                let contact = contato[2];
                                console.log('enviando mensagem para ' + contact);
                                const log = await sendMessage(webWhatsappClient, contact, mensagem);
                                console.log('log: ' + JSON.stringify(log));
                                sent++;
                                resolve()
                            }, 2000);
                        });

                    } catch (error) {
                        console.log('error: ' + error)
                        failed++;
                    }
                }))

                const total = {
                    messagesTotal: contatos.length,
                    messagesSent: sent,
                    messagesFailed: contatos.length === sent ? 0 : contatos.length - sent
                };

                resolve(total)


            }).then(data => {
                return data
            }).catch(() => { return false })


            return response
        }



        return {
            qrCode: qrCode
        }
    }
}

export { SendMessagesUseCase };


function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}


const sendMessage = async (client: any, number: string, text: string) => {
    number = number.replace('@c.us', '');
    number = `${number}@c.us`
    const result = await client.sendMessage(number, text);
    return result
}