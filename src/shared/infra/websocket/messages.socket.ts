import { Socket } from "socket.io";
import MySocketInterface from "./mySocketInterface";
import { verify } from "jsonwebtoken";
import auth from "../../../config/auth";
import { AppError } from "../../errors/AppError";

interface IPayload {
    sub: string;
}

interface ISocket extends Socket {
    userId?: string;
    // other additional attributes here, example:
    // surname?: string;
}

// @injectable()
class MessagesSocket implements MySocketInterface {
    // constructor(
    //     @inject("SessionsRepository")
    //     private sessionsRepository: ISessionsRepository,
    // ) { }

    async handleConnection(socket: ISocket) {

        // console.log("handleConnection");

        // console.log('socket.userId', socket.userId)
    }

    async middlewareImplementation(socket: ISocket, next: () => any) {

        // console.log("middlewareImplementation");

        // const { token } = socket.handshake.auth;

        // try {
        //     const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        //     socket.userId = user_id

        //     next();
        // } catch (error) {
        //     throw new AppError("Invalid token!", 401);
        // }


        return next();
    }
}

export default MessagesSocket;
