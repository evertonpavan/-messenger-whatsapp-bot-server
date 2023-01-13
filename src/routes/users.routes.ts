import { Router } from "express";
import { CreateUserController } from "../modules/accounts/use-cases/create-user/create-user-controller";
import { ProfileUserController } from "../modules/accounts/use-cases/profile-user/profile-user-controller";
import { ensureAdmin } from "../shared/infra/http/middlewares/ensureAdmin";

// import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", ensureAdmin, createUserController.handle);
usersRoutes.get("/profile", profileUserController.handle);


export { usersRoutes };
