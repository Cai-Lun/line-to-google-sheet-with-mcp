import { Pg } from "../models/pg";

export const getAccountBinding = async () => {
  try {
    const pg = await Pg.init()
    const sql = "SELECT * FROM account_binding;"
    const res = await pg.client.query(sql)
    console.log("account_binding rows", res.rows)
    return res?.rows[0];
  } catch (error) {
    const err = error as Error
    if(err.message.includes("does not exist")) {
      console.log("account_binding table does not exist")
      const res = await createAccountBindingTable()
      return res
    }
  }
}

export const createAccountBindingTable = async () => {
  try {
    const pg = await Pg.init()
    const sql = `CREATE TABLE account_binding (
      line_id text primary key,
      google_sheet_refresh_token text,
      google_sheet_id text
    )`
    const res = await pg.client.query(sql);
    console.log("create account_binding table success", res);
    return res.rows;
  } catch (error) {
    console.error("createAccountBindingTable error", error);
    throw error;
  }
}

export const insertValueIntoAccountBinding = async (columnName: string, value: string) => {
  try {
    const pg = await Pg.init()
    const sql = `INSERT INTO account_binding (${columnName}) VALUES (${value})`
    const res = await pg.client.query(sql, [value]);
    console.log("insert success, res = ", res);
    return res.rows;
  } catch (error) {
    console.error("insert failed, error = ", error);
    throw error;
  }
}

export const updateAccountBindingValueByLineId = async (columnName: string, value: string, lineId: string) => {
  try {
    const pg = await Pg.init()
    const sql = `UPDATE account_binding SET ${columnName} = $1 WHERE line_id = $2`
    const res = await pg.client.query(sql, [value, lineId])
    console.log("update success, res = ", res)
    return res.rows
  } catch (error) {
    console.error("update failed, error = ", error)
    throw error;
  }
}
