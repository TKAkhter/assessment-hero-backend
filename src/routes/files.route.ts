import { Router } from "express";
import { getAllFiles, shareFile, uploadFile, viewFile } from "../controller/files.controller";
import { uploadMiddleware } from "../common/multer";
import { validateToken } from "../middlewares/validate-token";

const filesRouter = Router();

filesRouter.post('/upload', validateToken, uploadMiddleware, uploadFile);
filesRouter.get('/', validateToken, getAllFiles);
filesRouter.get('/:fileName', validateToken, viewFile);
filesRouter.post('/share/:fileName', validateToken, shareFile);

export default filesRouter;
