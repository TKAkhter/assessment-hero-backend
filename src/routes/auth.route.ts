import { Router } from "express";

import { extendToken, login, register } from "../controller/auth.controller";
import { zodValidate } from "../middlewares/zod-validate";
import { userLoginSchema, userRegisterSchema } from "../schema/user.schema";

const authRouter = Router();

authRouter.post('/register', zodValidate(userRegisterSchema), register);
authRouter.post("/login", zodValidate(userLoginSchema), login);
authRouter.post("/extend-token", extendToken);

export default authRouter;
