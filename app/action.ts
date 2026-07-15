"use server"

import { getAccountBinding } from "@/src/services/accountBinding"

export const testGetAccountBinding = async () => {
  const res = await getAccountBinding()
  return res
}