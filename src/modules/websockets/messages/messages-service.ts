import Websocket from "../../../shared/infra/websocket/websocket";

class MessagesService {

    public sendQrCode({ qrCode }: any) {

        this._sendQrCode(qrCode);
    }

    private _sendQrCode(qrCode: string) {
        const io = Websocket.getInstance();
        io.of('messages').emit('qrCode', { qrCode });
    }

    public sendConnectionStatus({ connectionStatus }: any) {

        this._sendConnectionStatus(connectionStatus);
    }

    private _sendConnectionStatus(connectionStatus: boolean) {
        const io = Websocket.getInstance();
        io.of('messages').emit('connectionStatus', { connectionStatus });
    }
}

export { MessagesService };