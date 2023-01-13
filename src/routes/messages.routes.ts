import { Router } from "express";
import { CheckAuthenticationController } from "../modules/messages/use-cases/check-authentication/check-authentication-controller.";
import { GenerateQRCodeController } from "../modules/messages/use-cases/generate-qr-code/generate-qr-code-controller.";
import { SendMessagesController } from "../modules/messages/use-cases/send-messages/send-messages-controller";

const messagesRoutes = Router();

const generateQRCodeController = new GenerateQRCodeController();
const checkAuthenticationController = new CheckAuthenticationController();
const sendMessagesController = new SendMessagesController();

messagesRoutes.get("/qr-code", generateQRCodeController.handle);
messagesRoutes.get("/check-authentication", checkAuthenticationController.handle);
messagesRoutes.post("/send-messages", sendMessagesController.handle);

export { messagesRoutes };
