import { Router } from "express";

import { login, register } from "../controller/auth.controller";
import { zodValidate } from "../middlewares/zod-validate";
import { userLoginSchema, userRegisterSchema } from "../schema/user.schema";

const authRouter = Router();

authRouter.post('/register', zodValidate(userRegisterSchema), register);
authRouter.post("/login", zodValidate(userLoginSchema), login);

export default authRouter;
