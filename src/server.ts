import path from "path";

import express, { Request, Response } from "express";
import logger from "morgan";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { cors } from "./middlewares/cors";
import indexRouter from "./routes/index.route";
import session from "express-session";

const app = express();

// Middlewares
app.use(helmet.crossOriginResourcePolicy({
  policy: "cross-origin",
}));
app.use(express.json());
app.use(cors);
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(compression());
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: true,
}));

// MongoDB Connect
(() => {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));
})();

// Routes
app.use("/api/v1", indexRouter);

// catch 404 and forward to error handler
app.use((_: Request, res: Response) => res.status(404).send("Route not found"));

export default app;
