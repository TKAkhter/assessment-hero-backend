import { z } from 'zod';

export const userRegisterSchema = z.object({
    username: z.string().min(3, "Username should be at least 3 characters").max(20, "Username should be at most 20 characters"),
    password: z.string().min(5, "Password should be at least 8 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/\d/, "Password must contain at least one number"),
});

export const userLoginSchema = z.object({
    username: z.string().min(3, "Username is required"),
    password: z.string().min(5, "Password is required"),
});

export const usernameSchema = z.object({
    username: z.string().min(3, "Username should be at least 3 characters").max(20, "Username should be at most 20 characters")
});