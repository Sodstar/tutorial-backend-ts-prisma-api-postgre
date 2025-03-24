import { MyRequest } from "types/request";
import {BaseError} from "./BaseError";

export const getUserInfo = (req: MyRequest) => {
  const { userId, userRole } = req;
  if (!userId || !userRole) {
    throw new BaseError("UserId болон UserRole дамжуулна уу!!!", 400);
  }
  return { userId, userRole };
};
