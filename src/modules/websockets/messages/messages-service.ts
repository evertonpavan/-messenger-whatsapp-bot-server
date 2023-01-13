import Websocket from "../../../shared/infra/websocket/websocket";

class MessagesService {

    public insertOrder(message: any) {
        //save in your database

        console.log(message);

        //send the update to the browser
        this.updateSockets(message);
    }

    private updateSockets(message: any) {
        const io = Websocket.getInstance();
        io.of('messages').emit('orders_updated', { data: [message] });
    }
}

export { MessagesService };