import { Socket } from "socket.io";
import MySocketInterface from "./mySocketInterface";

class MessagesSocket implements MySocketInterface {

    handleConnection(socket: Socket) {
        socket.on("connection", (socket) => {
            console.log("We are live and connected2222");
            console.log(socket.id);
        });
    }

    middlewareImplementation(socket: Socket, next: () => any) {
        //Implement your middleware for orders here
        return next();
    }
}

export default MessagesSocket;