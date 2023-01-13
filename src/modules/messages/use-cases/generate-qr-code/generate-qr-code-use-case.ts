import { injectable } from "tsyringe";
// import { client } from "../../../../shared/infra/http/app";
import qrcode from 'qrcode-terminal';
import { AppError } from "../../../../shared/errors/AppError";

const timeout_generate_qrcode = 120000 // 2 minutes
// const timeout_generate_qrcode = 1000 // testing

import { Client, RemoteAuth } from 'whatsapp-web.js';

const { MONGO_URI } = process.env;
import { MongoStore } from "wwebjs-mongo"
import mongoose from "mongoose";
import { createClient } from "../../../sessions/createSession";
import { sessionExists } from "../../../sessions/sessionExists";


@injectable()
class GenerateQRCodeUseCase {
    constructor(
    ) { }

    async execute(id: string): Promise<any> {

        console.log('criando nova session')

        const client = await createClient(id)

        if (!client) {
            throw new AppError('Client not found', 400);
        }

        client.initialize();

        const session = await sessionExists(id);

        if (session) {
            console.log('Session already exists.')

            return {
                message: 'Session already exists.'
            }
        }
        console.log('gerando qr code...');

        var count = 0;

        const result = await new Promise(async (resolve, reject) => {

            var qrCodeGenerated: any = new Promise(async (resolve, reject) => {

                if (count === 0) {
                    client.once('qr', (qr: unknown) => {
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

        // colocar em promise
        client.on('remote_session_saved', () => {
            console.log('remote_session_saved', true)
        })

        client.off('qr', () => { console.log('stopping generate qrcode...') })

        console.log('result', result)

        if (!result) {
            throw new AppError('QR Code não pode ser gerado.')
        }

        return {
            qrCode: result
        }
    }
}

export { GenerateQRCodeUseCase };

