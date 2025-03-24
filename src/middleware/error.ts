import { NextFunction, Request, Response } from "express";
import {BaseError} from "../utils/BaseError";
import expressAsyncHandler from "express-async-handler";

const errorHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: BaseError = { ...err } as BaseError;
  error.message = err.message;

  if (error.message === "jwt malformed") {
    error.message = "Та логин хийж байж энэ үйлдлийг хийх боломжтой...";
    error.statusCode = 401;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message,
  });
};

export default errorHandler;

export const asyncHandler = expressAsyncHandler;
