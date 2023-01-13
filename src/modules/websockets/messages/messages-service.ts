import Websocket from "../../../shared/infra/websocket/websocket";

class MessagesService {

    public sendQrCode({ qrCode }: any) {

        this.responseQrCode(qrCode);
    }

    private responseQrCode(qrCode: string) {
        const io = Websocket.getInstance();
        io.of('messages').emit('qrCode', { qrCode });
    }

    public sendConnectionStatus({ connectionStatus }: any) {

        this.responseConnectionStatus(connectionStatus);
    }

    private responseConnectionStatus(connectionStatus: boolean) {
        const io = Websocket.getInstance();
        io.of('messages').emit('connectionStatus', { connectionStatus });
    }
}

export { MessagesService };