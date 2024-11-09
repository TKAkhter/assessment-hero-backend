import { Router } from "express";

import { validateToken } from "../middlewares/validate-token";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/users.controller";
import { zodValidate } from "../middlewares/zod-validate";
import { usernameSchema } from "../schema/user.schema";

const userRouter = Router();

userRouter.get("/", validateToken, getAllUsers);
userRouter.get("/:username", validateToken, getUser);
userRouter.put("/:username", validateToken, zodValidate(usernameSchema), updateUser);
userRouter.delete("/:username", validateToken, deleteUser);

export default userRouter;
