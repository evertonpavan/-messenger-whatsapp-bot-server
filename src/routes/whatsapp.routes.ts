import { Router } from "express";
import { CreateSessionController } from "../modules/whatsapp/use-cases/create-session/create-session-controller.";
import { GenerateQRCodeController } from "../modules/whatsapp/use-cases/generate-qr-code/generate-qr-code-controller.";

const whatsappRoutes = Router();

const generateQRCodeController = new GenerateQRCodeController();
const createSessionController = new CreateSessionController();

whatsappRoutes.get("/qrcode", generateQRCodeController.handle);
whatsappRoutes.post("/sessions", createSessionController.handle);

export { whatsappRoutes };
