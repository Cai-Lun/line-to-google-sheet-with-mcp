import { getAccountBinding } from "./accountBinding"
import { google } from "googleapis"
import { Sheet } from "../models/sheet"

export const createSpreadSheet = async () => {
  console.log("createSpreadSheet start")
  try {
    const accountBinding = await getAccountBinding()
    const refreshToken = accountBinding?.google_sheet_refresh_token
    const spreadsheetId = accountBinding?.google_sheet_id
    if (spreadsheetId) throw new Error("Spreadsheet already created")

    if (!refreshToken) {
      throw new Error("Refresh token is required")
    }
    const sheet = new Sheet(refreshToken)

    const res = await sheet.sheetSerivce.spreadsheets.create({
      requestBody: {
        properties: {
          title: "My first spreadsheet"
        }
      }
    })
    return res.data.spreadsheetId

  } catch (error) {
    throw error
  }
}