import { injectable } from "tsyringe";
import { deleteUploadedFiles } from "../../../../shared/helpers/deleteUploadedFiles";
import { IMulterFiles } from "../../../../shared/interfaces/IMulterFiles";
import { ISendMessagesRequestDTO } from "./i-send-messages-request-dto";
import fs from "fs";
import puppeteer from "puppeteer";
import { client } from "../../../../shared/infra/http/app";


@injectable()
class SendMessagesUseCase {
    constructor(
    ) { }

    async execute({ unidade, mensagem, contatos }: ISendMessagesRequestDTO): Promise<any> {

        console.log('Iniciando o envio de mensagens...');

        const result = await new Promise(async (resolve, _reject) => {

            var sent = 0;

            await Promise.all(contatos.map(async (contato: string) => {

                try {
                    return new Promise<void>(async (resolve) => {
                        setTimeout(async () => {
                            let contact = contato[2];
                            console.log('enviando mensagem para ' + contact);
                            const log = await sendMessage(contact, mensagem);
                            console.log('log: ' + JSON.stringify(log));
                            sent++;
                            resolve()
                            // refetch();
                        }, 2000);
                    });

                } catch (error) {
                    console.log('error: ' + error)
                }
            }))

            const response = {
                messagesTotal: contatos.length,
                messagesSent: sent,
                messagesFailed: contatos.length === sent ? 0 : contatos.length - sent
            };

            resolve(response)


        }).then(data => {

            console.log('data', data)

            return data
        }).catch(() => { return false })


        return result
    }
}

export { SendMessagesUseCase };


function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}


const sendMessage = async (number: string, text: string) => {
    number = number.replace('@c.us', '');
    number = `${number}@c.us`
    const result = await client.sendMessage(number, text);
    return result
}