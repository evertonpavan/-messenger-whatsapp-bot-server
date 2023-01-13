
interface IWhatsappRepository {
    initWhatsappWebClient(clientId: any): Promise<any>;

    getClientById(id: any): Promise<any>;
    getAllClients(): Promise<any>;

    upsertWhatsappWebByClientId(payload: any): Promise<any>;

    deleteClientById(id: any): Promise<any>;
    deleteWhatsappWebClientById(clientId: any): Promise<any>;

    getStatusOfWhatsappWebByClientId(clientId: any): Promise<any>;
    getWhatsappWebByClientIds(clientId: any): Promise<any>;
}

export { IWhatsappRepository };
