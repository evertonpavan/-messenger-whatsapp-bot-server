import { Router } from "express";
import { ensureAuthenticate } from "../shared/infra/http/middlewares/ensureAuthenticate";

const router = Router();

import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { passwordRoutes } from "./password.routes";
import { messagesRoutes } from "./messages.routes";
import { sessionsRoutes } from "./sessions.routes";
import { whatsappRoutes } from "./whatsapp.routes";

import { SendMessagesController } from "../modules/messages/use-cases/send-messages/send-messages-controller";

const sendMessagesController = new SendMessagesController();

messagesRoutes.post("/send-messages", sendMessagesController.handle);

router.use('/auth', authenticateRoutes)
router.use("/password", passwordRoutes);
router.use("/users", ensureAuthenticate, usersRoutes);
router.use("/",
    ensureAuthenticate,
    messagesRoutes
);
router.use("/sessions",
    ensureAuthenticate,
    sessionsRoutes
);

router.use("/whatsapp",
    ensureAuthenticate,
    whatsappRoutes
);


export { router };