import { Request, Response } from 'express';
import File from '../models/files.model';

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const { tags } = req.body;

        const newFile = new File({
            name: req.file?.originalname || '',
            tags: tags ? tags.split(',') : [],
            filePath: req.file?.path || '',
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
        const { fileId } = req.params;

        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const shareableLink = `${req.protocol}://${req.get('host')}/api/files/view/${fileId}?share=true`;

        return res.status(200).json({ message: 'File shared successfully', shareableLink });
    } catch (err) {
        console.error('Error sharing file:', err);
        return res.status(500).json({ message: 'Error sharing file' });
    }
};

export const viewFile = async (req: Request, res: Response) => {
    try {
        const { fileId } = req.params;

        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        return res.status(200).json({
            name: file.name,
            tags: file.tags,
            filePath: file.filePath,
            createdAt: file.createdAt,
        });
    } catch (err) {
        console.error('Error fetching file:', err);
        return res.status(500).json({ message: 'Error fetching file' });
    }
};

export const getAllFiles = async (req: Request, res: Response) => {
    try {
        const files = await File.find();

        if (files.length === 0) {
            return res.status(404).json({ message: 'No files found' });
        }

        return res.status(200).json({ files });
    } catch (err) {
        console.error('Error fetching files:', err);
        return res.status(500).json({ message: 'Error fetching files' });
    }
};