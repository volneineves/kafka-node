import "reflect-metadata";
import "./../../container";
import "express-async-errors";

import express, { NextFunction, request, Request, Response } from "express";
import { router } from "./routes";
import { consumers } from "../../messaging/consumers";

// KAFKA consumers
consumers()

const app = express();

app.use(express.json());

app.use(router);

app.use( // TODO alterar tratamento
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
      status: "error",
      message: err.message,
    });
  }
);

export { app };
