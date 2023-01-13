interface ISendMessagesRequestDTO {
    id: string;
    unidade: string;
    mensagem: string;
    contatos: string[];
}

export { ISendMessagesRequestDTO }