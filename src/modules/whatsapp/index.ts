import prismaClient from "../../../prisma/prisma-client";

import { Client, RemoteAuth } from 'whatsapp-web.js';

var client: any = {};

async function initWhatsappWebClient(clientId: any) {

  try {

    if (!client[clientId]) {

      // // const webClientIns = new Client();
      // console.log('webClientIns', webClientIns)
      // webClientIns.initialize();
      // client[clientId] = webClientIns;

    }
  } catch (e) {
    console.log("--== **> *#ctrl initWhatsappWebClient ==--", clientId, e);
  }
  return client[clientId];
}

async function deleteWhatsappWebClientById(clientId: any) {

  try {
    return prismaClient.webWhatsapp.deleteMany({
      where: {
        clientId: clientId,
      },
    });
  } catch (error) {
    console.log(error)
  }

}

async function upsertWhatsappWebByClientId(payload: any) {
  return await prismaClient.webWhatsapp.upsert({
    where: { clientId: payload.clientId },
    update: {
      clientId: payload.clientId,
      session: JSON.stringify(payload.session),
      status: payload.status,
    },
    create: {
      clientId: payload.clientId,
      session: JSON.stringify(payload.session),
      status: payload.status,
    },
  });
}

async function deleteClientById(id: any) {
  client[id] = null;
}

export {
  initWhatsappWebClient,

  deleteClientById,

  deleteWhatsappWebClientById,
  upsertWhatsappWebByClientId
};


module.exports = {
  getClientById: (id: any) => client[id],
  getAllClients: () => client,
  getStatusOfWhatsappWebByClientId: async (clientId: any) => {
    return prismaClient.webWhatsapp.findUnique({
      where: {
        clientId: clientId,
      },
    });
  },
  getWhatsappWebByClientIds: async (clientId: any) => {
    return prismaClient.webWhatsapp.findMany();
  },
};
