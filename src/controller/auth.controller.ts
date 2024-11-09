import { Request, Response } from 'express';
import User from '../models/users.model';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'secret');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const extendToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET!, { expiresIn: process.env.TOKEN_EXPIRATION_TIME! });

    return res.status(201).json({
      message: "Token extended successfully",
      newToken,
    });

  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};