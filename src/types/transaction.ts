import { UserId } from "./auth";

export type TransactionId = string;
export type Transaction = {
  id: TransactionId;
  is_debit: boolean;
  transaction_value: string;
  debit?: number;
  credit?: number;
  source: string;
  created_by: UserId;
  status: "pending" | "success";
  invoice_id: string;
  invoice_desc: string;
  invoice_approval_code: string;
};
