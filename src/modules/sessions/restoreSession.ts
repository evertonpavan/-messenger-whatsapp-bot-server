const { MongoStore } = require('wwebjs-mongo');
import mongoose from 'mongoose';
import { Client, RemoteAuth } from 'whatsapp-web.js';
import { createClient } from './createSession';
const { MONGO_URI } = process.env;


const restoreSession = async (clientInstanceId: string) => {
    return mongoose
        .connect(MONGO_URI || "", {
            // tlsCAFile: `key.pem`,
        })
        .then(async () => {

            const result: any = await new Promise(async (resolve, _reject) => {

                const store = new MongoStore({ mongoose: mongoose });

                console.log(`restoreSession ${clientInstanceId}`)

                const sessionExists = await store.sessionExists({ session: `RemoteAuth-${clientInstanceId}` })
                console.log(`sessionExists ${clientInstanceId}`, sessionExists)

                if (!sessionExists) {
                    resolve(false);
                }

                // const client = await createClient(clientInstanceId)

                const result2: any = await new Promise(async (resolve, _reject) => {
                    const restore = await store.extract({
                        session: `RemoteAuth-${clientInstanceId}`,
                        // path: `/home/everton/Documentos/desenvolvimento/ifrs/messenger-sever/.wwebjs_auth/RemoteAuth-${clientInstanceId}`
                        path: `RemoteAuth-${clientInstanceId}`
                        // path: `RemoteAuth-${clientInstanceId}.zip`
                    })
                    console.log({ restore })

                    if (!restore) {
                        resolve(false);
                    }

                    resolve(true);

                }).then(data => {
                    // console.log('data', data)
                    return data
                }).catch(() => { return false })


                if (!result2) {
                    resolve(false);
                }
                resolve(true)

                return result2;


                // return sessionExists;


            }).then(data => {
                // console.log('data', data)
                return data
            }).catch(() => { return false })

            // const client = new Client({
            //     authTimeoutMs: 60000,
            //     puppeteer: {
            //         headless: true,
            //         args: minimal_args,
            //     },
            //     qrMaxRetries: 10,
            //     authStrategy: new RemoteAuth({
            //         store: session,
            //         // backupSyncIntervalMs: 300000,
            //         backupSyncIntervalMs: 60000,
            //         clientId: clientInstanceId,
            //     }),
            // });


            // client.initialize().then(async () => {
            // });



            return result;
        });
};

export { restoreSession };

const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-gpu',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
];