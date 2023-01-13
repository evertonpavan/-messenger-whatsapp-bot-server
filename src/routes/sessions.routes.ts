import { Router } from "express";
import { DeleteSessionController } from "../modules/sessions/delete-session/delete-session-controller.";

const sessionsRoutes = Router();

const deleteSessionController = new DeleteSessionController();

sessionsRoutes.delete("/", deleteSessionController.handle);

export { sessionsRoutes };
