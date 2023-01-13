import env from "../../../../env.config";
const isDevelopment = env.isDevelopment();
const isProduction = env.isProduction();
console.log('env', env);
console.log('isDevelopment', isDevelopment);
console.log('isProduction', isProduction);

import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import "../../container/index";
import { router } from "../../../routes";
import { AppError } from "../../errors/AppError";
import http from "http";

import connectDB from "../../../config/database";

import Websocket from './../websocket/websocket';
import { Server } from "socket.io";
import MessagesSocket from "../websocket/messages.socket";

const app = express();

app.use(express.json())

app.use(cors());

app.use(router);

// Set default API response
app.get('/', (req, res) => {
    console.log('OK');
    res.send('OK');
});

app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
    }
);
var server = http.createServer(app);
const io = Websocket.getInstance(server);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//     },
// });

// io.on("connection", (socket) => {
//     console.log("We are live and connected");
//     console.log(socket.id);
// });

io.initializeHandlers([
    { path: '/messages', handler: new MessagesSocket() }
]);

export {
    server, connectDB, io
};