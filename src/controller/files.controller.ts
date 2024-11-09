import { Request, Response } from 'express';
import File from '../models/files.model';
import jwt from "jsonwebtoken";

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const { tags } = req.body;
        const { id } = (req as any).user;

        const newFile = new File({
            name: req.file?.originalname || '',
            tags: tags ? tags.split(',') : [],
            fileName: req.file?.filename || '',
            userId: id,
        });

        await newFile.save();

        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (err) {
        console.error('Error saving file:', err);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

export const shareFile = async (req: Request, res: Response) => {
    try {
        const { fileName } = req.params;
        const { id } = (req as any).user;

        const file = await File.findOne({ name: fileName });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const baseUrl = (process.env.ALLOW_ORIGIN || "").split(",")[0];
        const token = jwt.sign({ name: file.name, fileName: file.fileName }, process.env.JWT_SECRET!, { expiresIn: "5m" });

        const shareableLink = `${baseUrl}/share/${file.fileName}?share=${token}`;

        return res.status(200).json({ message: 'File shared successfully', shareableLink });
    } catch (err) {
        console.error('Error sharing file:', err);
        return res.status(500).json({ message: 'Error sharing file' });
    }
};

export const viewFile = async (req: Request, res: Response) => {
    try {
        const { fileName } = req.params;
        const { id } = (req as any).user;

        const file = await File.findOne({ fileName });
        await File.updateOne({ fileName }, { views: (file?.views ?? 0) + 1 });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        return res.status(200).json(file);
    } catch (err) {
        console.error('Error fetching file:', err);
        return res.status(500).json({ message: 'Error fetching file' });
    }
};

export const getAllFiles = async (req: Request, res: Response) => {
    try {
        const { id } = (req as any).user;
        const files = await File.find({ userId: id });

        if (files.length === 0) {
            return res.status(404).json({ message: 'No files found' });
        }

        return res.status(200).json({ files });
    } catch (err) {
        console.error('Error fetching files:', err);
        return res.status(500).json({ message: 'Error fetching files' });
    }
};