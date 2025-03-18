import { Response } from "express";
import { BaseError } from "./BaseError";
import logger from "./log";

export const handleError = (res: Response, error: any, message: string): void => {
  logger.error(`${message}: ${error.message}`);

  // If it's a custom error, use its status code
  if (error instanceof BaseError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
