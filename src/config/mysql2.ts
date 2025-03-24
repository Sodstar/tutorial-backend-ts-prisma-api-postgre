import mysql from "mysql2/promise";
import { dbConnectionUrl } from "./env";
type Fields = Record<string, any>;

const pool = mysql.createPool(dbConnectionUrl);

export const db = () => pool.getConnection();

export const runQuery = async (query: string, params?: any[]) => {
  const connection = await db();
  try {
    const [results] = await connection.query(query, params);
    return results;
  } finally {
    connection.release();
  }
};

export const selectQuery = (
  select: string,
  table: string,
  where?: string
): string => {
  const whereClause = where ? `WHERE ${where}` : "";
  return `SELECT ${select} FROM ${table} ${whereClause}`;
};

export const insertQuery = (table: string, fields: Fields) => {
  const keys = Object.keys(fields).join(", ");
  const values = Object.values(fields)
    .map((value) => (typeof value === "string" ? `'${value}'` : value))
    .join(", ");
  return `insert into ${table} (${keys}) values(${values})`;
};

export const updateQuery = (table: string, fields: Fields, where: Fields) => {
  const query = `UPDATE ${table} SET ${buildBody(fields)} WHERE ${buildWhere(
    where
  )}`;
  return query;
};

export const buildWhere = (fields: Fields): string => {
  const query = Object.entries(fields)
    .filter(
      ([_, value]) => typeof value === "string" || typeof value === "number"
    )
    .map(([key, value]) => `${key}="${value}"`)
    .join(" AND ");
  return query;
};

export const buildBody = (fields: Fields): string => {
  return Object.entries(fields)
    .filter(
      ([_, value]) => typeof value === "string" || typeof value === "number"
    )
    .map(([key, value]) => `${key}="${value}"`)
    .join(", ");
};
