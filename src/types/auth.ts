export type UserRole = "teacher" | "student";

export type UserId = string;

export type TokenObj = { id: UserId; role: UserRole };

export type User = {
  id: UserId;
  role: UserRole;
  firstname: string;
  lastname: string;
  description: string;
  gender?: string;
  pic?: string;
  register?: string;
  utas?: string;
  balance?: number;
};
