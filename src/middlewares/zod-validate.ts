import { z } from 'zod';

export const zodValidate = (schema: z.ZodSchema) => {
    return (req: any, res: any, next: any) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error: any) {
            res.status(400).json({
                message: "Validation error",
                details: error.errors,
            });
        }
    };
};