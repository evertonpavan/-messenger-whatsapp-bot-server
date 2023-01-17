import { Router } from "express";
import { ensureAuthenticate } from "../shared/infra/http/middlewares/ensureAuthenticate";

const router = Router();

import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { passwordRoutes } from "./password.routes";

import { SendMessagesController } from "../modules/messages/use-cases/send-messages/send-messages-controller";

const sendMessagesController = new SendMessagesController();

router.use('/auth', authenticateRoutes)
router.use("/password", passwordRoutes);
router.use("/users", ensureAuthenticate, usersRoutes);

router.post("/send-messages",
    ensureAuthenticate,
    sendMessagesController.handle
);

export { router };