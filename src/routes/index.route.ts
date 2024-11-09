import { Router } from "express";

import userRouter from "./users.route";
import authRouter from "./auth.route";
import { healthCheckRouter } from "../controller/index.controller";
import filesRouter from "./files.route";

const router = Router();

router.use("/healthcheck", healthCheckRouter);

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/files", filesRouter);

export default router;
