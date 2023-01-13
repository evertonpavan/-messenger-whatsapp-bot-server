import { injectable } from "tsyringe";
import { MessagesService } from "../../../websockets/messages/messages-service";
import { ISendMessagesRequestDTO } from "./i-send-messages-request-dto";


@injectable()
class SendMessagesUseCase {
    constructor(
    ) { }

    async execute({ id, unidade, mensagem, contatos }: ISendMessagesRequestDTO): Promise<any> {

        console.log('Iniciando o envio de mensagens...');

        let messagesService = new MessagesService();
        messagesService.insertOrder({
            id: 1,
            name: 'test'
        });

        return {
            id
        }

    }
}

export { SendMessagesUseCase };


// function delay(time: number) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, time);
//     });
// }


// const sendMessage = async (number: string, text: string) => {
//     number = number.replace('@c.us', '');
//     number = `${number}@c.us`
//     const result = await client.sendMessage(number, text);
//     return result
// }