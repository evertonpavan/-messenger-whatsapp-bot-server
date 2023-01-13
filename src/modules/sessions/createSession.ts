const { MongoStore } = require('wwebjs-mongo');
import mongoose from 'mongoose';
import { Client, RemoteAuth } from 'whatsapp-web.js';
const { MONGO_URI } = process.env;


const createClient = async (clientInstanceId: string) => {
    return mongoose
        .connect(MONGO_URI || "", {
            // tlsCAFile: `key.pem`,
        })
        .then(() => {
            // Logger.log(
            //   '📦 Creating session for instance with deviceId ' + uniqueId,
            //   'WWJS Client',
            // );

            const store = new MongoStore({ mongoose: mongoose });
            const client = new Client({
                authTimeoutMs: 60000,
                puppeteer: {
                    headless: true,
                    args: minimal_args,
                },
                qrMaxRetries: 10,
                authStrategy: new RemoteAuth({
                    store: store,
                    // backupSyncIntervalMs: 300000,
                    backupSyncIntervalMs: 60000,
                    clientId: clientInstanceId,
                }),

            });

            // client.on('qr', (qr) => {
            //     //   Logger.log('QRCode: ' + uniqueId + qr, 'WWJS Client');

            //     //   QRCode.toDataURL(qr, function? (err, qr) {
            //     client.qr = qr;
            //     //   });
            // });

            // client.initialize().then(async () => {
            //     let wwwversion = await client.getWWebVersion();

            //     Logger.log(
            //         'Client ' + uniqueId + ' initialized with version: ' + wwwversion,
            //         'WWJS Client',
            //     );
            // });

            // client.qr = '';

            // Logger.log('✅ Session ' + uniqueId + ' created', 'WWJS Client');

            return client;
        });
};

export { createClient };

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