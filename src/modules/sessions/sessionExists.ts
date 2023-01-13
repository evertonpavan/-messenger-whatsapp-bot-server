const { MongoStore } = require('wwebjs-mongo');
import mongoose from 'mongoose';
import { Client, RemoteAuth } from 'whatsapp-web.js';
import { createClient } from './createSession';
const { MONGO_URI } = process.env;


const sessionExists = async (clientInstanceId: string) => {
    return mongoose
        .connect(MONGO_URI || "", {
            // tlsCAFile: `key.pem`,
        })
        .then(async () => {

            const result: any = await new Promise(async (resolve, _reject) => {

                const store = new MongoStore({ mongoose: mongoose });

                console.log(`Checking if session ${clientInstanceId} exists`)

                const sessionExists = await store.sessionExists({ session: `RemoteAuth-${clientInstanceId}` })

                if (!sessionExists) {
                    resolve(false);
                }

                resolve(true)

            }).then(data => {
                // console.log('data', data)
                return data
            }).catch(() => { return false })


            return result;
        });
};

export { sessionExists };
