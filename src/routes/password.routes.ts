import { Router } from "express";
import { ChangePasswordUserController } from "../modules/accounts/use-cases/change-password-user/change-password-user-controller";
import { ResetPasswordUserController } from "../modules/accounts/use-cases/reset-password-user/reset-password-user-controller";
import { ensureAuthenticate } from "../shared/infra/http/middlewares/ensureAuthenticate";


const passwordRoutes = Router();

// const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController;
const changePasswordUserController = new ChangePasswordUserController;


// passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);
passwordRoutes.post("/change", ensureAuthenticate, changePasswordUserController.handle);


export { passwordRoutes };
