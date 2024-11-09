import { Router } from "express";
import { getAllFiles, shareFile, uploadFile, viewFile } from "../controller/files.controller";
import multer from 'multer';
import path from 'path';

const filesRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

filesRouter.post('/upload', upload.single('file'), uploadFile);
filesRouter.get('/', getAllFiles);
filesRouter.get('/:id/share', shareFile);
filesRouter.get('/:id/view', viewFile);

export default filesRouter;
