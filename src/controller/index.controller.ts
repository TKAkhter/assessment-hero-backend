import { Request, Response } from "express";

export const healthCheckRouter = async (req: Request, res: Response): Promise<Response | void> =>
  res.status(200).json({ status: "ok", message: "Server is up and running!" });
