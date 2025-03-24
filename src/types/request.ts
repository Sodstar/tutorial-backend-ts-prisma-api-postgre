import { NextFunction, Request, Response } from "express";
import { UserId, UserRole } from "./auth";

export interface MyRequest extends Request {
  userId?: UserId;
  userRole?: UserRole;
}

export type RequestParams = {
  req: Request | MyRequest;
  res: Response;
  next: NextFunction;
};
