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